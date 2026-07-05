import { Patch, ResourceIdentifier, Conditions, PassthroughStore, PatchHandler, ChangeMap, ResourceStore } from '@solid/community-server';
export declare class PatchRequiresTurtlePreservation {
}
/**
 * {@link ResourceStore} using decorator pattern for the `modifyResource` function.
 * If the original store supports the {@link Patch}, behaviour will be identical,
 * otherwise the {@link PatchHandler} will be called instead.
 */
export declare class RdfPatchingStore<T extends ResourceStore = ResourceStore> extends PassthroughStore<T> {
    private readonly patchHandler;
    protected source: T;
    constructor(source: T, patchHandler: PatchHandler);
    modifyResource(identifier: ResourceIdentifier, patch: Patch, conditions?: Conditions): Promise<ChangeMap>;
    private modifyResourceUsingRdflib;
}
