import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CrearVehiculoComponent } from './components/crear-vehiculo/crear-vehiculo.component';
import { VehiculoService } from './shared/service/vehiculo.service';
import { VehiculoRoutingModule } from './vehiculo-routing.module';



@NgModule({
  declarations: [
    CrearVehiculoComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
    SharedModule
  ],
  providers: [VehiculoService]
})
export class VehiculoModule { }
