export function isPowerDesignerDocument(document: Document): boolean {
    return document.firstChild !== null && document.firstChild.nodeName === 'PowerDesigner';
}

export function parseError(document: Document): boolean {
    const element = document.querySelector('parsererror');
    return element !== null;
}
