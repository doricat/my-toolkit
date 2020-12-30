interface HTMLCollection {
    firstOrDefault: () => Element | null;
}

interface Document {
    isPowerDesignerDocument: () => boolean;
    parseError: () => boolean;
}