import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PdmService } from 'src/app/services/pdm.service';

@Component({
    selector: 'app-pdm-object-nav',
    templateUrl: './pdm-object-nav.component.html',
    styleUrls: ['./pdm-object-nav.component.scss']
})
export class PdmObjectNavComponent implements OnInit {
    @ViewChild('pdmFileInput') fileInput: ElementRef;

    constructor(private pdmService: PdmService) { }

    ngOnInit(): void {

    }

    openFileDialog(): void {
        if (this.fileInput) {
            const element = this.fileInput.nativeElement as HTMLElement;
            element.dispatchEvent(new MouseEvent('click'));
        }
    }

    async selectFile(evt: Event): Promise<void> {
        const element = evt.currentTarget as HTMLInputElement;
        const file = element.files[0];
        element.value = null;
        this.pdmService.sendFile(file);
    }
}
