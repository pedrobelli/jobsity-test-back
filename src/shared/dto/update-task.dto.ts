import { Status } from "../enums/status";

export class UpdateTaskDto {
  readonly id: number;
  readonly title: string;
  readonly status: Status;
}
