import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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
