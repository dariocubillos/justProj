import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPanelUserComponent } from './main-panel-user.component';

describe('MainPanelUserComponent', () => {
  let component: MainPanelUserComponent;
  let fixture: ComponentFixture<MainPanelUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPanelUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPanelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
