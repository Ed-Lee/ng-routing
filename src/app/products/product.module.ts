import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import {RouterModule} from "@angular/router";
import { ProductResolverService } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id', component: ProductDetailComponent,
        resolve: {product: ProductResolverService}},
      {path: 'products/:id/edit', component: ProductEditComponent,
        resolve: {product: ProductResolverService},
        children: [
          {path: '', redirectTo: 'info', pathMatch: 'full'},
          {path: 'info', component: ProductEditInfoComponent},
          {path: 'tags', component: ProductEditTagsComponent},
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [
    ProductService,
    ProductResolverService
  ]
})
export class ProductModule {}
