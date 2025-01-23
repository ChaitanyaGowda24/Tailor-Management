import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Add this line
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MapComponent } from './map/map.component';
import { TailorHomeComponent } from './pages/tailor-home/tailor-home.component';
import { TailorDashboardComponent } from './pages/tailor-dashboard/tailor-dashboard.component';
import { TailorProfileComponent } from './pages/tailor-profile/tailor-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TailorLayoutComponent } from './shared/tailor-layout/tailor-layout.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    TailorHomeComponent,
    TailorDashboardComponent,
    TailorProfileComponent,
    TailorLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // <-- Add this line
BrowserAnimationsModule,
MatSidenavModule,
MatToolbarModule,
MatIconModule,
MatListModule,
MatTableModule,
MatSelectModule,
MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
