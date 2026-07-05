export declare function parsePatchDocument(targetURI: string, patchURI: string, patchText: string): Promise<{
    insert: any;
    delete: any;
    where: any;
}>;
