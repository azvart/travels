import { JobResultStatusEnum } from '@app/types/enums';

export interface JobResult<T = unknown> {
  status: JobResultStatusEnum;
  data?: T;
}
