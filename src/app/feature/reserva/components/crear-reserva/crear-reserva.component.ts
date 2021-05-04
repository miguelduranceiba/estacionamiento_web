import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Conductor } from '@conductor/shared/model/conductor';
import { ConductorService } from '@conductor/shared/service/conductor.service';
import { Espacio } from '@espacio/shared/model/espacio';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { Vehiculo } from '@vehiculo/shared/vehiculo';
import { Observable } from 'rxjs';
import { Reserva } from '../../shared/model/reserva';
import { ReservaService } from '../../shared/service/reserva.service';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {
  reservaForm: FormGroup;
  listaEspacio: Observable<Espacio[]>;

  constructor(
    protected serviceReserva: ReservaService, protected router: Router,
    protected serviceVehiculo: VehiculoService, protected serviceConductor: ConductorService, protected serviceEspacio: EspacioService
  ) { }

  ngOnInit(): void {
    this.construirFormularioOcupacion();
    this.consultarEspacioActivo();
  }
  private consultarEspacioActivo() {
    this.listaEspacio = this.serviceEspacio.consultarEspacioActivo();
  }

  private construirFormularioOcupacion() {
    this.reservaForm = new FormGroup({
      idEspacio: new FormControl(null, [Validators.required]),
      identificacionConductor: new FormControl(null, [Validators.required]),
      placa: new FormControl(null, [Validators.required]),
      vehiculo: new FormControl(null, [Validators.required]),
      conductor: new FormControl(null, [Validators.required]),
      fechaInicio: new FormControl(null, [Validators.required, this.validarFecha]),
      fechaFin: new FormControl(null, [Validators.required])
    }, { validators: this.validarFechaInicioMayorFechaFin });
  }

  buscarConductor() {
    this.conductor = null;
    this.serviceConductor.consultarPorIdentificacion(this.reservaForm.controls.identificacionConductor.value).subscribe(response => {
      this.conductor = response;
    }, (error) => {
      console.log(error);
      if (error.status === 404) {
        this.router.navigate(['./conductor/crear']);
      }
    });
  }

  buscarVehiculo() {
    this.vehiculo = null;
    this.serviceVehiculo.consultarPorPlaca(this.reservaForm.controls.placa.value).subscribe(response => {
      this.vehiculo = response;
    }, (error) => {
      if (error.status === 404) {
        this.router.navigate(['./vehiculo/crear']);
      }
    });
  }

  atras() {
    this.router.navigate(['parqueadero/visor']);
  }

  crear() {
    const idEspacio = this.reservaForm.controls.idEspacio.value;
    const fechaInicio = this.reservaForm.controls.fechaInicio.value;
    const fechaFin = this.reservaForm.controls.fechaFin.value;

    const reserva = new Reserva(null, idEspacio, this.conductor.id, this.vehiculo.id, null, fechaInicio, fechaFin, null);
    this.serviceReserva.guardar(reserva).subscribe((exitoso) => {
      if (exitoso) { this.router.navigate(['parqueadero/visor']); }
    });
  }

  public get nombreConductor(): string {
    if (this.conductor) {
      return this.conductor.nombreCompleto;
    } else {
      return '';
    }
  }

  public get nombreVehiculo(): string {
    if (this.vehiculo) {
      return this.vehiculo.placa;
    } else {
      return '';
    }
  }

  private validarFecha(control: AbstractControl) {
    const valor = control.value;
    if (valor) {
      const formato = 'yyyy-MM-dd hh:mm:ss';
      const localidad = 'en-US';
      let fecha = null;
      try {
        fecha = formatDate(valor, formato, localidad);

      } catch (e) {
      }
      console.log(fecha);
      if (!fecha || fecha !== valor) {
        return { formatoFechaInvalido: true };
      }
    }
    return null;
  }

  private validarFechaInicioMayorFechaFin(control: AbstractControl) {
    const fechaInicio: string = control.get('fechaInicio').value;
    const fechaFin: string = control.get('fechaFin').value;

    if (fechaInicio && fechaFin) {
      if (new Date(fechaFin) < new Date(fechaInicio)) {
        return { fechaInicioMayorAFechaFin: true };
      }
    }
    return null;
  }

  private set conductor(value: Conductor) {
    this.reservaForm.controls.conductor.setValue(value);
  }

  private set vehiculo(value: Vehiculo) {
    this.reservaForm.controls.vehiculo.setValue(value);
  }

  private get conductor() {
    return this.reservaForm.controls.conductor.value;
  }

  private get vehiculo() {
    return this.reservaForm.controls.vehiculo.value;
  }
}
