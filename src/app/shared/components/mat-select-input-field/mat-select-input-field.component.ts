import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';

/** interfas que representa los valores que tendrá el campo */
export interface FormFieldValue {
  selectValue: string;
  inputValue: string;
}

@Component({
  selector: 'app-mat-select-input-field',
  templateUrl: './mat-select-input-field.component.html',
  styleUrls: ['./mat-select-input-field.component.css'],
  /** se usa para configurar el componente con material */
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: MatSelectInputFieldComponent,
    },
  ]
})

export class MatSelectInputFieldComponent 
  /** se implementa la interfaz MatFormFieldControl y se le pasa la interfas de valeres del componente */
  implements OnInit, OnDestroy, MatFormFieldControl<FormFieldValue> {

  static nextId: number = 0;

  @ViewChild(MatInput, { read: ElementRef, static: true}) 
  input: ElementRef;
  @ViewChild(MatSelect, { read: ElementRef, static: true}) 
  select: ElementRef;

  @Input() selectList: string[] = [];

  @Input()
  set value(value: FormFieldValue){
    this._value = value;
    this.stateChanges.next();
  }
  get value(){
    return this._value;
  }
  private _value: FormFieldValue;

  stateChanges = new Subject<void>();

  @HostBinding()
  id: string = `select-input-field-id-${MatSelectInputFieldComponent.nextId++}`;

  @Input()
  set placeholder(value: string){
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder(){
    return this._placeholder;
  } 
  private _placeholder: string;

  ngControl: NgControl = null;


  focused: boolean;

  get empty(): boolean{
    return !this.value.selectValue && !this.value.inputValue;
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean{
    return this.focused || !this.empty;
  }

  @Input()
  required: boolean;

  @Input()
  disabled: boolean;


  errorState: boolean;


  controlType: string = 'custom-form-field';

  autofilled?: boolean;

  @HostBinding()
  userAriaDescribedBy?: string = '';

  constructor(private focusMonitor: FocusMonitor) {
    
  }

  setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
      this.focusMonitor.focusVia(this.input, 'program');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.input).subscribe((focused) =>{
      this.focused = !!focused;
      this.stateChanges.next();
    })
    this.focusMonitor.monitor(this.select).subscribe((focused) =>{
      this.focused = !!focused;
      this.stateChanges.next();
    })
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.input);
    this.focusMonitor.stopMonitoring(this.select);
    this.stateChanges.complete();
  }

}
