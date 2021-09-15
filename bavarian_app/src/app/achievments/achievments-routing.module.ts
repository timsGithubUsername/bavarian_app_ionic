import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchievmentsPage } from './achievments.page';

const routes: Routes = [
  {
    path: '',
    component: AchievmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievmentsPageRoutingModule {}
