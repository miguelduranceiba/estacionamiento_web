import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';

@Injectable()
export class ReservaService {

  private apiReserva = `${environment.endpoint}/reserva`;

  constructor(protected http: HttpService) { }

  guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, boolean>(`${this.apiReserva}`, reserva,
      this.http.optsName('Crear Reserva'));
  }

  consultarReservaPorVehiculo(idVehiculo: number) {
    return this.http.doGet<Reserva[]>(`${this.apiReserva}/vehiculo/${idVehiculo}`,
      this.http.optsName('Consultar Reservas por Vehículo')).pipe(
        map(listaJson => listaJson.map(json =>
          new Reserva(
            json.id, json.idEspacio, json.idConductor, json.idVehiculo, json.estado,
            json.fechaInicio, json.fechaFin, json.fechaCreacion
          )
        )),
      );
  }
}
