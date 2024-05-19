import { CommonModule } from '@angular/common';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsTimepickerViewComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-timepicker-view.component';
import { TimepickerComponent, TimepickerConfig, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-cita',
  standalone: true,
  imports: [CommonModule,BsDatepickerModule, TimepickerModule,FormsModule],
  templateUrl: './add-cita.component.html',
  styleUrl: './add-cita.component.css'
})
export class AddCitaComponent implements OnInit{

  datePickerConfig: Partial<BsDatepickerConfig>|undefined;
  timePickerConfig: Partial<TimepickerConfig> | undefined;
  @ViewChild(TimepickerComponent) timepicker!:TimepickerComponent
  time!: Date
  date!: string

  onTimeChange(newTime: Date): void {
    this.time = newTime
    this.getDate()
  }

  getDate() {
    this.date = (<HTMLInputElement>document.getElementById("fecha")).value
  }

  ngOnInit(): void {
    this.datePickerConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY'
    };

    let date = new Date(0,0,0,1,1,1,1)
    date.setHours(17)

    this.timePickerConfig = {
      max: date
    }

    // this.timepicker.hour
  }

  

  
prueba = 1


}
