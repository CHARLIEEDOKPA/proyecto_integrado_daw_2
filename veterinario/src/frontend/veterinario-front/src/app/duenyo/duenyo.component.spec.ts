import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenyoComponent } from './duenyo.component';

describe('DuenyoComponent', () => {
  let component: DuenyoComponent;
  let fixture: ComponentFixture<DuenyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenyoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuenyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
