import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {WelcomeComponent} from "./home/welcome.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {HttpModule} from "@angular/http";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {ProductData} from "./products/product-data";
import {ProductModule} from "./products/product.module";
import {UserModule} from "./user/user.module";
import {MessageModule} from "./messages/message.module";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    environment.production ?
      InMemoryWebApiModule.forRoot(ProductData, {delay: 1000}) : [],
    ProductModule,
    UserModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
