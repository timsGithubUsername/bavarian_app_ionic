import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialect',
  templateUrl: './dialect.page.html',
  styleUrls: ['./dialect.page.scss'],
})
export class DialectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  setDialect(id:number):void{
    switch (id){
      case 0:
        //
    }
  }
}
