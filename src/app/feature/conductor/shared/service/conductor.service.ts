import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Conductor } from '../model/conductor';

@Injectable()
export class ConductorService {
  private apiConductor = `${environment.endpoint}/conductores`;

  constructor(protected http: HttpService) { }

  public consultarPorIdentificacion(identificacion: string) {
    return this.http.doGet<Conductor>(`${this.apiConductor}/identificacion/${identificacion}`, this.http.optsName('Consultar Conductor Por Identificación')).pipe(
      map(json => new Conductor(
        json.id, json.tipoIdentificacion, json.numeroIdentificacion, json.primerNombre, json.segundoNombre,
        json.primerApellido, json.segundoApellido, json.fechaCreacion
      )),
    );
  }

  public guardar(conductor: Conductor) {
    return this.http.doPost<Conductor, boolean>(`${this.apiConductor}`, conductor,
      this.http.optsName('Crear Conductor'));
  }
}
