import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenyoDetalleComponent } from './duenyo-detalle.component';

describe('DuenyoDetalleComponent', () => {
  let component: DuenyoDetalleComponent;
  let fixture: ComponentFixture<DuenyoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenyoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuenyoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
