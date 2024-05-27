import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicacionComponent } from './add-publicacion.component';

describe('AddPublicacionComponent', () => {
  let component: AddPublicacionComponent;
  let fixture: ComponentFixture<AddPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPublicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
