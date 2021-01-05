import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdmViewerComponent } from './pdm-viewer/pdm-viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdmObjectViewerComponent } from './pdm-object-viewer/pdm-object-viewer.component';
import { TreeViewerComponent } from './tree-viewer/tree-viewer.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PdmObjectNavComponent } from './pdm-object-nav/pdm-object-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PdmTableViewerComponent } from './pdm-table-viewer/pdm-table-viewer.component';

@NgModule({
    declarations: [
        AppComponent,
        PdmViewerComponent,
        PdmObjectViewerComponent,
        TreeViewerComponent,
        NavMenuComponent,
        PdmObjectNavComponent,
        PageNotFoundComponent,
        HomePageComponent,
        PdmTableViewerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
