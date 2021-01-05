interface HTMLCollection {
    firstOrDefault: (filter?: (element: Element) => boolean) => Element | null;
}

interface Document {
    isPowerDesignerDocument: () => boolean;
    parseError: () => boolean;
}