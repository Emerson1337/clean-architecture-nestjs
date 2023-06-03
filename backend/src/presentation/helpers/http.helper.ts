import { ServerError } from '../errors';
import { HttpResponse } from '../http/protocols/http.protocols';

export const badRequest = (error: Error): HttpResponse => ({
  body: {
    error: {
      name: error.name,
      message: error.message,
    },
  },
});

export const serverError = (error: Error): HttpResponse => ({
  body: { error: new ServerError(error.stack) },
});

export const ok = (data: any): HttpResponse => ({ body: data });

export const handleError = (error: Error) => {
  if (['MissingParamError', 'InvalidParamError'].includes(error.name))
    return badRequest(error);
  else return serverError(error);
};
