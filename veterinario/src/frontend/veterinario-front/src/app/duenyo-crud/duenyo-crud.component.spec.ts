import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenyoCrudComponent } from './duenyo-crud.component';

describe('DuenyoCrudComponent', () => {
  let component: DuenyoCrudComponent;
  let fixture: ComponentFixture<DuenyoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenyoCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuenyoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
