import { NextFunction, Request, Response } from "express";

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log("Error:", error);
      next(error);
    });
  };

export default asyncHandler;
