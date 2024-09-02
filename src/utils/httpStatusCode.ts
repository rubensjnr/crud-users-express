import { HttpResponse } from "../models/httpModels"

export const ok = async (data:any):Promise<HttpResponse> => {
  return {
    statusCode: 200,
    body: data,
  }
}
export const created = async (msg: Object):Promise<HttpResponse> => {
  return {
    statusCode: 201,
    body: {
      message: msg,
    },
  }
}

export const noContent = async (msg: Object):Promise<HttpResponse> => {
  return {
    statusCode: 204,
    body: msg,
  }
}
export const badRequest = async (msg: Object):Promise<HttpResponse> => {
  return {
    statusCode: 400,
    body: msg,
  }
}
export const notFound = async (msg: Object):Promise<HttpResponse> => {
  return {
    statusCode: 404,
    body: {
      message: msg,
    },
  }
}