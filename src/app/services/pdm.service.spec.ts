import { TestBed } from '@angular/core/testing';

import { PdmService } from './pdm.service';

describe('PdmService', () => {
    let service: PdmService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PdmService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
