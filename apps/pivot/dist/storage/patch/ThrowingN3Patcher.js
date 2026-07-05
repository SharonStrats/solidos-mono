"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowingN3Patcher = void 0;
const community_server_1 = require("@solid/community-server");
const RdfPatchingStore_1 = require("../RdfPatchingStore");
/**
 * To minimize code disruption, this patcher can be
 * put at the end of the CSS patcher chain, so that
 * the RdfPatchingStore can know that all checks passed
 * and it can use for instance RdfLib to apply the patch.
 */
class ThrowingN3Patcher extends community_server_1.N3Patcher {
    async handle() {
        throw new RdfPatchingStore_1.PatchRequiresTurtlePreservation();
    }
}
exports.ThrowingN3Patcher = ThrowingN3Patcher;
//# sourceMappingURL=ThrowingN3Patcher.js.map