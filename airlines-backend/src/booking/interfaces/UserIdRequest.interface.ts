import { Request } from '@nestjs/common';

export interface UserIdRequest extends Request {
  userId: string;
}
