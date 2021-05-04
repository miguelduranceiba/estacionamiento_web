import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Espacio } from '@espacio/shared/model/espacio';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { OcupacionService } from '@ocupacion/shared/service/ocupacion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css']
})
export class ParqueaderoComponent implements OnInit {

  listaEspacio: Observable<Espacio[]>;

  constructor(protected serviceEspacio: EspacioService, protected router: Router, protected serviceParqueadero: OcupacionService) { }

  ngOnInit(): void {
    this.consultarEspacios();
  }

  consultarEspacios() {
    this.listaEspacio = this.serviceEspacio.consultarEspacioActivo();
  }

  acccionOcupacion(espacio: Espacio) {
    if (espacio.estado === 1) {
      this.crearOcupacion(espacio.id);
    } else if (espacio.estado === 0) {
      this.pagar(espacio.idOcupacion);
    }
  }

  crearOcupacion(idEspacio: number) {
    this.router.navigate(['./parqueadero/crear', idEspacio]);
  }

  pagar(idOcupacion: number) {
    this.serviceParqueadero.pagar(idOcupacion).subscribe(() => {
      this.consultarEspacios();
    });
  }

}
