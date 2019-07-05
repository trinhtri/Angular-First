import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';
import { EmployeeDto, EmployeeServiceProxy, CheckEmployee } from '@shared/service-proxies/service-proxies';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
@Component({
  selector: 'addOrEditEmployeeModal',
  templateUrl: './add-or-edit-employyee-modal.component.html',
  styleUrls: ['./add-or-edit-employyee-modal.component.css'],
  providers: [EmployeeServiceProxy]
})
export class AddOrEditEmployyeeModalComponent extends AppComponentBase implements OnInit {

  rfContact: FormGroup;
  submitted = false;
  @ViewChild('createOrEditModal') modal: ModalDirective;
  @ViewChild('birthdayUtc') birtDUtc: ElementRef;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  emp: EmployeeDto = new EmployeeDto();
  check:CheckEmployee =new CheckEmployee();

  constructor(injector: Injector, private employeeService: EmployeeServiceProxy, private fb: FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.rfContact = this.fb.group({
      name: ['',
        [Validators.required, Validators.minLength(3)],
        this.validateNameNotTaken.bind(this)
      ],
      birthDay: new FormControl(new Date()),
      email: ['', [Validators.required,Validators.email]]
    });
  }

  validateNameNotTaken(control: AbstractControl) {
    this.check.name1=control.value;
    this.check.name2=this.emp.name;
    if(this.emp.id){
      return this.employeeService.check(this.check,true).map(res=>{return res ? null :{namTaken:true}});
    }
    else{
      return this.employeeService.check(this.check,false).map(res=>{
        return res? null :{nameTaken:true};
      })
    }
    //trong trường hợp edit
    // if (this.emp.id) {

    //   return this.employeeService.checkIgnoreName(this.emp.name, control.value).map(res => {
    //     return res ? null : { nameTaken: true };
    //   })
    // }
    // //trong trường hợp create
    // return this.employeeService.checkName(control.value).map(res => {
    //   return res ? null : { nameTaken: true };
    // })
  }

  get name() {
    return this.rfContact.get('name');
  }

  show(id): void {
    if (id) {
      this.employeeService.get(id).subscribe(result => {
        this.emp = result,
          console.log('hi', this.formatSubscriptionEndDate(this.emp.birthDay))
        this.rfContact.patchValue({
          name: result.name,
          // birthDay:result.birthDay,
          birthDay: this.formatSubscriptionEndDate(result.birthDay),
          email: result.email,
        });
      });
    }
    this.active = true;
    this.modal.show();
  }

  save(): void {
    this.submitted = true;
    if (this.rfContact.valid) {
      console.log('id', this.emp.id);
      if (this.emp.id != null) {
        this.emp.name = this.rfContact.get('name').value;
        this.emp.birthDay = moment($(this.birtDUtc.nativeElement).data('DateTimePicker').date().format('YYYY-MM-DDTHH:mm:ssZ'));
        this.emp.email = this.rfContact.get('email').value;
        this.employeeService.edit(this.emp).finally(() => { this.saving = false; })
          .subscribe(result => {
            this.modalSave.emit();
          });
        this.close();
      }
      else {
        this.emp.name = this.rfContact.get('name').value;
        this.emp.birthDay = moment($(this.birtDUtc.nativeElement).data('DateTimePicker').date().format('YYYY-MM-DDTHH:mm:ssZ'));
        this.emp.email = this.rfContact.get('email').value;
        this.employeeService.create(this.emp).finally(() => { this.saving == false; })
          .subscribe(result => {
            this.modalSave.emit(result);
          });
        this.close();
      }
    }
    console.log(this.rfContact);
  }


  isFieldValid(field: string) {
    return !this.rfContact.get(field).valid && this.rfContact.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  close(): void {
    this.submitted = false;
    this.emp = new EmployeeDto();
    this.rfContact.reset();
    this.active = false;
    this.modal.hide();
  }

  formatSubscriptionEndDate(date: any): string {
    if (!this.rfContact.get('birthDay')) {
      return '';
    }

    if (!date) {
      return '';
    }
    return moment(date).format('L');
  }
  // ngAfterViewInit(): void {
  //   $(this.birtDUtc.nativeElement).on('dp.change', () => {
  //     let dateInput = moment($(this.birtDUtc.nativeElement).data('DateTimePicker').date().format('YYYY-MM-DDTHH:mm:ssZ'));
  //     console.log('momenttri', this.emp.birthDay);
  //     this.emp.birthDay = dateInput;
  //   })
  // }

  onShown(): void {
    $(this.birtDUtc.nativeElement).datetimepicker({
      locale: abp.localization.currentLanguage.name,
      format: 'L'
    });
  }
  ngOnChanges(): void {
    if (this.emp.birthDay) {
      console.log("this.date", this.emp.birthDay)
      $(this.birtDUtc.nativeElement).data("DateTimePicker").date(this.emp.birthDay);
    }
  }
}

