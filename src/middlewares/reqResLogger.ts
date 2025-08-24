import { NextFunction, Request, Response } from "express";

/**
 * Middleware which takes an initial configuration and returns a middleware which will call the
 * given logger with the request and response content.
 *
 * @param logger Logger function to pass the message to
 * @return Middleware to perform the logging
 */
export const requestLoggerMiddleware =
  (logger: { log: any }) => (req: Request, res: any, next: NextFunction) => {
    try {
      logger.log("-----------------------------------------------------");
      logger.log(
        req.headers["requestId"],
        req.method,
        req.url,
        req.headers["token"],
        req.body,
      );
      res.send = resDotSendInterceptor(res, res.send);
      res.on("finish", () => {
        logger.log("Response >>>", res.statusCode, res.contentBody);
      });
    } catch (error) {
      console.log(error);
    }
    next();
  };

const resDotSendInterceptor = (res: any, send: any) => (content: any) => {
  res.contentBody = content;
  res.send = send;
  res.send(content);
};
