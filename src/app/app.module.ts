import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {WelcomeComponent} from "./home/welcome.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {ProductData} from "./products/product-data";
import {ProductModule} from "./products/product.module";
import {UserModule} from "./user/user.module";
import {MessageModule} from "./messages/message.module";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    environment.production ? [] :
    HttpClientInMemoryWebApiModule.forRoot(ProductData, {delay: 2000}),
    ProductModule,
    UserModule,
    MessageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
