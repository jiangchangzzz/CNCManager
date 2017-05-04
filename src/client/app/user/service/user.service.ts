import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../model/user';
import { SITE_HOST_URL } from '../../shared/config/env.config';
import { LocalStorageService } from '../../shared/service/index';

@Injectable()
export class UserService {
    private readonly registerUrl=`${SITE_HOST_URL}user/register`;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) { }
    
    register(user: User){

    }

    login(user: User): Observable<User>{
        let body=JSON.stringify(user);
        let headers=new Headers();
        headers.append('Content-Type','application/json');

        return this.http.get(this.registerUrl).map(
            data=>data.json() as User
        );
    }
}