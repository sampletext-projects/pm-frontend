import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatExpansionModule} from "@angular/material/expansion";
import {RequestsInterceptor} from "./interceptors/requests.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};
const DEFAULT_PERFECT_SCROLLBAR_PROVIDER: Provider = {
  provide: PERFECT_SCROLLBAR_CONFIG,
  useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
}

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: RequestsInterceptor
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  providers: [INTERCEPTOR_PROVIDER, DEFAULT_PERFECT_SCROLLBAR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
