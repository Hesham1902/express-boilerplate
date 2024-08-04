import { logger } from "@/server";
import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const unexpectedRequest: RequestHandler = (_req, res) => {
  logger.error("Route not found", { error: _req.originalUrl });
  console.log("unexpectedRequest");
  res.sendStatus(StatusCodes.NOT_FOUND);
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  console.log("addErrorToRequestLog");

  next(err);
};

export default () => [unexpectedRequest, addErrorToRequestLog];
