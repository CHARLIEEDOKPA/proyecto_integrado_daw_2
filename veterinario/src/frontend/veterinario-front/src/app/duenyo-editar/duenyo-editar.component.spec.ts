import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenyoEditarComponent } from './duenyo-editar.component';

describe('DuenyoEditarComponent', () => {
  let component: DuenyoEditarComponent;
  let fixture: ComponentFixture<DuenyoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenyoEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuenyoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
