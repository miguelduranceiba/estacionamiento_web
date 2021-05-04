import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspacioService } from '@espacio/shared/service/espacio.service';

@Component({
  selector: 'app-actualizar-espacio',
  templateUrl: './actualizar-espacio.component.html',
  styleUrls: ['./actualizar-espacio.component.css']
})
export class ActualizarEspacioComponent implements OnInit {

  id: number;
  espacioForm: FormGroup;
  listaEstado: any[] = [{ id: 1, nombre: 'Disponible' }, { id: 2, nombre: 'Inactivo' }];

  constructor(protected serviceEspacio: EspacioService, private route: ActivatedRoute, protected router: Router) { }

  ngOnInit(): void {
    this.cargarParametro();
    this.construirFormularioEspacio();
  }

  cargarParametro() {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.consultarPorId();
  }

  consultarPorId() {
    this.serviceEspacio.consultarPorId(this.id).subscribe(response => {
      this.espacioForm.controls.nombre.setValue(response.nombre);
      this.espacioForm.controls.estado.setValue(response.estado);
    });
  }

  actualizar() {
    this.serviceEspacio.actualizar(this.espacioForm.value, this.id).subscribe((exitoso) => {
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
