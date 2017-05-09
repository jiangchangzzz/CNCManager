import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
 
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {
    loginForm: FormGroup;
    userInfo: User=new User();

    formErrors={
        'userName': '',
        'password': '',
        'formError': ''
    };

    validationMessages={
        'userName': {
            'required': '用户名必须输入',
            'minlength': '用户名至少4个字符',
            'maxlength': '用户名最多32个字符'
        },
        'password': {
            'required': '密码必须输入',
            'minlength': '密码至少8位',
            'maxlength': '密码最多16位'
        }
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() { 
        this.buildForm();
    }

    buildForm(): void{
        this.loginForm=this.fb.group({
            'userName': [
                this.userInfo.userName,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(32)
                ]
            ],
            'password': [
                this.userInfo.password,
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16)
                ]
            ],
            'remeberMe': [
                this.userInfo.remeberMe
            ]
        });
        
        this.loginForm.valueChanges.subscribe(data=>this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any): void{
        if(!this.loginForm){
            return;
        }

        const form=this.loginForm;
        for(const mem in this.formErrors){
            this.formErrors[mem]='';
            const control=form.get(mem);
            if(control && control.dirty && !control.valid){
                const message=this.validationMessages[mem];
                for(const key in control.errors){
                    this.formErrors[mem]+=message[key]+' ';
                }
            }
        }
    }

    //登录用户
    login(): void{
        if(this.loginForm.valid){
            this.userInfo=this.loginForm.value;
            this.userService.login(this.userInfo)
                .subscribe(
                    data=>{
                        //如果有传递returnUrl，则跳转回目标页
                        let returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
                        this.router.navigateByUrl(returnUrl?returnUrl:'/');
                        //console.log(data);
                    },
                    error=>{
                        this.formErrors.formError=error.message;
                    }
                );
        }
        else{
            this.formErrors.formError='存在不合法的输入项，请检查';
        }
    }

    //忘记密码
    forgetPwd(): void{
        this.router.navigate(['/forgetpwd']);
    }
}