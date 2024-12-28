/**************************************
 * Nest
 */
export class NestErrorResponse {
    code!: number;
    name!: string;
    errors!: NestErrorResponseError[];
}

export class NestErrorResponseError {
    path!: string;
    method!: string;
    message!: string;
    timestamp!: string;
}
