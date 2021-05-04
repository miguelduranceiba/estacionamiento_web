import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { of } from 'rxjs';
import { CrearVehiculoComponent } from './crear-vehiculo.component';

describe('CrearVehiculoComponent', () => {
  let component: CrearVehiculoComponent;
  let fixture: ComponentFixture<CrearVehiculoComponent>;
  let vehiculoService: VehiculoService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearVehiculoComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [VehiculoService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVehiculoComponent);
    component = fixture.componentInstance;
    vehiculoService = TestBed.inject(VehiculoService);
    router = TestBed.inject(Router);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario es invalido cuando esta vácio', () => {
    expect(component.vehiculoForm.valid).toBeFalsy();
  });

  it('Formulario está diligenciado exitosamente', () => {
    expect(component.vehiculoForm.valid).toBeFalsy();
    component.vehiculoForm.controls.placa.setValue('Vehículo test');
    component.vehiculoForm.controls.tipoVehiculo.setValue(1);
    expect(component.vehiculoForm.valid).toBeTruthy();
  });

  it('Crear vehículo exitoso', fakeAsync(() => {
    spyOn(vehiculoService, 'guardar').and.returnValue(
      of(true)
    );

    expect(component.vehiculoForm.valid).toBeFalsy();
    component.vehiculoForm.controls.placa.setValue('Vehículo test');
    component.vehiculoForm.controls.tipoVehiculo.setValue(1);
    expect(component.vehiculoForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['/parqueadero/visor']);
  }));

  it('No debería ejecutar el router', () => {
    spyOn(vehiculoService, 'guardar').and.returnValue(
      of(false)
    );

    expect(component.vehiculoForm.valid).toBeFalsy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

});
