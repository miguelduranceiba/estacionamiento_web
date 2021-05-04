import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConductorService } from '@conductor/shared/service/conductor.service';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';

import { CrearConductorComponent } from './crear-conductor.component';

describe('CrearConductorComponent', () => {
  let component: CrearConductorComponent;
  let fixture: ComponentFixture<CrearConductorComponent>;
  let conductorService: ConductorService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearConductorComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [ConductorService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearConductorComponent);
    component = fixture.componentInstance;
    conductorService = TestBed.inject(ConductorService);
    router = TestBed.inject(Router);
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería el formulario ser ', () => {
    expect(component.conductorForm.valid).toBeFalsy();
  });

  it('Formulario está diligenciado exitosabmente', () => {
    expect(component.conductorForm.valid).toBeFalsy();
    component.conductorForm.controls.tipoIdentificacion.setValue('CC');
    component.conductorForm.controls.numeroIdentificacion.setValue('1234');
    component.conductorForm.controls.primerNombre.setValue('PRIMER');
    component.conductorForm.controls.primerApellido.setValue('SEGUNDO');

    expect(component.conductorForm.valid).toBeTruthy();
  });

  it('Crear conductor exisoto', fakeAsync(() => {
    spyOn(conductorService, 'guardar').and.returnValue(
      of(true)
    );

    expect(component.conductorForm.valid).toBeFalsy();
    component.conductorForm.controls.tipoIdentificacion.setValue('CC');
    component.conductorForm.controls.numeroIdentificacion.setValue('1234');
    component.conductorForm.controls.primerNombre.setValue('PRIMER');
    component.conductorForm.controls.primerApellido.setValue('SEGUNDO');
    expect(component.conductorForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['/parqueadero/visor']);
  }));

  it('No debería ejecutar el router', () => {
    spyOn(conductorService, 'guardar').and.returnValue(
      of(false)
    );

    expect(component.conductorForm.valid).toBeFalsy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

});
