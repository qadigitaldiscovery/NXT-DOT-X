export function componentTagger(options = {}) {
    const { mode = 'development', tagPrefix = 'lovable' } = options;
    return {
        name: 'component-tagger',
        enforce: 'pre',
        transform(code, id) {
            if (!id.includes('node_modules') &&
                (id.endsWith('.tsx') || id.endsWith('.jsx'))) {
                // Add tag to component declarations
                const taggedCode = code.replace(/(const|function)\s+([A-Z][a-zA-Z0-9]*)\s*=/g, `$1 $2 = /* ${tagPrefix}-component: $2 */`);
                return {
                    code: mode === 'development' ? taggedCode : code,
                    map: null
                };
            }
            return null;
        }
    };
}
