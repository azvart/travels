import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';

@Catch()
export class GqlExceptionErrorFilter implements GqlExceptionFilter {
  private readonly logger: Logger = new Logger(GqlExceptionErrorFilter.name);

  public catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();
    const fieldPath = info ? `${info.parentType.name}.${info.fieldName}` : 'unknown';

    if (exception instanceof GraphQLError) {
      return exception;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : ((response as { message?: string | string[] }).message ?? exception.message);
      this.logger.warn(`[${fieldPath}] ${exception.message}`);

      return new GraphQLError(Array.isArray(message) ? message.join(', ') : message, {
        extensions: {
          code: this.mapHttpStatusToCode(status),
          statusCode: status,
        },
      });
    }

    if (exception instanceof EntityNotFoundError) {
      this.logger.warn(`[${fieldPath}] ${exception.message}`);

      return new GraphQLError('Requested entity not found', {
        extensions: {
          code: 'NOT_FOUND',
          statusCode: 404,
        },
      });
    }

    if (exception instanceof QueryFailedError) {
      this.logger.error(`[${fieldPath}] DB query failed: ${exception.message}`, exception.stack);

      return new GraphQLError('Database error occurred', {
        extensions: {
          code: 'DATABASE_ERROR',
          statusCode: 500,
        },
      });
    }

    const error = exception as Error;
    this.logger.error(`[${fieldPath}] Unhandled exception: ${error?.message}`, error?.stack);

    return new GraphQLError('Internal server error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
      },
    });
  }

  private mapHttpStatusToCode(status: number): string {
    switch (status) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHENTICATED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}
