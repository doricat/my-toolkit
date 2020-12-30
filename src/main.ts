import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

Document.prototype.isPowerDesignerDocument = function (): boolean {
    return this.firstChild !== null && this.firstChild.nodeName === 'PowerDesigner';
};

Document.prototype.parseError = function (): boolean {
    const element = this.querySelector('parsererror');
    return element !== null;
};

HTMLCollection.prototype.firstOrDefault = function (): Element | null {
    return this.length > 0 ? this[0] : null;
};

Array.prototype.firstOrDefault = function (): any {
    return this.length > 0 ? this[0] : null;
};

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
