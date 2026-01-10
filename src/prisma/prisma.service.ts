import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Prisma 7 uchun majburiy: ulanish manzilini super ichida aniq ko'rsatamiz
    // TypeScript xatosi bermasligi uchun (options as any) ishlatamiz
    super({
      datasource: {
        url: process.env.DATABASE_URL,
      },
    } as any);
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Prisma 7: Baza bilan aloqa o’rnatildi');
      await this.seedSuperAdmin();
    } catch (error) {
      console.error('❌ Prisma ulanishda xato:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async seedSuperAdmin() {
    const email = process.env.SUPER_ADMIN_EMAIL || 'admin@sirdaryohaqqiqati.uz';
    try {
      const adminExists = await this.user.findUnique({ where: { email } });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash(
          process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin123!',
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
        console.log('🚀 [SEED] Super Admin yaratildi!');
      }
    } catch (e) {
      console.error('❌ Seed xatosi:', e.message);
    }
  }
}