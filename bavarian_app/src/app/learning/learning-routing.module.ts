import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LearningPage } from './learning.page';

const routes: Routes = [
  {
    path: '',
    component: LearningPage
  },  {
    path: 'end-card',
    loadChildren: () => import('./end-card/end-card.module').then( m => m.EndCardPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningPageRoutingModule {}
