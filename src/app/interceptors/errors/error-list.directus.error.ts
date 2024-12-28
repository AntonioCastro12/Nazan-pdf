export const errorListHttpDirectus = [
  {
    errorCode: 400,
    httpStatus: `FAILED_VALIDATION`,
    description: `Validation for this particular item failed`,
    spanishTranslation: `La validación de este item particular ha fallado`,
  },
  {
    errorCode: 403,
    httpStatus: `FORBIDDEN`,
    description: `You are not allowed to do the current action`,
    spanishTranslation: `No tiene autorización para realizar esta acción`,
  },
  {
    errorCode: 401,
    httpStatus: `INVALID_CREDENTIALS`,
    description: `Username / password or access token is wrong`,
    spanishTranslation: `El usuario o el token de acceso esta equivocado`,
  },
  {
    errorCode: 401,
    httpStatus: `INVALID_IP`,
    description: `Your IP address isn't allow-listed to be used with this user`,
    spanishTranslation: `Su dirección IP no puede ser utilizada desde esta dirección IP`,
  },
  {
    errorCode: 401,
    httpStatus: `INVALID_OTP`,
    description: `Wrong OTP was provided`,
    spanishTranslation: `Ha suministrado un OTP equivocado`,
  },
  {
    errorCode: 400,
    httpStatus: `INVALID_PAYLOAD`,
    description: `Provided payload is invalid`,
    spanishTranslation: `Los datos siuministrados son inválidos`,
  },
  {
    errorCode: 400,
    httpStatus: `INVALID_QUERY`,
    description: `The requested query parameters can not be used`,
    spanishTranslation: `Los parámetros de la consulta no pueden ser utilizados`,
  },
  {
    errorCode: 429,
    httpStatus: `REQUESTS_EXCEEDED`,
    description: `Hit the rate limit`,
    spanishTranslation: `Ha llegado al límite de intentos`,
  },
  {
    errorCode: 404,
    httpStatus: `ROUTE_NOT_FOUND`,
    description: `Endpoint does not exist`,
    spanishTranslation: `Este endpoint no existe`,
  },
  {
    errorCode: 503,
    httpStatus: `SERVICE_UNAVAILABLE`,
    description: `Could not use external service`,
    spanishTranslation: `No puede usar el servicio externo`,
  },
  {
    errorCode: 422,
    httpStatus: `UNPROCESSABLE_ENTITY`,
    description: `You tried doing something illegal`,
    spanishTranslation: `Está intentando hacer algo ilegal`,
  },
];
