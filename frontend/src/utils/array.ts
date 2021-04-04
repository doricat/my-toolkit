export function copyTo(source: any[], destination: any[]): void {
    source.forEach((x: any) => {
        destination.push(x);
    });
}
