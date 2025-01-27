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

// Existing properties
isDressDetailsModalOpen: boolean = false; // New property for dress details modal



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
description:"A classic and timeless formal attire, perfect for business meetings, weddings, and upscale events. Available in various styles, including single-breasted and double-breasted designs. Tailor your suit to perfection with options for lapel types, sleeve lengths, and vent styles.",
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
description:"A traditional outfit combining elegance and cultural charm. Ideal for festive occasions, weddings, or celebrations. Features intricate embroidery and unique necklines, including mandarin collars and round necks.",
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
description: "Essential for every wardrobe, these trousers offer comfort and versatility. Choose from slim fit, regular fit, or relaxed fit styles to suit formal or casual occasions. Additional options include pleated, flat-front, and cuffed designs.",
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
description:"Tailored for style and sophistication, formal shirts are perfect for office wear and special events. Options include spread collars, point collars, and mandarin collars, with pocket and button-down designs available.",
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
description:"A versatile and elegant traditional outfit that combines style with comfort. Often worn during cultural events or celebrations, it features unique necklines, embroidered designs, and practical additions like front or side pockets.",
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
description: "A stylish ethnic jacket that adds sophistication to any attire. Available in silk, cotton, or linen, these jackets come with various neck designs, button styles, and embroidered options for a refined look.",
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
description:"A chic and versatile upper garment, designed to pair with sarees or lehengas. Customizable with various sleeve types, necklines, and intricate back designs like keyhole or backless styles.",
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
description: "A comfortable and stylish outfit suitable for casual or semi-formal occasions. Available in straight, flared, or asymmetrical hemlines, with diverse necklines and sleeve options to match your preference.",
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
description:"A regal and elegant outfit, known for its high, medium, or low flare designs. Perfect for weddings and festive occasions, it features luxurious fabrics, ornate patterns, and stunning necklines.",
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
description:"A vibrant and comfortable ethnic outfit comprising a kameez, salwar, and dupatta. Known for its unique salwar styles like Patiala and dhoti, it is adorned with embroidered or printed designs, complemented by elegant dupattas.",
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
description:"A classic traditional outfit, perfect for formal events or celebrations. Features a snug-fitting churidar paired with a well-tailored kameez. Customizable with stylish necklines, sleeve designs, and churidar fits.",
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
description: "A grand and luxurious ethnic attire for weddings and festive events. Features flared, mermaid, or straight-cut lehengas, paired with exquisitely designed blouses. Dupattas with intricate embroidery add a touch of elegance.",
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
    this.designForm = this.fb.group({
               willProvideCloth: [true], // Default to "Yes"
                     clothType: [''], // Will only be used if "No" is selected
                     clothColor: [''],
             });
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

  logout() {
  localStorage.removeItem('authToken'); // Clear the token
  this.router.navigate(['/']); // Redirect to the login page
}

  updateDressCategories(gender: string): void {
    this.dressCategories = gender === 'male' ? this.maleDresses : this.femaleDresses;
    this.selectedDress = null; // Reset selected dress when gender changes
    this.selectedShop = null; // Reset selected shop when gender changes
  }

// Method to open the dress details modal
  openDressDetailsModal(dress: any): void {
    this.selectedDress = dress;
    this.isDressDetailsModalOpen = true;
  }

  // Method to close the dress details modal
  closeDressDetailsModal(): void {
    this.isDressDetailsModalOpen = false;
    //this.selectedDress = null; // Reset selected dress
  }



  selectDress(dress: any): void {

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
      this.closeDressDetailsModal();

  }

   onDressSelect(dress: any): void {
      this.openDressDetailsModal(dress);
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

  // Handle cloth material change
    onClothMaterialChange(value: boolean) {
      if (value) {
        this.designForm.patchValue({ clothType: '', clothColor: '' }); // Clear inputs
      }
    }

   saveDesignOptions() {
      if (this.designForm.invalid) {
        alert('Please fill all required fields.');
        return;
      }

      const designData = this.designForm.value;
      console.log('Design Data:', designData);

      // Call the backend API to save the design options
      // You can use a service to send the data to the backend
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
