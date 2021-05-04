import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { OcupacionService } from '@ocupacion/shared/service/ocupacion.service';

import { ParqueaderoComponent } from './parqueadero.component';

describe('ParqueaderoComponent', () => {
  let component: ParqueaderoComponent;
  let fixture: ComponentFixture<ParqueaderoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParqueaderoComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [EspacioService, HttpService, OcupacionService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
