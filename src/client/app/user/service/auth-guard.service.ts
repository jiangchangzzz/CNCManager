import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';

import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.userService.isLogin){
            return true;
        }

        this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
        return false;
    }
}