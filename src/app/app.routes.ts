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
        path: 'company',
        pathMatch: 'full',
        title: 'Şirkətlər',
        loadComponent: () =>
          import('./pages/company.component').then((m) => m.CompanyComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/questions.component').then(
            (m) => m.QuestionsComponent
          ),
      },
      {
        path: ':id/result',
        pathMatch: 'full',
        title: 'Nəticə',
        loadComponent: () =>
          import('./pages/result.component').then((m) => m.ResultComponent),
      },
    ],
  },
];
