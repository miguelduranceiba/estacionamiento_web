import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';
import { ReservaService } from './reserva.service';


describe('ReservaService', () => {
  let service: ReservaService;
  let httpMock: HttpTestingController;
  const apiEndpointReserva = `${environment.endpoint}/reserva`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debería crear vehículo', () => {
    const reserva = new Reserva(1, 1, 1, 1, 1, new Date(), new Date(), new Date());
    service.guardar(reserva).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(apiEndpointReserva);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('No debería crear vehículo', () => {
    const reserva = new Reserva(1, 1, 1, 1, 1, new Date(), new Date(), new Date());
    service.guardar(reserva).subscribe(response => {
      expect(response).toBeFalse();
    });
    const req = httpMock.expectOne(apiEndpointReserva);
    expect(req.request.method).toBe('POST');
    req.flush(false);
  });

  it('Consultar reserva por vehículo', () => {
    const idReserva = 1;
    const dummyReserva = [new Reserva(1, 1, 1, 1, 1, new Date(), new Date(), new Date())];
    service.consultarReservaPorVehiculo(idReserva).subscribe(response => {
      expect(response.length).toBe(1);
      expect(response).toEqual(dummyReserva);
    });

    const req = httpMock.expectOne(`${apiEndpointReserva}/vehiculo/${idReserva}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReserva);
  });

});
