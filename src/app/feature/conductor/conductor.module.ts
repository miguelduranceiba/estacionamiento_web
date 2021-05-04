import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';
import { ConductorRoutingModule } from './conductor-routing.module';
import { ConductorService } from './shared/service/conductor.service';



@NgModule({
  declarations: [
    CrearConductorComponent,
  ],
  imports: [
    CommonModule,
    ConductorRoutingModule,
    SharedModule
  ],
  providers: [ConductorService]
})
export class ConductorModule { }
