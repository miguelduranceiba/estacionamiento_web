import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Espacio } from '../../shared/model/espacio';
import { EspacioService } from '../../shared/service/espacio.service';

@Component({
  selector: 'app-listar-espacio',
  templateUrl: './listar-espacio.component.html',
  styleUrls: ['./listar-espacio.component.css']
})
export class ListarEspacioComponent implements OnInit {

  public listaEspacio: Observable<Espacio[]>;

  constructor(protected espacioService: EspacioService) { }

  ngOnInit() {
    this.listaEspacio = this.espacioService.consultar();
  }

  eliminar(id: number) {
    this.espacioService.eliminar(id).subscribe(() => {
      this.listaEspacio = this.listaEspacio.pipe(
        map((espacios) => espacios.filter(espacio => espacio.id !== id))
      );
    });
  }

}
