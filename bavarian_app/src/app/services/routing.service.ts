import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private router:Router;

  constructor() { }

  public setRouter(router:Router):void{
    this.router = router;
  }

  public getRouter():Router {
    return this.router;
  }
}
