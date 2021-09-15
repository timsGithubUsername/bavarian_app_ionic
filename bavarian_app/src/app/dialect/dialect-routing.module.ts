import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DialectPage } from './dialect.page';

const routes: Routes = [
  {
    path: '',
    component: DialectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialectPageRoutingModule {}
