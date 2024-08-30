import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedInterceptorService {
  httpRequestCount = 0;

  public incrementCount(): number {
    this.httpRequestCount++;
    return this.httpRequestCount;
  }

  public decrementCount(): number {
    this.httpRequestCount--;
    return this.httpRequestCount;
  }
}
