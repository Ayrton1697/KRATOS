import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesAllComponent } from './machines-all.component';

describe('MachinesAllComponent', () => {
  let component: MachinesAllComponent;
  let fixture: ComponentFixture<MachinesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinesAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
