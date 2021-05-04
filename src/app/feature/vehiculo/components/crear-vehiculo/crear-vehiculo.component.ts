import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculoService } from '../../shared/service/vehiculo.service';

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.css']
})
export class CrearVehiculoComponent implements OnInit {

  vehiculoForm: FormGroup;
  listaTipoVehiculo: any[] = [{ id: 1, nombre: 'Automóvil' }, { id: 2, nombre: 'Motocicleta' }];

  constructor(protected serviceVehiculo: VehiculoService, protected router: Router) { }

  ngOnInit(): void {
    this.construirFormularioEspacio();
  }

  crear() {
    this.serviceVehiculo.guardar(this.vehiculoForm.value).subscribe((exitoso) => {
      if (exitoso) { this.router.navigate(['/parqueadero/visor']); }
    });
  }

  construirFormularioEspacio() {
    this.vehiculoForm = new FormGroup({
      placa: new FormControl(null, [Validators.required]),
      tipoVehiculo: new FormControl(null, [Validators.required]),
    });
  }
}
