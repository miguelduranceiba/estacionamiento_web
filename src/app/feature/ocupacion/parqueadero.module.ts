import { NgModule } from '@angular/core';
import { ConductorService } from '@conductor/shared/service/conductor.service';
import { EspacioService } from '@espacio/shared/service/espacio.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { SharedModule } from '@shared/shared.module';
import { VehiculoService } from '@vehiculo/shared/service/vehiculo.service';
import { CrearOcupacionComponent } from './components/crear-ocupacion/crear-ocupacion.component';
import { ParqueaderoComponent } from './components/parqueadero/parqueadero.component';
import { OcupacionRoutingModule } from './ocupacion-routing.module';
import { OcupacionService } from './shared/service/ocupacion.service';

@NgModule({
  declarations: [
    ParqueaderoComponent,
    CrearOcupacionComponent
  ],
  imports: [
    SharedModule,
    OcupacionRoutingModule,
  ],
  providers: [EspacioService, ConductorService, VehiculoService, OcupacionService, ReservaService]
})
export class ParqueaderoModule { }
