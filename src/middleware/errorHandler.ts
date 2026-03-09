// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

// Optional: define a custom error class
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Only needed when extending built-in classes
    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log error for debugging

  // Determine status code
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    // Only include stack in non-production for debugging
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};