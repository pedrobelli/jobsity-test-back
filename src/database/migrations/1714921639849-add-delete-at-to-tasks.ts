import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeleteAtToTasks1714921639849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "Tasks",
            new TableColumn({
                name: "deleted_at",
                type: "timestamp",
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("Tasks", "deleted_at");
    }

}
