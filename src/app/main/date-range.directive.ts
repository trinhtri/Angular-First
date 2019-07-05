import { Directive, Output, EventEmitter, Input, Injector, ElementRef } from '@angular/core';
import { TimingServiceProxy, NameValueDto, DefaultTimezoneScope } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { AppComponentBase } from '@shared/common/app-component-base';
@Directive({
  selector: '[appDateRange]'
})
export class DateRangeDirective extends AppComponentBase {

  constructor(
    injector: Injector,
    private _element: ElementRef
  ) {
    super(injector);
  }

  //take date index
  _startDate: moment.Moment = moment().startOf('day');
  _endDate: moment.Moment = moment().startOf('day');


  @Output() startDateChange = new EventEmitter();
  @Output() endDateChange = new EventEmitter();

  @Input()
  get startDate() {
    return this._startDate;
  }

  set startDate(val) {
    this._startDate = val;
    this.startDateChange.emit(this._startDate);
  }

  @Input()
  get endDate() {
    return this._endDate;
  }

  set endDate(val) {
    this._endDate = val;
    this.endDateChange.emit(this._endDate);
  }

  ngAfterViewInit(): void {
    const $element = $(this._element.nativeElement);

    const _selectedDateRange = {
      startDate: this._startDate,
      endDate: this._endDate
    };

    $element.daterangepicker(
      $.extend(true, this.createDateRangePickerOptions(), _selectedDateRange), (start, end) => {
        this.startDate = start;
        this.endDate = end;
      });
  }


  createDateRangePickerOptions(): any {
    const self = this;
    const options: any = {
      locale: {
        format: 'L',
        applyLabel: self.l('Apply'),
        cancelLabel: self.l('Cancel'),
        customRangeLabel: self.l('CustomRange')
      },
      ranges: {}
    };
  }


}


