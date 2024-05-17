import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionViewComponent } from './recomendacion-view.component';

describe('RecomendacionViewComponent', () => {
  let component: RecomendacionViewComponent;
  let fixture: ComponentFixture<RecomendacionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendacionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomendacionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
