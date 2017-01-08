import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { BoardComponent } from './board/board.component';
import { NoContentComponent } from './no-content';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: BoardComponent },
  { path: 'about', component: AboutComponent },
  { path: '**',    component: NoContentComponent }
];
