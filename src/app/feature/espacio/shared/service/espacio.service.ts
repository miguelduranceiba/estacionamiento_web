import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Espacio } from '../model/espacio';

@Injectable()
export class EspacioService {

  private apiEspacio = `${environment.endpoint}/espacio`;

  constructor(protected http: HttpService, protected httpp: HttpClient) { }

  public consultar() {
    return this.http.doGet<Espacio[]>(`${this.apiEspacio}`, this.http.optsName('Listar Espacio')).pipe(
      map(lista => this.listaJsonToEspacio(lista))
    );
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Espacio>(`${this.apiEspacio}/${id}`, this.http.optsName('Consultar Espacio Por Id'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${this.apiEspacio}/${id}`,
      this.http.optsName('Eliminar Espacio'));
  }

  public guardar(espacio: Espacio) {
    return this.http.doPost<Espacio, boolean>(`${this.apiEspacio}`, espacio,
      this.http.optsName('Crear Espacio'));
  }

  public actualizar(espacio: Espacio, id: number) {
    return this.http.doPut<Espacio, boolean>(`${this.apiEspacio}/${id}`, espacio,
      this.http.optsName('Actualizar Espacio'));
  }

  public consultarEspacioActivo() {
    return this.http.doGet<Espacio[]>(`${this.apiEspacio}/disponible`, this.http.optsName('Listar Espacios Disponibles')).pipe(
      map(lista => this.listaJsonToEspacio(lista))
    );
  }

  private listaJsonToEspacio(lista: Espacio[]): Espacio[] {
    return lista.map((json) => this.jsonToEspacio(json));
  }

  private jsonToEspacio(json: Espacio): Espacio {
    return new Espacio(json.id, json.nombre, json.estado, json.idOcupacion, json.fechaCreacion);
  }

}
