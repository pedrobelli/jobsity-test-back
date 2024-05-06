export enum Status {
  PENDING,
  COMPLETED
}

export const StatusMap = new Map();
StatusMap.set(Status.PENDING, 'Pending');
StatusMap.set(Status.COMPLETED, 'Completed');
