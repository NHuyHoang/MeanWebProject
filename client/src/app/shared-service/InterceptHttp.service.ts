import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { GLOBAL_VAR } from './shared-service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class InterceptedHttp extends Http{
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }
 
    /* get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(GLOBAL_VAR.APP_URL_PREFIX + url, this.addJwt(options)).catch(this.handleError);
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(GLOBAL_VAR.APP_URL_PREFIX + url, body, this.addJwt(options)).catch(this.handleError);
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(GLOBAL_VAR.APP_URL_PREFIX + url, body, this.addJwt(options)).catch(this.handleError);
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(GLOBAL_VAR.APP_URL_PREFIX + url, this.addJwt(options)).catch(this.handleError);
    } */
 
    // private helper methods
 
    /* private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        // ensure request options and headers are not null
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();
 
        // add authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            options.headers.append('Authorization', 'Bearer ' + currentUser.token);
        }
 
        return options;
    } */

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(GLOBAL_VAR.APP_URL_PREFIX + url);
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(GLOBAL_VAR.APP_URL_PREFIX + url, body);
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(GLOBAL_VAR.APP_URL_PREFIX + url, body);
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(GLOBAL_VAR.APP_URL_PREFIX + url);
    }
 
    private handleError(error: any) {
        if (error.status === 401) {
            // 401 unauthorized response so log user out of client
            window.location.href = '/login';
        }
 
        return Observable.throw(error._body);
    }
}
 
export function InterceptedHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}
 
export let customHttpProvider = {
    provide: Http,
    useFactory: InterceptedHttpFactory,
    deps: [XHRBackend, RequestOptions]
};