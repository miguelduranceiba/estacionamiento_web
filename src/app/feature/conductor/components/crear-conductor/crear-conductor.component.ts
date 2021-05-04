import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConductorService } from '../../shared/service/conductor.service';

@Component({
  selector: 'app-crear-conductor',
  templateUrl: './crear-conductor.component.html',
  styleUrls: ['./crear-conductor.component.css']
})
export class CrearConductorComponent implements OnInit {

  conductorForm: FormGroup;

  constructor(protected serviceConductor: ConductorService, protected router: Router) { }

  ngOnInit(): void {
    this.construirFormularioEspacio();
  }

  crear() {
    this.serviceConductor.guardar(this.conductorForm.value).subscribe((exitoso) => {
      if (exitoso) { this.router.navigate(['/parqueadero/visor']); }
    });
  }

  construirFormularioEspacio() {
    this.conductorForm = new FormGroup({
      tipoIdentificacion: new FormControl(null, [Validators.required]),
      numeroIdentificacion: new FormControl(null, [Validators.required]),
      primerNombre: new FormControl(null, [Validators.required]),
      segundoNombre: new FormControl(null),
      primerApellido: new FormControl(null, [Validators.required]),
      segundoApellido: new FormControl(null),
    });
  }
}
