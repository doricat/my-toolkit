import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdmViewerComponent } from './pages/pdm-viewer/pdm-viewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PdmObjectViewerComponent } from './components/pdm/pdm-object-viewer/pdm-object-viewer.component';
import { TreeViewerComponent } from './components/shared/tree-viewer/tree-viewer.component';
import { NavMenuComponent } from './components/shared/nav-menu/nav-menu.component';
import { PdmObjectNavComponent } from './components/pdm/pdm-object-nav/pdm-object-nav.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PdmTableViewerComponent } from './components/pdm//pdm-table-viewer/pdm-table-viewer.component';
import { PdmTableSummaryComponent } from './components/pdm/pdm-table-summary/pdm-table-summary.component';

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
        PdmTableViewerComponent,
        PdmTableSummaryComponent
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
