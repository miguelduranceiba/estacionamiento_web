import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Vehiculo } from '../vehiculo';

import { VehiculoService } from './vehiculo.service';

describe('VehiculoService', () => {
  let service: VehiculoService;
  let httpMock: HttpTestingController;
  const apiEndpointVehiculo = `${environment.endpoint}/vehiculos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, VehiculoService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(VehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería crear vehículo', () => {
    const vehiculo = new Vehiculo(1, 'PLACA1', '', new Date());
    service.guardar(vehiculo).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(apiEndpointVehiculo);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('No debería crear vehículo', () => {
    const vehiculo = new Vehiculo(1, 'PLACA1', '', new Date());
    service.guardar(vehiculo).subscribe(response => {
      expect(response).toBeFalse();
    });
    const req = httpMock.expectOne(apiEndpointVehiculo);
    expect(req.request.method).toBe('POST');
    req.flush(false);
  });

  it('Debería consultar el vehículo por la placa', () => {
    const placa = 'placa';
    const vehiculo = new Vehiculo(1, placa, '', new Date());
    service.consultarPorPlaca(placa).subscribe(response => {
      expect(response.placa).toEqual(vehiculo.placa);
    });
    const req = httpMock.expectOne(`${apiEndpointVehiculo}/placa/${placa}`);
    expect(req.request.method).toBe('GET');
    req.flush(vehiculo);
  });

});
