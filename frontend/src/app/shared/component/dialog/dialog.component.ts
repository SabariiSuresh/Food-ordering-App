import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  address = '';
  error = '';

  constructor( public dialoRef : MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public data : any ){}

  getLocation(){

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const log = position.coords.longitude;
          this.address = `Latitude : ${lat} , Longitude : ${log}`;
        } ,
        error => {
          this.error = 'Unable to fetch location';
        }
      );
    } else {
      this.error = 'Location is not supported';
    }

  }

  confirm(){

    if(this.address.trim()){
      this.dialoRef.close(this.address)
    } else {
      this.error = 'Pleace provide your location';
    }

  }

  cancel(){

    this.dialoRef.close(null)

  }
  

}
