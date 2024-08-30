import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, finalize} from 'rxjs/operators';
import {SharedInterceptorService} from './shared-interceptor.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private sharedInterceptorService: SharedInterceptorService,
                private spinner: NgxSpinnerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        this.sharedInterceptorService.incrementCount();
        if (!req || !req.url || (/^http/.test(req.url) && !req.url.startsWith('/api'))) {
            return this.getObservable(next, req);
        }
        return this.getObservable(next, req);
    }

    private getObservable(next: HttpHandler, req: HttpRequest<any>) {
        return next.handle(req).pipe(
            delay(100),
            finalize(() => {
                this.sharedInterceptorService.decrementCount();
                if (this.sharedInterceptorService.httpRequestCount === 0) {
                    this.spinner.hide();
                }
            }));
    }
}
