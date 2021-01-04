import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdmViewerComponent } from './pdm-viewer.component';

describe('PdmViewerComponent', () => {
    let component: PdmViewerComponent;
    let fixture: ComponentFixture<PdmViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdmViewerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdmViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
