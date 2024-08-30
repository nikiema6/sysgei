import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exercice, TableColumn, ValeurPevision} from '../../app.models';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-prevision-val-table',
  templateUrl: './prevision-val-table.component.html',
  styleUrls: ['./prevision-val-table.component.scss']
})
export class PrevisionValTableComponent implements OnInit {
    @Input() listValeurPrevision: Array<ValeurPevision>;
    @Input() consultation: boolean;
    @Input() exercice: Exercice;
    @Output() deleteRow = new EventEmitter<ValeurPevision>();
    position: 'top';
    cols: any;

    constructor(private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.buildCols(this.exercice.annee);
    }


    buildCols(anne) {
        this.cols = [{field: 'libelleSousFamille', header: 'Sous Famille', type: 'string', filter: true},];
        for (let a = 0; a <= 2; a++ ) {
            const col: TableColumn = {
                field: 'valAnne' + a, header: '' + (anne + a),
                type: 'input', filter: false, width: '15%',
                input: true
            };
            this.cols.push(col);
        }
    }

    delete(rowData: ValeurPevision) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de retirer la ligne ?',
            header: 'CONFIRMATION',
            accept: () => {
                this.deleteRow.emit(rowData);
            }
        });
    }
}
