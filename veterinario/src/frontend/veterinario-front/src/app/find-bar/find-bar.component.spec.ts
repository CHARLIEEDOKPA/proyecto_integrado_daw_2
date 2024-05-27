import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBarComponent } from './find-bar.component';

describe('FindBarComponent', () => {
  let component: FindBarComponent;
  let fixture: ComponentFixture<FindBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
