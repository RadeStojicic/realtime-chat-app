import { NextFunction, Request, Response } from "express";

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    });
  };

export default asyncHandler;
