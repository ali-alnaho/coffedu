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
      throw new Error('JWT_SECRET is missing');
    }

    // make decoded for token
    const metaData = jwt.verify(token, jwtSecret) as AuthUser;

    // Attaches the decoded payload to req.user when the token is valid.
    // make user property in req methode to save data from toke ==> {userID, userEmail, role, ...}

    // important think go to ./types/express.d.ts
    req.user = metaData;
    next();
  } catch (error) {
    res.status(401).json({ message: 'no token' });
  }
};
