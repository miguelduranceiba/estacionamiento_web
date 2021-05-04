import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarEspacioComponent } from './components/actualizar-espacio/actualizar-espacio.component';
import { CrearEspacioComponent } from './components/crear-espacio/crear-espacio.component';
import { EspacioComponent } from './components/espacio/espacio.component';
import { ListarEspacioComponent } from './components/listar-espacio/listar-espacio.component';

const routes: Routes = [
  {
    path: '',
    component: EspacioComponent,
    children: [
      {
        path: 'listar',
        component: ListarEspacioComponent,
      },
      {
        path: 'crear',
        component: CrearEspacioComponent
      },
      {
        path: 'actualizar/:id',
        component: ActualizarEspacioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspacioRoutingModule { }
