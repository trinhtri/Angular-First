import { Directive, ElementRef, Input, OnInit, OnChanges, Output, EventEmitter, HostListener, AfterViewInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appDateTimeInput]',
})
export class DateTimeInputDirective implements OnChanges, AfterViewInit {

  @Input() date;
  @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();

  //format date
  constructor(private el: ElementRef) {
    $(el.nativeElement).datetimepicker({
      locale: abp.localization.currentLanguage.name,
      format: 'L',
    });
  }

  //lấy date về
  ngOnChanges(): void {
    if (this.date) {
      console.log("this.date", this.date)
      $(this.el.nativeElement).data("DateTimePicker").date(this.date);
    }
  }

  ngOnInit(): void {
    console.log('DATE', this.date);
  }
  //sử lý sự kiện khi date thay đổi và emit nó lên
  ngAfterViewInit(): void {
    $(this.el.nativeElement).on('dp.change', () => {
      let dateInput = moment($(this.el.nativeElement).data('DateTimePicker').date().format('YYYY-MM-DDTHH:mm:ssZ'));
      console.log('moment', dateInput);
      this.dateChange.emit(dateInput); 
    })
  }
}
