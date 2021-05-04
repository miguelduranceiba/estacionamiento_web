import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vehiculo } from '../vehiculo';

@Injectable()
export class VehiculoService {

  private apiVehiculo = `${environment.endpoint}/vehiculos`;

  constructor(protected http: HttpService) { }

  consultarPorPlaca(placa: string) {
    return this.http.doGet<Vehiculo>(`${this.apiVehiculo}/placa/${placa}`, this.http.optsName('Consultar Vehículo por Placa')).pipe(
      map(json => new Vehiculo(json.id, json.placa, json.tipoVehiculo, json.fechaCreacion)),
    );
  }

  guardar(vehiculo: Vehiculo) {
    return this.http.doPost<Vehiculo, boolean>(`${this.apiVehiculo}`, vehiculo,
      this.http.optsName('Crear Vehículo'));
  }
}
