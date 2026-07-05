"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdfPatchingStore = exports.PatchRequiresTurtlePreservation = void 0;
const community_server_1 = require("@solid/community-server");
const rdflib_1 = require("rdflib");
const n3_patch_parser_1 = require("./patch/n3-patch-parser");
const debug_1 = require("../util/debug");
class PatchRequiresTurtlePreservation {
}
exports.PatchRequiresTurtlePreservation = PatchRequiresTurtlePreservation;
;
// Patch parsers by request body content type
const PATCH_PARSERS = {
    'text/n3': n3_patch_parser_1.parsePatchDocument
};
/**
 * {@link ResourceStore} using decorator pattern for the `modifyResource` function.
 * If the original store supports the {@link Patch}, behaviour will be identical,
 * otherwise the {@link PatchHandler} will be called instead.
 */
class RdfPatchingStore extends community_server_1.PassthroughStore {
    constructor(source, patchHandler) {
        super(source);
        this.source = source;
        this.patchHandler = patchHandler;
    }
    async modifyResource(identifier, patch, conditions) {
        try {
            return await this.source.modifyResource(identifier, patch, conditions);
        }
        catch (error) {
            if (community_server_1.NotImplementedHttpError.isInstance(error)) {
                try {
                    const result = await this.patchHandler.handleSafe({ source: this.source, identifier, patch });
                    return result;
                }
                catch (nestedError) {
                    // console.log('inner error', nestedError);
                    if (nestedError instanceof PatchRequiresTurtlePreservation) {
                        return this.modifyResourceUsingRdflib(identifier, patch, conditions);
                    }
                }
            }
            throw error;
        }
    }
    async modifyResourceUsingRdflib(identifier, patch, conditions) {
        const store = (0, rdflib_1.graph)();
        const patchStr = await (0, community_server_1.readableToString)(patch.data);
        const resourceUrl = identifier.path;
        const resourceSym = store.sym(resourceUrl);
        const resourceContentType = community_server_1.TEXT_TURTLE;
        let turtle;
        let metadataOut;
        try {
            const representationIn = await this.source.getRepresentation(identifier, { type: { [community_server_1.TEXT_TURTLE]: 1 } });
            turtle = await (0, community_server_1.readableToString)(representationIn.data);
            metadataOut = representationIn.metadata;
            (0, rdflib_1.parse)(turtle, store, resourceUrl, resourceContentType);
        }
        catch (e) {
            if (community_server_1.NotFoundHttpError.isInstance(e)) {
                turtle = '';
                metadataOut = new community_server_1.RepresentationMetadata(identifier, community_server_1.TEXT_TURTLE);
            }
            else {
                throw e;
            }
        }
        const parsePatch = PATCH_PARSERS['text/n3'];
        const patchObject = await parsePatch(resourceUrl, resourceUrl, patchStr);
        try {
            await new Promise((resolve, reject) => {
                store.applyPatch(patchObject, resourceSym, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(undefined);
                });
            });
        }
        catch (e) {
            if (JSON.stringify(e).startsWith('\"No match found to be patched')) {
                throw new community_server_1.ConflictHttpError('The document does not contain any matches for the N3 Patch solid:where condition.');
            }
            if (JSON.stringify(e).startsWith('\"Could not find to delete')) {
                throw new community_server_1.ConflictHttpError('The document does not contain all triples the N3 Patch requests to delete');
            }
            if (JSON.stringify(e).startsWith('\"Patch ambiguous. No patch done.')) {
                throw new community_server_1.ConflictHttpError('The document contains multiple matches for the N3 Patch solid:where condition');
            }
            throw e;
        }
        let serialized = await new Promise((resolve, reject) => {
            (0, rdflib_1.serialize)(resourceSym, store, resourceUrl, resourceContentType, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
        if (typeof serialized !== 'string') {
            await (0, debug_1.debug)('something went wrong');
            serialized = turtle;
        }
        const representationOut = new community_server_1.BasicRepresentation(serialized, metadataOut, community_server_1.TEXT_TURTLE);
        const ret = await this.source.setRepresentation(identifier, representationOut);
        return ret;
    }
}
exports.RdfPatchingStore = RdfPatchingStore;
//# sourceMappingURL=RdfPatchingStore.js.map