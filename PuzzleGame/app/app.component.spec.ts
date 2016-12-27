import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ AppComponent ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => expect(component).toBeDefined() );

});
