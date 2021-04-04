export function firstOrDefault(collection: HTMLCollection, filter?: (element: Element) => boolean): Element | null {
    if (filter) {
        for (let i = 0; i < collection.length; i++) {
            const element = collection[i];
            if (filter(element)) {
                return element;
            }
        }

        return null;
    }

    return collection.length > 0 ? collection[0] : null;
}
