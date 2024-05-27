import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuenyosBrowserComponent } from './duenyos-browser.component';

describe('DuenyosBrowserComponent', () => {
  let component: DuenyosBrowserComponent;
  let fixture: ComponentFixture<DuenyosBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuenyosBrowserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuenyosBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
