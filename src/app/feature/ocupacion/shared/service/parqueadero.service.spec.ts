import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Ocupacion } from '../model/ocupacion';

import { OcupacionService } from './ocupacion.service';

describe('ParqueaderoService', () => {
  let service: OcupacionService;
  let httpMock: HttpTestingController;
  const apiEndpointOcupacion = `${environment.endpoint}/ocupacion`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, OcupacionService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(OcupacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería crear ocupacion', () => {
    const ocupacion = new Ocupacion(1, 1, 1, 1, 1, 0, new Date(), new Date());
    service.guardar(ocupacion).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(apiEndpointOcupacion);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('Pagar ocupacion', () => {
    const id = 1;
    service.pagar(id).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(`${apiEndpointOcupacion}/pagar/${id}`);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

});
