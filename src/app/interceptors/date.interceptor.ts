import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import {Observable, tap} from 'rxjs';


/*
* Does conversion to the Date object because typescript cannot parse string implicitly to the Date.
*
* **Why Date is still a string?**
*
* The root cause of the issue is the interface in typescript is just for the compiler,
* it is not in the generated javascript, so this interface “cast” method is actually a type checking, or type assertion.
* Type assertion allows you to set the type of value and tell the compiler not to infer it.
* This is when you, as a programmer, might have a better understanding
* of the type of variable than what TypeScript can infer on its own.
*
*
* https://stackoverflow.com/questions/46559268/parse-date-with-angular-4-3-httpclient
* */
@Injectable()
export class DateInterceptor implements HttpInterceptor {
  private readonly dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)$/;

  private readonly utcDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.convertDates(event.body);
        }
      }));
  }

  private convertDates(object: Object) {
    // noinspection SuspiciousTypeOfGuard
    if (!object || !(object instanceof Object)) {
      return;
    }

    if (object instanceof Array) {
      for (const item of object) {
        this.convertDates(item);
      }
    }

    for (const key of Object.keys(object)) {
      // @ts-ignore
      const value = object[key];

      if (value instanceof Array) {
        for (const item of value) {
          this.convertDates(item);
        }
      }

      if (value instanceof Object) {
        this.convertDates(value);
      }

      if (typeof value === 'string' && (this.utcDateRegex.test(value) || this.dateRegex.test(value))) {
        // @ts-ignore
        object[key] = new Date(value);
      }
    }
  }
}
