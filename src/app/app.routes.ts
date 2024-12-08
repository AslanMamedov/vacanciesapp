import { questionGuard } from '#guards';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Elanlar',
        loadComponent: () =>
          import('./pages/vacancies.component').then(
            (m) => m.VacanciesComponent
          ),
      },
      {
        path: ':id',
        title: 'Sualar',
        loadComponent: () =>
          import('./pages/questions.component').then(
            (m) => m.QuestionsComponent
          ),
        canActivate: [questionGuard],
      },
      {
        path: ':id/:resultId',
        title: 'CV',
        loadComponent: () =>
          import('./pages/result.component').then((m) => m.ResultComponent),
        canActivate: [questionGuard],
      },
    ],
  },
  {
    path: '**',
    title: '404',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/notfound.component').then((m) => m.NotfoundComponent),
  },
];
