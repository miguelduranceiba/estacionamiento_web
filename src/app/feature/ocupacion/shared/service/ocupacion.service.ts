import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Ocupacion } from '../model/ocupacion';

@Injectable()
export class OcupacionService {

  private apiOcupacion = `${environment.endpoint}/ocupacion`;

  constructor(protected http: HttpService) { }

  guardar(ocupacion: Ocupacion) {
    return this.http.doPost<Ocupacion, boolean>(`${this.apiOcupacion}`, ocupacion,
      this.http.optsName('Crear Ocupación'));
  }

  pagar(idOcupacion: any) {
    return this.http.doPost<Ocupacion, boolean>(`${this.apiOcupacion}/pagar/${idOcupacion}`, null,
      this.http.optsName('Pagar Ocupación'));
  }
}
