import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Conductor } from '../model/conductor';
import { ConductorService } from './conductor.service';


describe('ConductorService', () => {
  let service: ConductorService;
  let httpMock: HttpTestingController;
  const apiEndpointConductor = `${environment.endpoint}/conductores`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, ConductorService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería crear espacios', () => {
    const conductor = new Conductor(1, '', '', '', '', '', '', new Date());
    service.guardar(conductor).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(apiEndpointConductor);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('No debería crear espacios', () => {
    const conductor = new Conductor(1, '', '', '', '', '', '', new Date());
    service.guardar(conductor).subscribe(response => {
      expect(response).toBeFalse();
    });
    const req = httpMock.expectOne(apiEndpointConductor);
    expect(req.request.method).toBe('POST');
    req.flush(false);
  });

  it('Debería consultar el conductor por identificación', () => {
    const identificacion = '123';
    const conductor = new Conductor(1, "", identificacion, "", "", "", "", new Date());
    service.consultarPorIdentificacion(identificacion).subscribe(response => {
      expect(response.numeroIdentificacion).toEqual(conductor.numeroIdentificacion);
    });
    const req = httpMock.expectOne(`${apiEndpointConductor}/identificacion/${identificacion}`);
    expect(req.request.method).toBe('GET');
    req.flush(conductor);
  });

});
