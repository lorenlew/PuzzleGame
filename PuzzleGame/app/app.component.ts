import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <h2>{{name}}</h2>
  <board></board>`
})
export class AppComponent {
  name = 'Puzzle Game';
}
