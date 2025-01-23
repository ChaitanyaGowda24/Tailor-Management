import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TailorService {
  // Mock data for tailor shops
  private tailorShopsData = [
    { id: 1, name: 'Tailor Shop A', category: ['Suits', 'Ethnic Suit'] ,
      priceList :[
      { name: 'Suits', price: 500 },
      { name: 'Ethnic Suit', price: 700 }

    ]},
    { id: 2, name: 'Tailor Shop B', category: ['Blouse', 'Lehenga', 'Churidar Suit'],
      priceList :[
          { name: 'Blouse', price: 500 },
          { name: 'Kurti', price: 700 },
          { name: 'Churidar Suit', price: 1200 }
        ]},
    { id: 3, name: 'Tailor Shop C', category: ['Blouse', 'Lehenga', 'Churidar Suit'],
      priceList :[
                { name: 'Blouse', price: 500 },
                { name: 'Kurti', price: 700 },
                { name: 'Churidar Suit', price: 1200 }
              ]}
    // Add other tailor shops here...
  ];




  constructor() {}

  // Method to fetch tailor shops
  getTailorShops(): Observable<any[]> {
    return of(this.tailorShopsData); // Return mock data as an observable
  }
}
