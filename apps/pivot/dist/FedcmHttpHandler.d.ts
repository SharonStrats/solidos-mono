import { CookieStore } from '@solid/community-server';
import { HttpHandler } from '@solid/community-server';
import type { HttpHandlerInput } from '@solid/community-server';
import { WebIdStore } from '@solid/community-server';
/**
 * HTTP handler that handle all FedCM requests.
 */
export declare class FedcmHttpHandler extends HttpHandler {
    protected readonly logger: import("@solid/community-server").Logger;
    private readonly baseUrl;
    private readonly cookieStore;
    private readonly webIdStore;
    constructor(baseUrl: string, cookieStore: CookieStore, webIdStore: WebIdStore);
    private get_token;
    private get_client_id_secret;
    private deleteToken;
    handle({ request, response }: HttpHandlerInput): Promise<void>;
    private handleWebIdentity;
    private handleFedcmJSON;
    private handleAccountsEnpoint;
    private handleClientMetadataEndpoint;
    private handleToken;
    private handleDisconnect;
}
