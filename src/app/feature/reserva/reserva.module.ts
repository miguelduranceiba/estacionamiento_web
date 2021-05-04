import { NgModule } from '@angular/core';
import { ConductorService } from '@conductor/shared/service/conductor.service';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { SharedModule } from '@shared/shared.module';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { ReservaService } from './shared/service/reserva.service';

@NgModule({
  declarations: [
    CrearReservaComponent
  ],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [ReservaService, VehiculoService, EspacioService, ConductorService]
})
export class ReservaModule { }
