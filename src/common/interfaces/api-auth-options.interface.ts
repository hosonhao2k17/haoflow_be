import { HttpStatus } from "@nestjs/common";


export interface ApiAuthOptions {
  isPublic?: boolean;
  summary?: string;
  description?: string;
  bodyType?: any;         
  responseType?: any;     
  httpCode?: HttpStatus;
  isMultipart?: boolean;   
  isPaginated?: boolean;
  paginationType?: 'cursor' | 'offset';
  responseMessage?: string;
}
