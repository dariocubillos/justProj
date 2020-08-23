import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPanelAdminComponent } from './main-panel-admin.component';

describe('MainPanelAdminComponent', () => {
  let component: MainPanelAdminComponent;
  let fixture: ComponentFixture<MainPanelAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPanelAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPanelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
