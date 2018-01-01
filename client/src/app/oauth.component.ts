import { Component, Inject } from "@angular/core";
import { ActivatedRoute ,Router} from "@angular/router";
import { LoginPageService } from "./login-page/login-page.service";

@Component({
    selector: 'app-root',
    template:`<ng-content></ng-content> {{title}}`
})
export class OauthComponent {
    constructor(
        @Inject(ActivatedRoute) private atvRoute,
        @Inject(Router) private router,
        @Inject(LoginPageService) private loginservice){
        this.atvRoute.queryParams.subscribe(
            params  => {
                
                let user = {
                    email : params['email'],
                    img : params['img'],
                    name: params['name'],
                    point :Number.parseInt(params['point']),
                    _id : params['_id'],
                    token : params['token']
                }
                this.loginservice.onEmitSigninUser(user);
                localStorage.setItem("currentUser",JSON.stringify(user));
                router.navigate(['user']);
            }
        )
    }
}