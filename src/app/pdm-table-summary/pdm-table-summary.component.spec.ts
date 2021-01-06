import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdmTableSummaryComponent } from './pdm-table-summary.component';

describe('PdmTableSummaryComponent', () => {
    let component: PdmTableSummaryComponent;
    let fixture: ComponentFixture<PdmTableSummaryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PdmTableSummaryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PdmTableSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
