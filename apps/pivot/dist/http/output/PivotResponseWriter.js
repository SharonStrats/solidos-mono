"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotResponseWriter = void 0;
const community_server_1 = require("@solid/community-server");
function hasTrailingSlash(input) {
    return (input.slice(-1) === '/');
}
function addTrailingSlash(input) {
    return `${input}/`;
}
class PivotResponseWriter extends community_server_1.BasicResponseWriter {
    constructor(metadataWriter, store, targetExtractor) {
        super(metadataWriter);
        this.store = store;
        this.targetExtractor = targetExtractor;
    }
    async handle(input) {
        try {
            if ((input.response.req.method === 'GET') &&
                (typeof input.response.req.url === 'string') &&
                ([401, 403, 404].indexOf(input.result.statusCode) !== -1) &&
                (hasTrailingSlash(input.response.req.url) === false)) {
                const target = await this.targetExtractor.handleSafe({ request: input.response.req });
                const withSlash = addTrailingSlash(target.path);
                let exists = false;
                try {
                    exists = await this.store.hasResource({ path: withSlash });
                }
                catch (e) {
                    // leave as false
                }
                // console.log('exists', withSlash, exists);
                if (exists) {
                    // console.log('rewriting', input.response.req.method, input.response.req.url, input.result.statusCode);
                    input.response.statusCode = 301;
                    input.response.setHeader('Location', withSlash);
                    input.response.end('Try adding a slash at the end of the URL.\n');
                    return;
                }
            }
        }
        catch (e) {
            /* path withSlash do not exist */
        }
        return super.handle(input);
    }
}
exports.PivotResponseWriter = PivotResponseWriter;
//# sourceMappingURL=PivotResponseWriter.js.map