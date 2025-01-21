import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent {

constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]); // This will navigate to the desired route
}
}



