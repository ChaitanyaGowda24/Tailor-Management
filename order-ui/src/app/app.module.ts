import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { TailorComponent } from './components/tailor/tailor.component';
import { DressComponent } from './components/dress/dress.component';
import { OrderComponent } from './components/order/order.component';
import { MeasurementComponent } from './components/measurement/measurement.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TailorComponent,
    DressComponent,
    OrderComponent,
    MeasurementComponent
  ],
  imports: [BrowserModule,
    HttpClientModule,
    AppRoutingModule, // Add your AppRoutingModule here
    RouterModule,
    FormsModule,
    ReactiveFormsModule],     // Import RouterModule for routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
