import { Role } from '../generated/prisma/enums.js';

export type TenantContext = {
  schoolId: string | null;
  role: Role;
};
