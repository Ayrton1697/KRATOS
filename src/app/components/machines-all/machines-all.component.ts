import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machines-all',
  templateUrl: './machines-all.component.html',
  styleUrls: ['./machines-all.component.css']
})
export class MachinesAllComponent implements OnInit {

  public sales:any;

  constructor() {
      this.sales = true;
   }

  ngOnInit(): void {

    let identity = localStorage.getItem('identity')
    let identityJSON = JSON.parse(identity || '{}')
    if(identityJSON['role'] == 'ventas'){
      this.sales = true;
    }else{
      this.sales = true;
    }
  
  }

}
