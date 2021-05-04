import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearOcupacionComponent } from './components/crear-ocupacion/crear-ocupacion.component';
import { ParqueaderoComponent } from './components/parqueadero/parqueadero.component';

const routes: Routes = [
  {
    path: 'visor',
    component: ParqueaderoComponent,
  },
  {
    path: 'crear/:id',
    component: CrearOcupacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcupacionRoutingModule { }
