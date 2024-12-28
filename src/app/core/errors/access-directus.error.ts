/**************************************
 * Directus
 */
export class DirectusErrorArray {
    errors!: DirectusError[];
}

export class DirectusError {
    message!: string;
    extensions!: {
        code: string;
    };
}
