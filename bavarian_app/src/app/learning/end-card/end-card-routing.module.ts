import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndCardPage } from './end-card.page';

const routes: Routes = [
  {
    path: '',
    component: EndCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndCardPageRoutingModule {}
