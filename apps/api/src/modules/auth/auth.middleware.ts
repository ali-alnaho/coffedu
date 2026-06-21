import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthUser } from '@coffedu/contracts';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Reads the JWT access token from the Authorization header.
     *
     * Expected header format:
     * headers : {
     *     'Content-Type' : 'application/json';
     *     'Authorization' : `Bearer ${token}`
     * }
     *
     */
    const authHeader = req.headers.authorization;

    // Returns 401 if the token is missing or invalid.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    // make split to Authorization string to separate the token from `Bearer ${token}`
    const token = authHeader.split(' ')[1];

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error(
        'CRITICAL ERROR: JWT_SECRET is missing from environment variables.'
      );
      res.status(500).json({ message: 'Internal server configuration error.' });
      return;
    }

    // make decoded for token
    const metaData = jwt.verify(token, jwtSecret) as AuthUser;

    // Attaches the decoded payload to req.user when the token is valid.
    // make user property in req methode to save data from toke ==> {userID, userEmail, role, ...}

    // important think go to ./types/express.d.ts
    req.user = metaData;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    res.status(401).json({ message: 'Invalid or missing token' });
  }
};
