import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearConductorComponent } from './components/crear-conductor/crear-conductor.component';

const routes: Routes = [
  {
    path: 'crear',
    component: CrearConductorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductorRoutingModule { }
