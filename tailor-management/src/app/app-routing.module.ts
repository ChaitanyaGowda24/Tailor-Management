import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TailorHomeComponent } from './pages/tailor-home/tailor-home.component';
import { TailorDashboardComponent } from './pages/tailor-dashboard/tailor-dashboard.component';
import { TailorProfileComponent } from './pages/tailor-profile/tailor-profile.component';
import { TailorLayoutComponent } from './shared/tailor-layout/tailor-layout.component';
const routes: Routes = [
{ path: '', component: IndexComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{
path: '',
component: TailorLayoutComponent, // Use tailor-layout as a wrapper
children: [
{ path: 'tailor-home', component: TailorHomeComponent },
{ path: 'tailor-dashboard', component: TailorDashboardComponent },
{ path: 'tailor-profile', component: TailorProfileComponent },
],
},
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
