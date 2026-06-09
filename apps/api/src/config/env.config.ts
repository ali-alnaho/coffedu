import dotenv from 'dotenv';

// use .env file to manage environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  //   dbUrl: process.env.DB_URL,
  //   jwtSecret: process.env.JWT_SECRET,
};
