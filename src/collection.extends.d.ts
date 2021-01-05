interface Array<T> {
    firstOrDefault: () => T | null;
    copyTo: (destination: Array<T>) => void;
}
