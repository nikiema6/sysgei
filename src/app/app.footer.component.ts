import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html'
})
export class AppFooterComponent implements OnInit {
    annee: any;
    constructor() {
        this.annee = (new Date()).getFullYear();
    }

    ngOnInit(): void {}
}
