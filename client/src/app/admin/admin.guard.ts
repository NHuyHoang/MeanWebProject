import { Injectable,Inject } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Http, Response } from '@angular/http'

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(@Inject(Router) private router,@Inject(Http)private http){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{

      return this.http.get('user/verify').map((res:Response) => {
          
          let result = res.json().admin;
          if(!result)
            this.router.navigate(['login'])
          return result;
      })
    }
}