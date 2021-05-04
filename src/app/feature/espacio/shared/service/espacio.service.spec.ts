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

  it('Should list espacios', () => {
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

});
