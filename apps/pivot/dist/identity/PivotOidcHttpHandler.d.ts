import type { HttpHandlerInput, ResponseWriter } from '@solid/community-server';
import { HttpHandler } from '@solid/community-server';
/**
 * HTTP handler that redirects all requests to the OIDC library.
 */
export declare class PivotOidcHttpHandler extends HttpHandler {
    private readonly baseUrl;
    private readonly responseWriter;
    protected readonly logger: import("@solid/community-server").Logger;
    constructor(baseUrl: string, responseWriter: ResponseWriter);
    handle({ request, response }: HttpHandlerInput): Promise<void>;
}
