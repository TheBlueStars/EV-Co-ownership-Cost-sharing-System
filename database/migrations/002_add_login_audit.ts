import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLoginAudit002 implements MigrationInterface {
  name = 'AddLoginAudit002';

  public async up(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE "users"
      ADD "created_at" timestamptz NOT NULL DEFAULT now(),
      ADD "last_login_at" timestamptz,
      ADD "last_login_ip" varchar,
      ADD "login_count" int NOT NULL DEFAULT 0
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE "users"
      DROP COLUMN "login_count",
      DROP COLUMN "last_login_ip",
      DROP COLUMN "last_login_at",
      DROP COLUMN "created_at"
    `);
  }
}
