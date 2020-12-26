interface HTMLCollection {
    firstOrDefault: () => Element | null;
}

interface Element {
    isRootObjectNode: () => boolean;
    isRootChildrenNode: () => boolean;
    isModelNode: () => boolean;
    isPackagesNode: () => boolean;
    isPackageNode: () => boolean;
    isTablesNode: () => boolean;
    isTableNode: () => boolean;
    isTableColumnsNode: () => boolean;
    isTableColumnNode: () => boolean;
    isTableKeysNode: () => boolean;
    isTableKeyNode: () => boolean;
    isTablePrimaryKeyNode: () => boolean;
    isObjectIdElement: () => boolean;
    isNameElement: () => boolean;
    isCodeElement: () => boolean;
    isCommentElement: () => boolean;
    getIdAttributeValue: () => string;
    getModelElements: () => HTMLCollection | null;
}

interface Document {
    isPowerDesignerDocument: () => boolean;
    parseError: () => boolean;
}