/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <div id="main-container">
        <nav>
            <a md-raised-button [routerLink]=" ['./home'] ">
              Home
            </a>
            <a md-raised-button [routerLink]=" ['./about'] ">
              About
            </a>
        </nav>
        <main>
          <router-outlet></router-outlet>
        </main>
    </div>
  `
})
export class AppComponent {
}
