import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { EspacioService } from '../../shared/service/espacio.service';
import { CrearEspacioComponent } from './crear-espacio.component';


describe('CrearEspacioComponent', () => {
  let component: CrearEspacioComponent;
  let fixture: ComponentFixture<CrearEspacioComponent>;
  let espacioService: EspacioService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEspacioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [EspacioService, HttpService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEspacioComponent);
    component = fixture.componentInstance;
    espacioService = TestBed.inject(EspacioService);
    router = TestBed.inject(Router);
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario es invalido cuando esta vacio', () => {
    expect(component.espacioForm.valid).toBeFalsy();
  });

  it('Formulario está diligenciado existosamente', () => {
    expect(component.espacioForm.valid).toBeFalsy();
    component.espacioForm.controls.nombre.setValue('Espacio test');
    component.espacioForm.controls.estado.setValue(1);
    expect(component.espacioForm.valid).toBeTruthy();
  });

  it('Crear espacio exisoto', fakeAsync(() => {
    spyOn(espacioService, 'guardar').and.returnValue(
      of(true)
    );

    expect(component.espacioForm.valid).toBeFalsy();
    component.espacioForm.controls.nombre.setValue('Espacio test');
    component.espacioForm.controls.estado.setValue(1);
    expect(component.espacioForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['espacio/listar']);
  }));

  it('No debería ejecutar el router', () => {
    spyOn(espacioService, 'guardar').and.returnValue(
      of(false)
    );

    expect(component.espacioForm.valid).toBeFalsy();

    const navigateSpy = spyOn(router, 'navigate');

    component.crear();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

});
