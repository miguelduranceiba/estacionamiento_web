import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard] },
  { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule) },
  { path: 'espacio', loadChildren: () => import('@espacio/espacio.module').then(mod => mod.EspacioModule) },
  { path: 'parqueadero', loadChildren: () => import('@ocupacion/parqueadero.module').then(mod => mod.ParqueaderoModule) },
  { path: 'conductor', loadChildren: () => import('@conductor/conductor.module').then(mod => mod.ConductorModule) },
  { path: 'vehiculo', loadChildren: () => import('@vehiculo/vehiculo.module').then(mod => mod.VehiculoModule) },
  { path: 'reserva', loadChildren: () => import('@reserva/reserva.module').then(mod => mod.ReservaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
