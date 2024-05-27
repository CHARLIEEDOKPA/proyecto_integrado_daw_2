import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCrearComponent } from './doctor-crear.component';

describe('DoctorCrearComponent', () => {
  let component: DoctorCrearComponent;
  let fixture: ComponentFixture<DoctorCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
