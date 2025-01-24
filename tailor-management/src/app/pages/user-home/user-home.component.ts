import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { TailorService } from 'src/app/services/tailor.service';
import jsPDF from 'jspdf';
import * as L from 'leaflet';
@Component({
selector: 'app-order',
templateUrl: './user-home.component.html',
styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
isShopDetailsModalOpen: boolean = false;
selectedShopDetails: any = null;
private map: any; // Leaflet map instance

genderForm: FormGroup;
dressCategories: any[] = [];
tailorShops: any[] = [];
measurementForm: FormGroup;
selectedDress: any = null;
selectedShop: any = null;
designOptions: any = {};
price: number = 0;
billDetails: any = null;
isDesignModalOpen: boolean = false;
isMeasurementModalOpen: boolean = false;
isBillModalOpen: boolean = false;

// Mock data for dress categories
maleDresses = [
{
id: 1,
name: 'Suits',
image: 'assets/images/suit.jpg',
measurementFields: [
{ label: 'Chest', name: 'chest', placeholder: 'Chest in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Length', name: 'length', placeholder: 'Suit length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' }
],
designOptions: {
neckTypes: ['Notch Lapel', 'Peak Lapel', 'Shawl Collar'],
sleeveTypes: ['Full Sleeve'],
cuts: ['Single Breasted', 'Double Breasted'],
otherOptions: ['Ventless', 'Single Vent', 'Double Vent']
}
},
{
id: 2,
name: 'Ethnic Suit',
image: 'assets/images/MensEthenicWear.jpg',
measurementFields: [
{ label: 'Chest', name: 'chest', placeholder: 'Chest in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Length', name: 'length', placeholder: 'Kurta length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' },
{ label: 'Neck', name: 'neck', placeholder: 'Neck circumference in inches' }
],
designOptions: {
neckTypes: ['Round Neck', 'V-Neck', 'Mandarin Collar'],
sleeveTypes: ['Short Sleeve', 'Full Sleeve'],
cuts: ['Straight Cut', 'A-Line'],
otherOptions: ['Side Slits', 'Embroidered Designs']
}
},
{
id: 3,
name: 'Trousers',
image: 'assets/images/MensTrousers.jpg',
measurementFields: [
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Hip', name: 'hip', placeholder: 'Hip in inches' },
{ label: 'Length', name: 'length', placeholder: 'Length in inches' },
{ label: 'Inseam', name: 'inseam', placeholder: 'Inseam length in inches' },
{ label: 'Thigh', name: 'thigh', placeholder: 'Thigh circumference in inches' }
],
designOptions: {
cuts: ['Slim Fit', 'Regular Fit', 'Relaxed Fit'],
otherOptions: ['Pleated', 'Flat Front', 'Cuffed Bottom']
}
},
{
id: 4,
name: 'Formal Shirts',
image: 'assets/images/MensFormal.jpg',
measurementFields: [
{ label: 'Chest', name: 'chest', placeholder: 'Chest in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' },
{ label: 'Length', name: 'length', placeholder: 'Shirt length in inches' },
{ label: 'Collar', name: 'collar', placeholder: 'Collar size in inches' }
],
designOptions: {
neckTypes: ['Spread Collar', 'Point Collar', 'Mandarin Collar'],
sleeveTypes: ['Short Sleeve', 'Long Sleeve'],
cuts: ['Slim Fit', 'Regular Fit'],
otherOptions: ['Pocket', 'No Pocket', 'Button-down Collar']
}
},
{
id: 5,
name: 'Pathani Suit',
image: 'assets/images/pathani suit.jpg',
measurementFields: [
{ label: 'Chest', name: 'chest', placeholder: 'Chest in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' },
{ label: 'Length', name: 'length', placeholder: 'Suit length in inches' },
{ label: 'Collar', name: 'collar', placeholder: 'Collar size in inches' },
{ label: 'Bottom Length', name: 'bottomLength', placeholder: 'Bottom length in inches' }
],
designOptions: {
neckTypes: ['Mandarin Collar', 'Spread Collar'],
sleeveTypes: ['Short Sleeve', 'Long Sleeve'],
styles: ['Plain', 'Embroidered'],
otherOptions: ['Button-down', 'Side Pockets', 'Front Pockets']
}
},
{
id: 6,
name: 'Desi Jacket',
image: 'assets/images/jacket.jpg',
measurementFields: [
{ label: 'Chest', name: 'chest', placeholder: 'Chest in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Length', name: 'length', placeholder: 'Jacket length in inches' },
{ label: 'Armhole', name: 'armhole', placeholder: 'Armhole size in inches' },
{ label: 'Neck Depth', name: 'neckDepth', placeholder: 'Neck depth in inches' }
],
designOptions: {
neckTypes: ['V-Neck', 'Mandarin Collar', 'Round Neck'],
buttonTypes: ['Single-Breasted', 'Double-Breasted'],
fabricTypes: ['Silk', 'Cotton', 'Linen'],
otherOptions: ['With Pocket', 'Without Pocket', 'Embroidered']
}
}

];

femaleDresses = [
{
id: 1,
name: 'Blouse',
image: 'assets/images/WomensBlouse.jpg',
measurementFields: [
{ label: 'Bust', name: 'bust', placeholder: 'Bust in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Length', name: 'length', placeholder: 'Blouse length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' },
{ label: 'Armhole', name: 'armhole', placeholder: 'Armhole circumference in inches' }
],
designOptions: {
sleeveType: ['Full Sleeve', 'Half Sleeve', 'Sleeveless', 'Cap Sleeve'],
neckline: ['Round Neck', 'V Neck', 'Boat Neck', 'Collar Neck'],
backDesign: ['Keyhole', 'Backless', 'Buttoned', 'Plain']
}
},
{
id: 2,
name: 'Kurti',
image: 'assets/images/kurtha.jpg',
measurementFields: [
{ label: 'Bust', name: 'bust', placeholder: 'Bust in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Hip', name: 'hip', placeholder: 'Hip in inches' },
{ label: 'Length', name: 'length', placeholder: 'Kurti length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' }
],
designOptions: {
sleeveType: ['3/4 Sleeve', 'Full Sleeve', 'Sleeveless'],
neckline: ['Round Neck', 'Mandarin Collar', 'Sweetheart Neck'],
hemline: ['Straight', 'Flared', 'Asymmetrical']
}
},
{
id: 3,
name: 'Anarkali Suit',
image: 'assets/images/AnarkaliSuit.jpg',
measurementFields: [
{ label: 'Bust', name: 'bust', placeholder: 'Bust in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Hip', name: 'hip', placeholder: 'Hip in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Length', name: 'length', placeholder: 'Suit length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' }
],
designOptions: {
flare: ['High Flare', 'Medium Flare', 'Low Flare'],
sleeveType: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'],
neckline: ['Round Neck', 'Deep V Neck', 'Square Neck']
}
},
{
id: 4,
name: 'Punjabi Suit',
image: 'assets/images/PunjabiSuits.jpg',
measurementFields: [
{ label: 'Bust', name: 'bust', placeholder: 'Bust in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Hip', name: 'hip', placeholder: 'Hip in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Length', name: 'length', placeholder: 'Suit length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' },
{ label: 'Salwar Length', name: 'salwarLength', placeholder: 'Salwar length in inches' }
],
designOptions: {
salwarType: ['Patiala', 'Straight Cut', 'Dhoti Style'],
kameezPattern: ['Printed', 'Plain', 'Embroidered'],
dupattaStyle: ['Heavy Work', 'Simple', 'Bordered']
}
},
{
id: 5,
name: 'Churidar Suit',
image: 'assets/images/chudidarSuit.jpg',
measurementFields: [
{ label: 'Bust', name: 'bust', placeholder: 'Bust in inches' },
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Hip', name: 'hip', placeholder: 'Hip in inches' },
{ label: 'Shoulder', name: 'shoulder', placeholder: 'Shoulder width in inches' },
{ label: 'Length', name: 'length', placeholder: 'Suit length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Sleeve length in inches' },
{ label: 'Churidar Length', name: 'churidarLength', placeholder: 'Churidar length in inches' }
],
designOptions: {
churidarStyle: ['Tight Fit', 'Loose Fit'],
sleeveType: ['Full Sleeve', 'Half Sleeve', 'Sleeveless'],
neckline: ['Round Neck', 'Deep Neck', 'Boat Neck']
}
},
{
id: 6,
name: 'Lehenga',
image: 'assets/images/Lehenga.jpg',
measurementFields: [
{ label: 'Waist', name: 'waist', placeholder: 'Waist in inches' },
{ label: 'Hip', name: 'hip', placeholder: 'Hip in inches' },
{ label: 'Length', name: 'length', placeholder: 'Lehenga length in inches' },
{ label: 'Blouse Bust', name: 'blouseBust', placeholder: 'Blouse bust in inches' },
{ label: 'Blouse Waist', name: 'blouseWaist', placeholder: 'Blouse waist in inches' },
{ label: 'Blouse Length', name: 'blouseLength', placeholder: 'Blouse length in inches' },
{ label: 'Sleeve', name: 'sleeve', placeholder: 'Blouse sleeve length in inches' }
],
designOptions: {
lehengaStyle: ['Flared', 'Mermaid', 'Straight Cut'],
blouseStyle: ['Embroidered', 'Sequined', 'Plain'],
dupattaStyle: ['Heavy Work', 'Plain', 'Bordered']
}
}
];

//   // Mock data for tailor shops
//   tailorShopsData = [
//     { id: 1, name: 'Tailor Shop A', category: ['Suits','Ethnic Wear'] },
//     { id: 2, name: 'Tailor Shop B', category: ['Blouse', 'Lehenga','Churidar Suit']},
//     { id: 3, name: 'Tailor Shop C', category: ['Blouse', 'Lehenga','Churidar Suit']},
//     // Add other tailor shops here...
//   ];

measurementFields: any[] = [];
designForm: FormGroup;

constructor(private fb: FormBuilder,
    private tailorService: TailorService,
    private router: Router // Inject Router
    ) {
   this.genderForm = this.fb.group({
         gender: ['male', Validators.required] // Default to 'male'
       });

    this.measurementForm = this.fb.group({});
    this.designForm = this.fb.group({});
  }

  ngOnInit(): void {

     this.updateDressCategories('male');
    // Listen to changes in the gender form control
    this.genderForm.get('gender')?.valueChanges.subscribe((value) => {
      if (value) {
        this.updateDressCategories(value);
      }
    });
  }
selectGender(gender: string): void {
  this.genderForm.patchValue({ gender }); // Update the form value
  this.updateDressCategories(gender); // Update dress categories
}

// Navigation methods
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    this.router.navigate(['/landing']); // Redirect to landing page
  }

  updateDressCategories(gender: string): void {
    this.dressCategories = gender === 'male' ? this.maleDresses : this.femaleDresses;
    this.selectedDress = null; // Reset selected dress when gender changes
    this.selectedShop = null; // Reset selected shop when gender changes
  }

  onDressSelect(dress: any): void {
    this.selectedDress = dress;
    this.designOptions = dress.designOptions; // Load design options specific to the dress
    // Fetch tailor shops that support the selected dress category
        this.tailorService.getTailorShops().subscribe((shops) => {
          this.tailorShops = shops
                 .filter((shop) => shop.category.includes(dress.name))
                 .map((shop) => ({
                   ...shop,
                   price: this.getPriceForDress(shop, dress.name), // Add price for the selected dress
                 }));

        // Scroll to tailor shops section
              setTimeout(() => {
                const element = document.getElementById('tailor-shops');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
        });
  }

  getPriceForDress(shop: any, dressName: string): number {
    // Assuming shop has a price list for different dresses
    // Replace the logic with your actual data structure
    if (shop && shop.priceList) {
      const dressPrice = shop.priceList.find((item: any) => item.name === dressName);
      return dressPrice ? dressPrice.price : 0; // Return the price if found, otherwise 0
    }
    return 0; // Default price if no price list is available
  }

// Update the viewShopDashboard method to open the modal instead of navigating
  viewShopDashboard(shopId: number): void {
    const shop = this.tailorShops.find((s) => s.id === shopId);
    if (shop) {
      this.openShopDetailsModal(shop);
    }
  }

  onShopSelect(shop: any): void {
    this.selectedShop = shop;
    this.openDesignModal(); // Open design options modal after selecting a shop
  }

  openDesignModal(): void {
    this.isDesignModalOpen = true;

    // Reset and initialize the design form
    this.designForm = this.fb.group({});
    if (this.designOptions) {
      Object.keys(this.designOptions).forEach((key) => {
        this.designForm.addControl(key, this.fb.control('', Validators.required));
      });
    }
  }

  closeDesignModal(): void {
    this.isDesignModalOpen = false;
  }

  saveDesignOptions(): void {
    this.closeDesignModal();
  }

  openMeasurementModal(): void {
    this.isMeasurementModalOpen = true;
    this.measurementFields = this.selectedDress.measurementFields;

    // Reset and initialize the measurement form
    this.measurementForm = this.fb.group({});
    this.measurementFields.forEach((field: any) => {
      this.measurementForm.addControl(field.name, this.fb.control('', Validators.required));
    });
  }

  closeMeasurementModal(): void {
    this.isMeasurementModalOpen = false;
  }

  calculatePrice(): void {
    const measurements = this.measurementForm.value;
    // Mock price calculation logic
    this.price = 1000; // Replace with actual calculation
    this.closeMeasurementModal();
  }

  openBillModal(): void {
    this.generateBill();
    this.isBillModalOpen = true;
  }

  closeBillModal(): void {
    this.isBillModalOpen = false;
  }

  // Generate bill details
    generateBill(): void {
      this.billDetails = {
        orderId: 12345, // Example order ID
        customerId: 101, // Example customer ID
        customerName: 'John Doe', // Example customer name
        measureId: 202, // Example measurement ID
        tailorId: 303, // Example tailor ID
        tailorName: 'Tailor Shop A', // Example tailor name
        shopId: 404, // Example shop ID
        shopName: 'Tailor Shop A', // Example shop name
        orderDate: new Date(), // Current date as order date
        deliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now as delivery date
        gender: this.genderForm.value.gender,
        dress: this.selectedDress,
        measurements: this.measurementForm.value,
        design: this.designForm.value,
        price: this.price
      };
    }

    // Download bill as PDF
    downloadBill(): void {
      const doc = new jsPDF();

      // Add bill details to the PDF
      doc.setFontSize(18);
      doc.text('Bill Details', 10, 10);
      doc.setFontSize(12);
      let y = 20;
      Object.keys(this.billDetails).forEach((key) => {
        if (key === 'measurements' || key === 'design') {
          doc.text(`${key}: ${JSON.stringify(this.billDetails[key])}`, 10, y);
        } else {
          doc.text(`${key}: ${this.billDetails[key]}`, 10, y);
        }
        y += 10;
      });

      // Save the PDF
      doc.save('bill.pdf');
    }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

// Method to open the shop details modal
  openShopDetailsModal(shop: any): void {
    this.selectedShopDetails = shop;
    this.isShopDetailsModalOpen = true;

    // Initialize the Leaflet map after the modal is opened
    setTimeout(() => {
      this.initMap();
    }, 0);
  }

  // Method to close the shop details modal
  closeShopDetailsModal(): void {
    this.isShopDetailsModalOpen = false;
    if (this.map) {
      this.map.remove(); // Clean up the map when the modal is closed
    }
  }

  // Method to initialize the Leaflet map
  private initMap(): void {
    // Default coordinates (you can replace these with the shop's actual coordinates)
    const defaultLat = 28.6139; // Example: New Delhi
    const defaultLng = 77.2090;

    // Initialize the map
    this.map = L.map('shop-map').setView([defaultLat, defaultLng], 13);

    // Add a tile layer (you can use any tile layer, e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add a marker for the shop's location
    L.marker([defaultLat, defaultLng])
      .addTo(this.map)
      .bindPopup('Shop Location')
      .openPopup();
  }


}
