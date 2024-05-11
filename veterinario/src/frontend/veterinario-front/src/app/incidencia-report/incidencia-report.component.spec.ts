import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciaReportComponent } from './incidencia-report.component';

describe('IncidenciaReportComponent', () => {
  let component: IncidenciaReportComponent;
  let fixture: ComponentFixture<IncidenciaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciaReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidenciaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
