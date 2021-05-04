import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Espacio } from '@espacio/shared/model/espacio';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { OcupacionService } from '@ocupacion/shared/service/ocupacion.service';
import { of } from 'rxjs';
import { ParqueaderoComponent } from './parqueadero.component';


describe('ParqueaderoComponent', () => {
  let component: ParqueaderoComponent;
  let fixture: ComponentFixture<ParqueaderoComponent>;
  let ocupacionService: OcupacionService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ParqueaderoComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [EspacioService, HttpService, OcupacionService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueaderoComponent);
    component = fixture.componentInstance;
    ocupacionService = TestBed.inject(OcupacionService);
    router = TestBed.inject(Router);
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería enviar a crear una ocupación', () => {
    const idOcupacion = 1;
    const espacio = new Espacio(1, '', 1, idOcupacion, new Date());
    const navigateSpy = spyOn(router, 'navigate');

    component.acccionOcupacion(espacio);
    expect(navigateSpy).toHaveBeenCalledWith(['./parqueadero/crear', idOcupacion]);
  });

  it('Debería enviar a pagar', fakeAsync(() => {
    const idOcupacion = 1;
    const espacio = new Espacio(1, '', 0, idOcupacion, new Date());
    const ocupacionSpy = spyOn(ocupacionService, 'pagar').and.returnValue(
      of(true)
    );

    component.acccionOcupacion(espacio);
    tick();
    expect(ocupacionSpy).toHaveBeenCalled();
  }));

});
