import { BasicObject, Model, RootObject } from "../types/pdm";
import { firstOrDefault } from "../utils/html";
import { isPowerDesignerDocument, parseError } from "../utils/document";

export class PDMReader {
    constructor(document: Document) {
        if (!isPowerDesignerDocument(document)) {
            throw new Error('document格式不正确。');
        }

        this.document = document;
    }

    document: Document;

    readRootObject(): RootObject | null {
        const element = this.document.querySelector('RootObject');
        let rootObject: RootObject | null = null;

        do {
            if (!element) {
                break;
            }

            const childrenElement = firstOrDefault(element.children);
            if (!childrenElement) {
                break;
            }

            const models: Model[] = [];
            for (let i = 0; i < childrenElement.children.length; i++) {
                const child = childrenElement.children[i];
                if (child.nodeName === 'o:Model') {
                    const model = BasicObject.readFromElement(child)!.convertTo(Model);
                    models.push(model);
                }
            }

            const id = element.attributes.getNamedItem('Id')?.value ?? '';
            rootObject = new RootObject(id, models, element);
        } while (false);

        return rootObject;
    }
}

export class PDMReaderFactory {
    static createFromXml(xml: string): PDMReader {
        const parser = new DOMParser();
        const document = parser.parseFromString(xml, 'text/xml');

        if (parseError(document)) {
            throw new Error('parserError');
        }

        return new PDMReader(document);
    }

    static createFromFile(file: File): Promise<PDMReader> {
        const promise = new Promise((resolve: (reader: PDMReader) => void) => {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onloadend = () => {
                if (fileReader.readyState === FileReader.DONE) {
                    resolve(PDMReaderFactory.createFromXml(fileReader.result as string));
                }
            };
        });

        return promise;
    }
}
