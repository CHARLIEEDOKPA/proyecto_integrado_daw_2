import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenyoCrearComponent } from './duenyo-crear.component';

describe('DuenyoCrearComponent', () => {
  let component: DuenyoCrearComponent;
  let fixture: ComponentFixture<DuenyoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenyoCrearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuenyoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
