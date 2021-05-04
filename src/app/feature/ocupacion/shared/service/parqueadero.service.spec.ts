import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { OcupacionService } from './ocupacion.service';

describe('ParqueaderoService', () => {
  let service: OcupacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, OcupacionService]
    });
    service = TestBed.inject(OcupacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  

});
