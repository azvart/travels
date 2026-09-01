# Инфраструктура: MySQL, Redis, Kafka, Zookeeper

## Деплой

```bash
kubectl apply -f 00-namespace.yaml
kubectl apply -f 10-mysql.yaml
kubectl apply -f 20-redis.yaml
kubectl apply -f 30-zookeeper.yaml
kubectl apply -f 40-kafka.yaml   # деплоить после zookeeper
```

Проверка:

```bash
kubectl -n infra get pods -w
```

## storageClassName

Во всех манифестах стоит `storageClassName: standard`. Проверь, что подходит под твой кластер:

```bash
kubectl get storageclass
```

- **minikube**: обычно `standard` уже есть из коробки.
- **kind**: класс называется `standard` (через `rancher.io/local-path`), тоже ок.
- **EKS**: чаще `gp2` или `gp3`.
- **GKE**: `standard-rwo` (или `standard`).
- **AKS**: `managed-csi` / `default`.

Поменяй значение под себя в каждом файле, либо просто убери `storageClassName`, чтобы использовался default-класс кластера.

## Как подключаться из NestJS-сервисов

Все сервисы внутри кластера резолвятся по DNS-имени `<service>.<namespace>.svc.cluster.local`. Если твои NestJS-приложения будут в том же namespace `infra`, достаточно короткого имени.

**MySQL (TypeORM):**
```
host: mysql.infra.svc.cluster.local
port: 3306
username: app_user
password: app_pass
database: app_db
```

**Redis:**
```
host: redis.infra.svc.cluster.local
port: 6379
```

**Kafka (KafkaJS / @nestjs/microservices):**
```
brokers: ['kafka-0.kafka.infra.svc.cluster.local:9092']
```

## Важные нюансы

1. **Пароли в Secret захардкожены как пример** (`mysql-secret`) — для реального использования переведи на `kubectl create secret` вручную, Sealed Secrets, External Secrets Operator или Vault. Не коммить реальные пароли в git.

2. **replicas: 1 везде.** Это single-node setup для разработки/staging. Для прод-HA:
   - MySQL — нужен отдельный оператор (Percona XtraDB Cluster, MySQL Operator) для настоящей репликации, простого увеличения replicas в StatefulSet недостаточно.
   - Zookeeper/Kafka — можно смело ставить 3 реплики, но тогда нужно прописать `ZOO_SERVERS` у zookeeper и `KAFKA_CFG_ZOOKEEPER_CONNECT`/advertised listeners для каждого брокера отдельно. Могу сразу накидать HA-вариант, если он тебе понадобится.

3. **Kafka без Zookeeper (KRaft)**: с Kafka 3.6+ можно вообще отказаться от Zookeeper и запускать Kafka в режиме KRaft — меньше движущихся частей. Раз ты явно просил Zookeeper, я оставил классическую схему, но имей в виду альтернативу на будущее.

4. **Resource requests/limits** — стоят условные значения, подгони под ресурсы своего кластера/ноды.

5. Для NestJS-приложений (твои apps/libs в Nest CLI monorepo) дальше логично сделать отдельные Deployment + Service для каждого микросервиса и ConfigMap с адресами этой инфраструктуры — если нужно, помогу и с этим.
