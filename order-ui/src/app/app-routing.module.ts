import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { TailorComponent } from './components/tailor/tailor.component';
import { DressComponent } from './components/dress/dress.component';
import { OrderComponent } from './components/order/order.component';
import { MeasurementComponent } from './components/measurement/measurement.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'tailors', component: TailorComponent },
  { path: 'dresses', component: DressComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'measurements', component: MeasurementComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
