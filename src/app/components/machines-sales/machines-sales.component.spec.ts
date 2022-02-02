import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesSalesComponent } from './machines-sales.component';

describe('MachinesSalesComponent', () => {
  let component: MachinesSalesComponent;
  let fixture: ComponentFixture<MachinesSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachinesSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
