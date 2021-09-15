import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'learning',
    loadChildren: () => import('./learning/learning.module').then( m => m.LearningPageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'translation',
    loadChildren: () => import('./translation/translation.module').then( m => m.TranslationPageModule)
  },
  {
    path: 'dialect',
    loadChildren: () => import('./dialect/dialect.module').then( m => m.DialectPageModule)
  },
  {
    path: 'achievments',
    loadChildren: () => import('./achievments/achievments.module').then( m => m.AchievmentsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'references',
    loadChildren: () => import('./references/references.module').then( m => m.ReferencesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
