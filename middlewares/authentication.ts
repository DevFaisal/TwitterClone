import { NextFunction, Request, Response } from "express";

interface Headers {
    authorization: string;
}

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Token is required");
    }
    next();
}
