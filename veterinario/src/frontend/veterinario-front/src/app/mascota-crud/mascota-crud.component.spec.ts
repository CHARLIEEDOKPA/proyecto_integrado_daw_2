import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaCrudComponent } from './mascota-crud.component';

describe('MascotaCrudComponent', () => {
  let component: MascotaCrudComponent;
  let fixture: ComponentFixture<MascotaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MascotaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
