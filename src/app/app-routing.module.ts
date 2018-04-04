import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./home/welcome.component";
import {LoginComponent} from "./user/login.component";
import {ProductListComponent} from "./products/product-list.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import { AuthGuardService } from './user/auth-guard.service';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'products',
    canLoad: [AuthGuardService],
    loadChildren: 'app/products/product.module#ProductModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
