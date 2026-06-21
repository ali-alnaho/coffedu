import { NextFunction, Request, Response } from 'express';
import { AuthUser } from '@coffedu/contracts';

/**
 * Role-Based Access Control (RBAC) middleware factory.
 *
 * This function generates an Express middleware that restricts access
 * to routes based on user roles.
 *
 * It works as a higher-order function (Closure):
 * - First, it receives an array of allowed roles.
 * - Then it returns an actual Express middleware function.
 *
 * The returned middleware:
 * - Checks if the user is authenticated (req.user exists)
 *   → If not, returns 401 Unauthorized.
 *
 * - Checks if the user's role is included in the allowed roles
 *   → If not, returns 403 Forbidden.
 *
 * - If both checks pass, it calls next() to continue request flow.
 *
 * Why this approach is used:
 * Express middleware must follow the (req, res, next) signature,
 * so additional dynamic parameters (like roles) cannot be passed directly.
 *
 * To solve this, we use a factory function + closure:
 * - The outer function stores the roles.
 * - The inner middleware function accesses them later when executed.
 *
 * This makes the solution:
 * - Reusable across routes
 * - Easy to configure per endpoint
 * - Clean and scalable for RBAC systems
 */
export const requireRole = (roles: AuthUser['role'][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    // Checks if the user is authenticated
    if (!user || !user.role) {
      return res
        .status(401)
        .json({ message: 'Unauthorized user must log in first' });
    }

    // Checks if the user's role is included in the allowed roles
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // if user has role and authorized
    next();
  };
};
