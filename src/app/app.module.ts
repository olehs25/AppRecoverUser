import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {LabelModule} from "@progress/kendo-angular-label";
import {FormFieldModule} from "@progress/kendo-angular-inputs";
import {DatePickerModule} from "@progress/kendo-angular-dateinputs";
import {HttpClient} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeEs from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {RecoverUserService} from "./recover-user.service";


registerLocaleData(localeEs, 'es');export function createTranslateLoader(http: HttpClient)
{  return new TranslateHttpLoader(http, './assets/i18n/', '.json');}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, LabelModule, FormFieldModule, DatePickerModule,  BrowserAnimationsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, RecoverUserService],
  bootstrap: [AppComponent],
})
export class AppModule {}

