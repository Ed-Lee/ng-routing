import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {IProduct} from './product';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable()
export class ProductService {
    private baseUrl = 'api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.baseUrl)
          .pipe(
            tap(data => console.log('getProducts: ' + JSON.stringify(data))),
            catchError(this.handleError('getProducts', []))
          )
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return Observable.of(this.initializeProduct());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<IProduct>(url)
          .pipe(
            tap(data => console.log('getProduct: ' + JSON.stringify(data))),
            catchError(this.handleError<IProduct>(`getProduct id=${id}`))
          );
    }

    deleteProduct(id: number): Observable<IProduct> {
        const url = `${this.baseUrl}/${id}`;
      return this.http.delete<IProduct>(url, httpOptions)
        .pipe(
          tap(data => console.log('deleteProduct: ' + JSON.stringify(data))),
          catchError(this.handleError<IProduct>(`deleteProduct id:${id}`))
        );

    }

    saveProduct(product: IProduct): Observable<IProduct> {
        if (product.id === 0) {
            return this.createProduct(product, httpOptions);
        }
        return this.updateProduct(product, httpOptions);
    }

    private createProduct(product: IProduct, options: {}): Observable<IProduct> {
        product.id = undefined;
      return this.http.post<IProduct>(this.baseUrl, product, options)
        .pipe(
          tap(data => console.log('createProduct: ' + JSON.stringify(data))),
          catchError(this.handleError<IProduct>('createProduct'))
        );
    }

    private updateProduct(product: IProduct, options: {}): Observable<IProduct> {
        const url = `${this.baseUrl}/${product.id}`;
        return this.http.put<IProduct>(url, product, options)
          .pipe(
            tap(data => console.log('updateProduct: ' + JSON.stringify(data))),
            catchError(this.handleError<IProduct>('updateProduct'))
          );
    }

    // private extractData(response: Response) {
    //     let body = response.json();
    //     return body.data || {};
    // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

    // private handleError(error: Response): Observable<any> {
    //     // in a real world app, we may send the server to some remote logging infrastructure
    //     // instead of just logging it to the console
    //     console.error(error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }

    initializeProduct(): IProduct {
        // Return an initialized object
        return {
            id: 0,
            productName: null,
            productCode: null,
            category: null,
            tags: [],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }
}
