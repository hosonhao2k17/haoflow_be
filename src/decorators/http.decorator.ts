import { applyDecorators, HttpCode, HttpStatus } from "@nestjs/common";
import { Public } from "./public.decorator";
import {ApiOperation,ApiResponse,ApiBody,ApiBearerAuth, ApiConsumes} from "@nestjs/swagger";
import { ApiAuthOptions } from "src/common/interfaces/api-auth-options.interface";
import { CursorPaginatedRdo } from "src/common/rdo/cursor-paginated.rdo";
import { OffsetPaginatedRdo } from "src/common/rdo/offset-paginated.rdo";
import { ResponseMessage } from "./message.decorator";
import { ErrorRdo } from "src/common/rdo/error.rdo";


export const ApiEndpoint = (options: ApiAuthOptions = {}) => {
  const decorators: any[] = [
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      type: ErrorRdo
    })
  ];
  if (options.isPublic === true) {
    decorators.push(Public());
  } else {
    decorators.push(ApiBearerAuth());
  }

  if (options.summary || options.description) {
    decorators.push(
      ApiOperation({
        summary: options.summary,
        description: options.description,
      })
    );
  }

  if(options.responseMessage) {
    decorators.push(
      ResponseMessage(options.responseMessage)
    )
  }

  if (options.bodyType) {
    decorators.push(
      ApiBody({ type: options.bodyType })
    );
  }
  if (options.isMultipart) {
    decorators.push(ApiConsumes("multipart/form-data"));
  }
  if (options.httpCode) {
    decorators.push(HttpCode(options.httpCode));
  }
  if (options.responseType) {
    decorators.push(
      ApiResponse({
        status: options.httpCode ?? HttpStatus.OK,
        type: options.responseType,
      })
    );
  }

  if(options.isPaginated && options.paginationType && options.bodyType) {
    if(options.paginationType === 'cursor') {
        decorators.push(ApiResponse({
            type: CursorPaginatedRdo
        }))
    } else {
        decorators.push(ApiResponse({
            type: OffsetPaginatedRdo
        }))
    }
  }

  return applyDecorators(...decorators);
};