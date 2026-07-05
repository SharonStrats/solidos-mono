import { N3Patcher } from '@solid/community-server';
/**
 * To minimize code disruption, this patcher can be
 * put at the end of the CSS patcher chain, so that
 * the RdfPatchingStore can know that all checks passed
 * and it can use for instance RdfLib to apply the patch.
 */
export declare class ThrowingN3Patcher extends N3Patcher {
    handle(): Promise<any>;
}
