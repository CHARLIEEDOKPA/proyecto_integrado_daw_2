import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaCrearComponent } from './mascota-crear.component';

describe('MascotaCrearComponent', () => {
  let component: MascotaCrearComponent;
  let fixture: ComponentFixture<MascotaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MascotaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
