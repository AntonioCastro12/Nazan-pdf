/**************************************
 * Strapi
 */
export class StrapiErrorResponse {
    statusCode!: number;
    error!: string;
    message!: Array<StrapiErrorInfo>;
    data!: Array<StrapiErrorInfo>;
}

export class StrapiErrorInfo {
    messages!: StrapiErrorMessage[];
}

export class StrapiErrorMessage {
    id!: string;
    message!: string;
}
