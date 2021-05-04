import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { of } from 'rxjs';
import { ActualizarEspacioComponent } from './actualizar-espacio.component';

describe('ActualizarEspacioComponent', () => {
  let component: ActualizarEspacioComponent;
  let fixture: ComponentFixture<ActualizarEspacioComponent>;
  let espacioService: EspacioService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarEspacioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        EspacioService, HttpService, {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1
              },
            },
          },
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarEspacioComponent);
    component = fixture.componentInstance;
    espacioService = TestBed.inject(EspacioService);
    router = TestBed.inject(Router);
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.espacioForm.valid).toBeFalsy();
  });

  it('Formulario está diligenciado exitosabmente', () => {
    expect(component.espacioForm.valid).toBeFalsy();
    component.espacioForm.controls.nombre.setValue('Espacio test');
    component.espacioForm.controls.estado.setValue(1);
    expect(component.espacioForm.valid).toBeTruthy();
  });

  it('Actualizar espacio exisoto', fakeAsync(() => {

    spyOn(espacioService, 'actualizar').and.returnValue(
      of(true)
    );

    expect(component.espacioForm.valid).toBeFalsy();
    component.espacioForm.controls.nombre.setValue('Espacio test');
    component.espacioForm.controls.estado.setValue(1);
    expect(component.espacioForm.valid).toBeTruthy();

    const navigateSpy = spyOn(router, 'navigate');

    component.actualizar();
    tick();
    expect(navigateSpy).toHaveBeenCalledWith(['espacio/listar']);
  }));

  it('No debería ejecutar el router', () => {

    spyOn(espacioService, 'actualizar').and.returnValue(
      of(false)
    );

    expect(component.espacioForm.valid).toBeFalsy();

    const navigateSpy = spyOn(router, 'navigate');

    component.actualizar();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
