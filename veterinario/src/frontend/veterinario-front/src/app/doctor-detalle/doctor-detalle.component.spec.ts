import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetalleComponent } from './doctor-detalle.component';

describe('DoctorDetalleComponent', () => {
  let component: DoctorDetalleComponent;
  let fixture: ComponentFixture<DoctorDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
