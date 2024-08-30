import { Component } from '@angular/core';
import {EtapeWorkflow, ProcessPrevision} from '../../../../config/app.models';

@Component({
  selector: 'app-prevision-validation',
  templateUrl: './prevision-validation.component.html',
  styleUrls: ['./prevision-validation.component.scss']
})
export class PrevisionValidationComponent {
        etapeWorkFlow= EtapeWorkflow;
        process: ProcessPrevision;

        getCurrentProcess(event) {
            this.process = event;
        }
}
