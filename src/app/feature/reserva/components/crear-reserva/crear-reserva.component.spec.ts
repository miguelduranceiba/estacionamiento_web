import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConductorService } from '@conductor/shared/service/conductor.service';
import { HttpService } from '@core/services/http.service';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { of } from 'rxjs';
import { CrearReservaComponent } from './crear-reserva.component';


describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;
  let router: Router;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario es invalido cuando esta vacio', () => {
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

});
