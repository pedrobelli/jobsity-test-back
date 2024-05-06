import { Status } from "../enums/status";

export class CreateTaskDto {
  readonly title: string;
  readonly status: Status;
}
