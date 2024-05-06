import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Status } from "../shared/enums/status";

@Entity('Tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int' })
  status: Status;

  @Column({ name: 'account_id', type: 'int' })
  accountId: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at' })
  deletedAt: Date;
}
