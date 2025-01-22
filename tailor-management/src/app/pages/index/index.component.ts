import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent {
isLoginPopupOpen = false;
isRoleSelectionPopupOpen = false;
isCustomerRegistrationPopupOpen = false;
isTailorRegistrationPopupOpen = false;

// For dynamic price inputs
showShirtsPrice = false;
showPantsPrice = false;
showKurtaPrice = false;
showPalazzaPantsPrice = false;
showSherwaniPrice = false;
showSuitsPrice = false;
showBlazersPrice = false;
showSalwaarKameezPrice = false;

openLoginPopup() {
    this.isLoginPopupOpen = true;
  }

  closeLoginPopup() {
    this.isLoginPopupOpen = false;
  }

  openRoleSelectionPopup() {
    this.isRoleSelectionPopupOpen = true;
  }

  closeRoleSelectionPopup() {
    this.isRoleSelectionPopupOpen = false;
  }

  openCustomerRegistrationPopup() {
    this.isCustomerRegistrationPopupOpen = true;
    this.isRoleSelectionPopupOpen = false;
  }

  closeCustomerRegistrationPopup() {
    this.isCustomerRegistrationPopupOpen = false;
  }

  openTailorRegistrationPopup() {
    this.isTailorRegistrationPopupOpen = true;
    this.isRoleSelectionPopupOpen = false;
  }

  closeTailorRegistrationPopup() {
    this.isTailorRegistrationPopupOpen = false;
  }

  togglePriceInput(dressType: string) {
    switch (dressType) {
      case 'shirts':
        this.showShirtsPrice = !this.showShirtsPrice;
        break;
      case 'pants':
        this.showPantsPrice = !this.showPantsPrice;
        break;
      case 'kurta':
        this.showKurtaPrice = !this.showKurtaPrice;
        break;
      case 'palazzaPants':
        this.showPalazzaPantsPrice = !this.showPalazzaPantsPrice;
        break;
      case 'sherwani':
        this.showSherwaniPrice = !this.showSherwaniPrice;
        break;
      case 'suits':
        this.showSuitsPrice = !this.showSuitsPrice;
        break;
      case 'blazers':
        this.showBlazersPrice = !this.showBlazersPrice;
        break;
      case 'salwaarKameez':
        this.showSalwaarKameezPrice = !this.showSalwaarKameezPrice;
        break;
    }
  }
}



