import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { readFile } from 'src/app/actions/pdm.actions';
import { PdmState } from 'src/app/reducers/pdm.reducer';

@Component({
    selector: 'app-pdm-object-nav',
    templateUrl: './pdm-object-nav.component.html',
    styleUrls: ['./pdm-object-nav.component.scss']
})
export class PdmObjectNavComponent implements OnInit {
    @ViewChild('pdmFileInput') fileInput: ElementRef;

    constructor(private store: Store<{ pdm: PdmState }>) { }

    ngOnInit(): void {

    }

    openFileDialog(): void {
        if (this.fileInput) {
            const element = this.fileInput.nativeElement as HTMLElement;
            element.dispatchEvent(new MouseEvent('click'));
        }
    }

    selectFile(evt: Event): void {
        const element = evt.currentTarget as HTMLInputElement;
        const file = element.files[0];
        element.value = null;
        this.store.dispatch(readFile({ file }));
    }
}
