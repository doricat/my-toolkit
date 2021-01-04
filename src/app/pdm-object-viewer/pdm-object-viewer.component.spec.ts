import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdmObjectViewerComponent } from './pdm-object-viewer.component';

describe('PdmObjectViewerComponent', () => {
    let component: PdmObjectViewerComponent;
    let fixture: ComponentFixture<PdmObjectViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdmObjectViewerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdmObjectViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
