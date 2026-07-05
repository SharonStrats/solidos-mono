"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePatchDocument = parsePatchDocument;
const rdflib_1 = require("rdflib");
const PATCH_NS = 'http://www.w3.org/ns/solid/terms#';
const PREFIXES = `PREFIX solid: <${PATCH_NS}>\n`;
// Parses the given N3 patch document
async function parsePatchDocument(targetURI, patchURI, patchText) {
    // Parse the N3 document into triples
    const patchGraph = (0, rdflib_1.graph)();
    try {
        (0, rdflib_1.parse)(patchText, patchGraph, patchURI, 'text/n3');
    }
    catch (err) {
        throw new Error(`Patch document syntax error: ${err}`);
    }
    // Query the N3 document for insertions and deletions
    let firstResult;
    try { // solid/protocol v0.9.0
        firstResult = await queryForFirstResult(patchGraph, `${PREFIXES}
    SELECT ?insert ?delete ?where WHERE {
      ?patch a solid:InsertDeletePatch.
      OPTIONAL { ?patch solid:inserts ?insert. }
      OPTIONAL { ?patch solid:deletes ?delete. }
      OPTIONAL { ?patch solid:where   ?where.  }
    }`);
    }
    catch (err) {
        try { // deprecated, kept for compatibility
            firstResult = await queryForFirstResult(patchGraph, `${PREFIXES}
      SELECT ?insert ?delete ?where WHERE {
        ?patch solid:patches <${targetURI}>.
        OPTIONAL { ?patch solid:inserts ?insert. }
        OPTIONAL { ?patch solid:deletes ?delete. }
        OPTIONAL { ?patch solid:where   ?where.  }
      }`);
        }
        catch (err) {
            throw new Error('No n3-patch found.');
        }
    }
    // Return the insertions and deletions as an rdflib patch document
    const { '?insert': insert, '?delete': deleted, '?where': where } = firstResult;
    if (!insert && !deleted) {
        throw new Error('Patch should at least contain inserts or deletes.');
    }
    return { insert, delete: deleted, where };
}
// Queries the store with the given SPARQL query and returns the first result
function queryForFirstResult(store, sparql) {
    return new Promise((resolve, reject) => {
        const query = (0, rdflib_1.SPARQLToQuery)(sparql, false, store);
        store.query(query, resolve, null, () => reject(new Error('No results.')));
    });
}
//# sourceMappingURL=n3-patch-parser.js.map