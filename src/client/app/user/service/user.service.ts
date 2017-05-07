import { Injectable } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../model/user';
import { SITE_HOST_URL } from '../../shared/config/env.config';
import { LocalStorageService } from '../../shared/service/index';

@Injectable()
export class UserService {
    private readonly registerUrl=`${SITE_HOST_URL}user-register-mock.json`;
    private readonly loginUrl=`${SITE_HOST_URL}user-login-mock.json`;
    private readonly validateEmailUrl=`${SITE_HOST_URL}forget-pwd-mock.json`;

    subject: Subject<User>=new Subject<User>();

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) { }
    
    //获取当前用户可观察对象
    get currentUser(): Observable<User>{
        return this.subject.asObservable();
    }

    //注册用户
    register(user: User): Observable<User>{
        let body=JSON.stringify(user);
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        //TODO

        return this.http
            .get(this.registerUrl)
            .map((response: Response)=>{
                let user=response.json();
                this.localStorageService.setItem('currentUser',response);
                this.subject.next(user);
                return user;
            })
            .catch(this.handleError);
    }

    //登录用户
    login(user: User): Observable<User>{
        let body=JSON.stringify(user);
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        //TODO

        return this.http
            .get(this.registerUrl)
            .map((response: Response)=>{
                let user=response.json();
                this.localStorageService.setItem('currentUser',user);
                this.subject.next(user);
                return user;
            })
            .catch(this.handleError);
    }

    //注销用户
    logout(): void{
        this.localStorageService.removeItem('currentUser');
        this.subject.next();
    }

    //发送验证邮件
    sendEmail(email: string): Observable<any>{
        let headers=new Headers();
        headers.append('Content-Type','application/json');
        //TODO

        return this.http
            .get(this.validateEmailUrl)
            .map((response: Response)=>response.json())
            .catch(this.handleError);
    }

    //错误处理
    private handleError(error: Response | any){
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } 
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}