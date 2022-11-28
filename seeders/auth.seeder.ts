import { hash } from 'bcrypt';

import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { Operator } from '../libs/auth/src';

export class AuthSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Super Admin Operator
    const superAdmin = new Operator({
      name: 'dino',
      lastName: 'dino',
      password: await hash('dino', 10),
      dateOfBirth: new Date(1991, 5, 31),
      email: 'dino@dino.com',
      phone: '123456789',
      isSuperUser: true,
    });

    em.persistAndFlush(superAdmin);
  }
}
