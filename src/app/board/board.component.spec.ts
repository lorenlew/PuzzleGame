import { async, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('AppComponent', () => {
  let component: BoardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent ]
      })
      .compileComponents();
  }));

  it('should create component', () => expect(component).toBeDefined() );

});
