import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {initLocalDate} from '../../utils';

@Component({
  selector: 'app-form-input-template',
  templateUrl: './form-input-template.component.html',
  styleUrls: ['./form-input-template.component.scss']
})
export class FormInputTemplateComponent implements OnInit {
  @Input() col: any;
  @Input() dropDownObject: any;
  @Input() multiSelectObject: any;
  @Input() form: UntypedFormGroup;
  bf: any;
  constructor() {
  }

  ngOnInit(): void {
    this.bf = initLocalDate();
  }

}
