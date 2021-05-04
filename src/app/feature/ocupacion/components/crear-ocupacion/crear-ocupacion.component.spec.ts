import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Conductor } from '@conductor/shared/model/conductor';
import { ConductorService } from '@conductor/shared/service/conductor.service';
import { HttpService } from '@core/services/http.service';
import { OcupacionService } from '@ocupacion/shared/service/ocupacion.service';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { of } from 'rxjs';
import { CrearOcupacionComponent } from './crear-ocupacion.component';


describe('CrearOcupacionComponent', () => {
  let component: CrearOcupacionComponent;
  let fixture: ComponentFixture<CrearOcupacionComponent>;
  let ocupacionService: OcupacionService;
  let router: Router;
  let reservaService: ReservaService;
  let conductorService: ConductorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearOcupacionComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [OcupacionService, HttpService, ConductorService, VehiculoService, ReservaService, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => 1
            },
          },
        },
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOcupacionComponent);
    component = fixture.componentInstance;
    ocupacionService = TestBed.inject(OcupacionService);
    reservaService = TestBed.inject(ReservaService);
    conductorService = TestBed.inject(ConductorService);
    router = TestBed.inject(Router);
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario es inválido cuando esta vacío', () => {
    expect(component.ocupacionForm.valid).toBeFalsy();
  });

  it('Formulario está diligenciado exitosamente', () => {
    expect(component.ocupacionForm.valid).toBeFalsy();
    component.ocupacionForm.controls.identificacionConductor.setValue('123');
    component.ocupacionForm.controls.placa.setValue('PLACA');
    component.ocupacionForm.controls.idReserva.setValue(1);
    component.ocupacionForm.controls.conductor.setValue({ id: 1 });
    component.ocupacionForm.controls.vehiculo.setValue({ id: 1 });

    expect(component.ocupacionForm.valid).toBeTruthy();
  });

  it('Crear ocupación exisoto', fakeAsync(() => {
    spyOn(ocupacionService, 'guardar').and.returnValue(
      of(true)
    );

    expect(component.ocupacionForm.valid).toBeFalsy();
    component.ocupacionForm.controls.identificacionConductor.setValue('123');
    component.ocupacionForm.controls.placa.setValue('PLACA');
    component.ocupacionForm.controls.conductor.setValue({ id: 1 });
    component.ocupacionForm.controls.vehiculo.setValue({ id: 1 });
    expect(component.ocupacionForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['parqueadero/visor']);
  }));

  it('No debería ejecutar el router', () => {

    spyOn(ocupacionService, 'guardar').and.returnValue(
      of(false)
    );

    component.ocupacionForm.controls.identificacionConductor.setValue('123');
    component.ocupacionForm.controls.placa.setValue('PLACA');
    component.ocupacionForm.controls.conductor.setValue({ id: 1 });
    component.ocupacionForm.controls.vehiculo.setValue({ id: 1 });
    expect(component.ocupacionForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('Consultar reservas', fakeAsync(() => {
    const dummyReserva = [new Reserva(1, 1, 1, 1, 1, new Date(), new Date(), new Date())];
    spyOn(reservaService, 'consultarReservaPorVehiculo').and.returnValue(
      of(dummyReserva)
    );

    component.consultarReservas(1);
    tick();
    component.listaReserva.subscribe(response => {
      expect(response.length).toBe(1);
      expect(response).toEqual(dummyReserva);
    });
  }));

  it('Buscar conductor y es encontrado', fakeAsync(() => {
    const id = 1;
    const conductor = new Conductor(id, '', '', '', '', '', '', new Date());
    spyOn(conductorService, 'consultarPorIdentificacion').and.returnValue(
      of(conductor)
    );

    component.buscarConductor();
    tick();
    expect(component.conductor.id).toBe(id);
  }));

});
