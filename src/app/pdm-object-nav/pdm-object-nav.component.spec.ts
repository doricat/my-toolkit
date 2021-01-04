import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdmObjectNavComponent } from './pdm-object-nav.component';

describe('PdmObjectNavComponent', () => {
    let component: PdmObjectNavComponent;
    let fixture: ComponentFixture<PdmObjectNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdmObjectNavComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdmObjectNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
