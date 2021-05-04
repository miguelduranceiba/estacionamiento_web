import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { Observable } from 'rxjs';
import { Conductor } from 'src/app/feature/conductor/shared/model/conductor';
import { ConductorService } from 'src/app/feature/conductor/shared/service/conductor.service';
import { VehiculoService } from 'src/app/feature/vehiculo/shared/service/vehiculo.service';
import { Vehiculo } from 'src/app/feature/vehiculo/shared/vehiculo';
import { Ocupacion } from '../../shared/model/ocupacion';
import { OcupacionService } from '../../shared/service/ocupacion.service';

@Component({
  selector: 'app-crear-ocupacion',
  templateUrl: './crear-ocupacion.component.html',
  styleUrls: ['./crear-ocupacion.component.css']
})
export class CrearOcupacionComponent implements OnInit {

  ocupacionForm: FormGroup;
  idEspacio: number = null;
  listaReserva: Observable<Reserva[]>;

  constructor(
    protected serviceConductor: ConductorService, private route: ActivatedRoute, protected router: Router,
    protected serviceVehiculo: VehiculoService, protected serviceParqueadero: OcupacionService, protected serviceReserva: ReservaService
  ) { }

  ngOnInit(): void {
    this.construirFormularioOcupacion();
    this.consultarParametroEspacio();
  }

  consultarParametroEspacio() {
    this.idEspacio = Number(this.route.snapshot.paramMap.get('id'));
  }

  consultarReservas(idVehiculo: number) {
    this.listaReserva = this.serviceReserva.consultarReservaPorVehiculo(idVehiculo);
  }

  construirFormularioOcupacion() {
    this.ocupacionForm = new FormGroup({
      identificacionConductor: new FormControl(null, [Validators.required]),
      placa: new FormControl(null, [Validators.required]),
      idReserva: new FormControl(null),
      conductor: new FormControl(null, [Validators.required]),
      vehiculo: new FormControl(null, [Validators.required])
    });
  }

  buscarConductor() {
    this.conductor = null;
    this.serviceConductor.consultarPorIdentificacion(this.ocupacionForm.controls.identificacionConductor.value).subscribe(response => {
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
    this.serviceVehiculo.consultarPorPlaca(this.ocupacionForm.controls.placa.value).subscribe(response => {
      this.vehiculo = response;
      this.consultarReservas(this.vehiculo.id);
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
    const idReserva = this.ocupacionForm.controls.idReserva.value;
    const ocupacion = new Ocupacion(null, this.idEspacio, this.conductor.id, this.vehiculo.id, idReserva, null, null, null);
    this.serviceParqueadero.guardar(ocupacion).subscribe((exitoso) => {
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

  set conductor(value: Conductor) {
    this.ocupacionForm.controls.conductor.setValue(value);
  }

  get conductor() {
    return this.ocupacionForm.controls.conductor.value;
  }

  set vehiculo(value: Vehiculo) {
    this.ocupacionForm.controls.vehiculo.setValue(value);
  }

  get vehiculo() {
    return this.ocupacionForm.controls.vehiculo.value;
  }
}
