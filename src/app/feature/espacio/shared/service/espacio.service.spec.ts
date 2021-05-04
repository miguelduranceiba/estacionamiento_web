import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { EspacioBuilder } from '../model/espacio.builder';
import { EspacioService } from './espacio.service';


describe('EspacioService', () => {
  let service: EspacioService;
  let httpMock: HttpTestingController;
  const apiEndpointEspacio = `${environment.endpoint}/espacio`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EspacioService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(EspacioService);
  });

  it('should be created', () => {
    const espacioServicio: EspacioService = TestBed.inject(EspacioService);
    expect(espacioServicio).toBeTruthy();
  });

  it('Debería listar los espacios', () => {
    const dummyEspacios = [
      new EspacioBuilder().build(), new EspacioBuilder().build()
    ];
    service.consultar().subscribe(listaEspacio => {
      expect(listaEspacio.length).toBe(2);
      expect(listaEspacio).toEqual(dummyEspacios);
    });
    const req = httpMock.expectOne(apiEndpointEspacio);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEspacios);
  });

  it('No debería listar los espacios', () => {
    const dummyEspacios = [];
    service.consultar().subscribe(listaEspacio => {
      expect(listaEspacio.length).toBe(0);
      expect(listaEspacio).toEqual(dummyEspacios);
    });
    const req = httpMock.expectOne(apiEndpointEspacio);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEspacios);
  });

  it('Debería crear espacios', () => {
    const espacio = new EspacioBuilder().build();
    service.guardar(espacio).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(apiEndpointEspacio);
    expect(req.request.method).toBe('POST');
    req.flush(true);
  });

  it('No debería crear espacios', () => {
    const espacio = new EspacioBuilder().build();
    service.guardar(espacio).subscribe(response => {
      expect(response).toBeFalse();
    });
    const req = httpMock.expectOne(apiEndpointEspacio);
    expect(req.request.method).toBe('POST');
    req.flush(false);
  });

  it('Debería actualizar espacios', () => {
    const espacio = new EspacioBuilder().conId(1).build();
    service.actualizar(espacio, espacio.id).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(`${apiEndpointEspacio}/${espacio.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(true);
  });

  it('No debería actualizar espacios', () => {
    const espacio = new EspacioBuilder().conId(1).build();
    service.actualizar(espacio, espacio.id).subscribe(response => {
      expect(response).toBeFalse();
    });
    const req = httpMock.expectOne(`${apiEndpointEspacio}/${espacio.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(false);
  });

  it('Debería eliminar espacio', () => {
    const id = 1;
    service.eliminar(id).subscribe(response => {
      expect(response).toBeTrue();
    });
    const req = httpMock.expectOne(`${apiEndpointEspacio}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

  it('No debería eliminar espacio', () => {
    const id = 1;
    service.eliminar(id).subscribe(response => {
      expect(response).toBeFalse();
    });
    const req = httpMock.expectOne(`${apiEndpointEspacio}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(false);
  });

  it('Debería consultar por Id del espacio', () => {
    const id = 1;
    const espacio = new EspacioBuilder().conId(id).build();
    service.consultarPorId(id).subscribe(response => {
      expect(response.id).toEqual(id);
    });
    const req = httpMock.expectOne(`${apiEndpointEspacio}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(espacio);
  });

  it('Debería consultar por Id del espacio', () => {
    const dummyEspacios = [
      new EspacioBuilder().build(), new EspacioBuilder().build()
    ];
    service.consultarEspacioActivo().subscribe(listaEspacio => {
      expect(listaEspacio.length).toBe(2);
      expect(listaEspacio).toEqual(dummyEspacios);
    });
    const req = httpMock.expectOne(`${apiEndpointEspacio}/disponible`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEspacios);
  });

});
