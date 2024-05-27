import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCrudComponent } from './doctor-crud.component';

describe('DoctorCrudComponent', () => {
  let component: DoctorCrudComponent;
  let fixture: ComponentFixture<DoctorCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
