import { TenantContext } from '../types/tenantContext.js';
import { Role } from '../generated/prisma/enums.js';

// Generic function: T represents the shape of extra filter conditions
// (e.g. { id: string } or {} ) — it can be any object type.
export function buildTenantWhere<T extends object>(
  // ctx holds the current user's schoolId and role
  ctx: TenantContext,
  // filters are optional extra conditions; defaults to an empty object
  filters: T = {} as T
) {
  // Check if this user is a PLATFORM_OWNER with no specific school selected
  const isOwnerWithoutSchool =
    ctx.role === Role.PLATFORM_OWNER && !ctx.schoolId;

  // If true: owner with no school → return filters unchanged (see everything)
  // If false: return filters + schoolId (restrict to this user's school only)
  return isOwnerWithoutSchool
    ? filters
    : { ...filters, schoolId: ctx.schoolId };
}
