import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  image: string = 'https://www.ntb.de/wp-content/uploads/2019/11/placeholder-image-icon-21.jpg'; //todo mock
  constructor() {
  }

}
