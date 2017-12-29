import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {  } from '@angular/router/src/router_state';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(@Inject(Router) private router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
        if(JSON.parse(localStorage.getItem('currentUser')) === null){
            this.router.navigate(['/login']);
            return false
        }
        else return true;
    }
}