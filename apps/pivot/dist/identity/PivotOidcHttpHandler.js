"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotOidcHttpHandler = void 0;
const community_server_1 = require("@solid/community-server");
const n3_1 = require("n3");
class RedirectResponseDescription extends community_server_1.ResponseDescription {
    constructor(error) {
        error.metadata.set(community_server_1.SOLID_HTTP.terms.location, n3_1.DataFactory.namedNode(error.location));
        super(error.statusCode, error.metadata);
    }
}
/**
 * HTTP handler that redirects all requests to the OIDC library.
 */
class PivotOidcHttpHandler extends community_server_1.HttpHandler {
    constructor(baseUrl, responseWriter) {
        super();
        this.baseUrl = baseUrl;
        this.responseWriter = responseWriter;
        this.logger = (0, community_server_1.getLoggerFor)(this);
    }
    async handle({ request, response }) {
        const redirect = `${this.baseUrl}.well-known/openid-configuration`;
        this.logger.info(`Redirecting ${request.url} to ${redirect}`);
        const redirectError = new community_server_1.MovedPermanentlyHttpError(redirect);
        const result = new RedirectResponseDescription(redirectError);
        await this.responseWriter.handleSafe({ response, result });
    }
}
exports.PivotOidcHttpHandler = PivotOidcHttpHandler;
//# sourceMappingURL=PivotOidcHttpHandler.js.map