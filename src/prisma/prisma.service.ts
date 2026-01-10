import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Create a PostgreSQL connection pool
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.seedSuperAdmin();
    } catch (error) {
      console.error('❌ Prisma ulanishda xato:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async seedSuperAdmin() {
    const email = process.env.SUPER_ADMIN_EMAIL || 'admin@mk-sirdaryo.uz';
    const adminExists = await this.user.findUnique({ where: { email } });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(
        process.env.SUPER_ADMIN_PASSWORD || 'Sirdaryo2024!',
        10,
      );
      await this.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName: 'Super Admin',
          role: 'SUPER_ADMIN' as any,
        },
      });
      console.log('--------------------------------------------------');
      console.log('🚀 [SEED] Super Admin muvaffaqiyatli yaratildi!');
      console.log('--------------------------------------------------');
    } else {
      console.log('✅ [SEED] Super Admin bazada mavjud.');
    }
  }
}
