import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ActualizarEspacioComponent } from './components/actualizar-espacio/actualizar-espacio.component';
import { CrearEspacioComponent } from './components/crear-espacio/crear-espacio.component';
import { EspacioComponent } from './components/espacio/espacio.component';
import { ListarEspacioComponent } from './components/listar-espacio/listar-espacio.component';
import { EspacioRoutingModule } from './espacio-routing.module';
import { EspacioService } from './shared/service/espacio.service';


@NgModule({
  declarations: [
    CrearEspacioComponent,
    ListarEspacioComponent,
    ActualizarEspacioComponent,
    EspacioComponent
  ],
  imports: [
    EspacioRoutingModule,
    SharedModule
  ],
  providers: [EspacioService]
})
export class EspacioModule { }
