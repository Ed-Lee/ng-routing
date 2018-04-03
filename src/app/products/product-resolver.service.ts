import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './product.service';
import 'rxjs/add/observable/of';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProductResolverService implements Resolve<IProduct>{

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct | Observable<IProduct> | Promise<IProduct> {
    let id = route.params['id'];

    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`)
      this.router.navigate(['/products']);
      return Observable.of(null);
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(product => {
          if (product)
            return product;
          console.log(`Product id was not a number: ${id}`);
          this.router.navigate(['/products'])
          return null;
        }),
        catchError(
          error => {
            console.log(`Retrieval error: ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
          }
        )
      );
  }

}
