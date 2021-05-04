import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { Espacio } from '../../shared/model/espacio';
import { EspacioBuilder } from '../../shared/model/espacio.builder';
import { EspacioService } from '../../shared/service/espacio.service';
import { ListarEspacioComponent } from './listar-espacio.component';


describe('ListarEspacioComponent', () => {
  let component: ListarEspacioComponent;
  let fixture: ComponentFixture<ListarEspacioComponent>;
  let espacioService: EspacioService;
  const listarEspacio: Espacio[] = [new EspacioBuilder().conId(1).build(), new EspacioBuilder().conId(2).build()];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarEspacioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [EspacioService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEspacioComponent);
    component = fixture.componentInstance;
    espacioService = TestBed.inject(EspacioService);
    spyOn(espacioService, 'consultar').and.returnValue(
      of(listarEspacio)
    );
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render two espacios', () => {
    const compiled: Element = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#lista_espacios').children.length).toBe(2);
  });

  it('Should delete a item', () => {
    const id = 1;

    spyOn(espacioService, 'eliminar').withArgs(id).and.returnValue(of(true));
    component.eliminar(id);

    component.listaEspacio.subscribe(() => {
      fixture.detectChanges();
      const compiled: Element = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#lista_espacios').children.length).toBe(1);
    });

  });

});
