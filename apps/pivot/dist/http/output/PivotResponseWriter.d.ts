import { HttpResponse, ResponseDescription, BasicResponseWriter, MetadataWriter, TargetExtractor, DataAccessorBasedStore } from '@solid/community-server';
export declare class PivotResponseWriter extends BasicResponseWriter {
    private readonly store;
    private readonly targetExtractor;
    constructor(metadataWriter: MetadataWriter, store: DataAccessorBasedStore, targetExtractor: TargetExtractor);
    handle(input: {
        response: HttpResponse;
        result: ResponseDescription;
    }): Promise<void>;
}
