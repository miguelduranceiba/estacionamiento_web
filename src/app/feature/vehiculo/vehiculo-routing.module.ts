import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearVehiculoComponent } from './components/crear-vehiculo/crear-vehiculo.component';

const routes: Routes = [
  {
    path: 'crear',
    component: CrearVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
