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
          <span>
            <a [routerLink]=" ['./home'] ">
              Home
            </a>
          </span>
          |
          <span>
            <a [routerLink]=" ['./about'] ">
              About
            </a>
          </span>
        </nav>

        <main>
          <router-outlet></router-outlet>
        </main>
    </div>
  `
})
export class AppComponent {
}
