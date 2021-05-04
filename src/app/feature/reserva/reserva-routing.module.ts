import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';

const routes: Routes = [
  {
    path: 'crear',
    component: CrearReservaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
