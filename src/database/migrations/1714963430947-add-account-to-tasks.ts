import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddAccountToTasks1714963430947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "Tasks",
            new TableColumn({
                name: "account_id",
                type: "int",
            }),
        );

        await queryRunner.createForeignKey(
            "Tasks",
            new TableForeignKey({
                columnNames: ["account_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "Accounts",
                onDelete: "SET NULL",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("Tasks");
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("account_id") !== -1,
        );

        await queryRunner.dropForeignKey("Tasks", foreignKey)
        await queryRunner.dropColumn("Tasks", "account_id");
    }

}
