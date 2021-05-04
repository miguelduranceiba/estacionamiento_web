import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EspacioService } from '../../shared/service/espacio.service';

@Component({
  selector: 'app-crear-espacio',
  templateUrl: './crear-espacio.component.html',
  styleUrls: ['./crear-espacio.component.css']
})
export class CrearEspacioComponent implements OnInit {

  espacioForm: FormGroup;
  listaEstado: any[] = [{ id: 1, nombre: 'Disponible' }, { id: 2, nombre: 'Inactivo' }];

  constructor(protected serviceEspacio: EspacioService, protected router: Router) { }

  ngOnInit(): void {
    this.construirFormularioEspacio();
  }

  crear() {
    this.serviceEspacio.guardar(this.espacioForm.value).subscribe((exitoso) => {
      if (exitoso) { this.router.navigate(['espacio/listar']); }
    });
  }

  construirFormularioEspacio() {
    this.espacioForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
    });
  }

}
