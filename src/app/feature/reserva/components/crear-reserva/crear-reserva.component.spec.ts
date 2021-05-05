import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Conductor } from '@conductor/shared/model/conductor';
import { ConductorService } from '@conductor/shared/service/conductor.service';
import { HttpService } from '@core/services/http.service';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { Vehiculo } from '@vehiculo/shared/vehiculo';
import { of, throwError } from 'rxjs';
import { CrearReservaComponent } from './crear-reserva.component';


describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;
  let router: Router;
  let conductorService: ConductorService;
  let vehiculoService: VehiculoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearReservaComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [HttpService, ReservaService, VehiculoService, EspacioService, ConductorService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    router = TestBed.inject(Router);
    conductorService = TestBed.inject(ConductorService);
    vehiculoService = TestBed.inject(VehiculoService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario es inválido cuando esta vacío', () => {
    expect(component.reservaForm.valid).toBeFalsy();
  });

  it('Formulario está diligenciado existosamente', () => {
    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.idEspacio.setValue(1);
    component.reservaForm.controls.identificacionConductor.setValue('123');
    component.reservaForm.controls.placa.setValue('PLACA');
    component.reservaForm.controls.vehiculo.setValue({ id: 1 });
    component.reservaForm.controls.conductor.setValue({ id: 1 });
    component.reservaForm.controls.fechaInicio.setValue('2021-01-01 08:01:01');
    component.reservaForm.controls.fechaFin.setValue('2021-01-01 09:01:01');

    expect(component.reservaForm.valid).toBeTruthy();
  });

  it('Crear reserva exisoto', fakeAsync(() => {
    spyOn(reservaService, 'guardar').and.returnValue(
      of(true)
    );

    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.idEspacio.setValue(1);
    component.reservaForm.controls.identificacionConductor.setValue('123');
    component.reservaForm.controls.placa.setValue('PLACA');
    component.reservaForm.controls.vehiculo.setValue({ id: 1 });
    component.reservaForm.controls.conductor.setValue({ id: 1 });
    component.reservaForm.controls.fechaInicio.setValue('2021-01-01 08:01:01');
    component.reservaForm.controls.fechaFin.setValue('2021-01-01 09:01:01');
    expect(component.reservaForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['parqueadero/visor']);
  }));

  it('No debería ejecutar el router', () => {
    spyOn(reservaService, 'guardar').and.returnValue(
      of(false)
    );

    component.reservaForm.controls.idEspacio.setValue(1);
    component.reservaForm.controls.identificacionConductor.setValue('123');
    component.reservaForm.controls.placa.setValue('PLACA');
    component.reservaForm.controls.vehiculo.setValue({ id: 1 });
    component.reservaForm.controls.conductor.setValue({ id: 1 });
    component.reservaForm.controls.fechaInicio.setValue('2021-01-01 08:01:01');
    component.reservaForm.controls.fechaFin.setValue('2021-01-01 09:01:01');
    expect(component.reservaForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    expect(navigateSpy).not.toHaveBeenCalled();
  });


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

  it('El conductor no se encontró y debe enviarlo a crear', fakeAsync(() => {
    spyOn(conductorService, 'consultarPorIdentificacion').and.callFake(() => {
      return throwError({ status: 404 });
    });

    const navigateSpy = spyOn(router, 'navigate');

    component.buscarConductor();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['./conductor/crear']);
  }));

  it('Buscar vehículo y es encontrado', fakeAsync(() => {
    const id = 1;
    const vehiculo = new Vehiculo(id, '', '', new Date());
    spyOn(vehiculoService, 'consultarPorPlaca').and.returnValue(
      of(vehiculo)
    );

    component.buscarVehiculo();
    tick();
    expect(component.vehiculo.id).toBe(id);
  }));

  it('El vehículo no se encontró y debe enviarlo a crear', fakeAsync(() => {
    spyOn(vehiculoService, 'consultarPorPlaca').and.callFake(() => {
      return throwError({ status: 404 });
    });

    const navigateSpy = spyOn(router, 'navigate');

    component.buscarVehiculo();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['./vehiculo/crear']);
  }));

  it('Ir al visor del parqueadreo', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.atras();
    expect(navigateSpy).toHaveBeenCalledWith(['parqueadero/visor']);
  });

});
