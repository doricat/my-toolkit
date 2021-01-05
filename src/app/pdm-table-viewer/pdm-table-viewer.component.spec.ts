import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdmTableViewerComponent } from './pdm-table-viewer.component';

describe('PdmTableViewerComponent', () => {
    let component: PdmTableViewerComponent;
    let fixture: ComponentFixture<PdmTableViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdmTableViewerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdmTableViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
