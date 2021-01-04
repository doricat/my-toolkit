import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-pdm-viewer',
    templateUrl: './pdm-viewer.component.html',
    styleUrls: ['./pdm-viewer.component.scss']
})
export class PdmViewerComponent implements OnInit {
    title = 'PDM Viewer';

    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle(this.title);
    }
}
