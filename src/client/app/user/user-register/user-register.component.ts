import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

import { User } from '../model/user';

@Component({
    moduleId: module.id,
    selector: 'user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {
    userForm: FormGroup;
    userInfo: User=new User();

    formErrors={
        'userName': '',
        'nickName': '',
        'email': '',
        'password': '',
        'confirmPassword': '',
        'formError': ''
    };

    validationMessages={
        'userName': {
            'required': '用户名必须输入',
            'minlength': '用户名至少4个字符',
            'maxlength': '用户名最多32个字符'
        },
        'nickName': {
            'required': '昵称必须输入',
            'minlength': '昵称至少2个字符',
            'maxlength': '昵称最多32个字符'
        },
        'email': {
            'required': '邮箱必须输入',
            'pattern': '请输入正确的邮箱地址'
        },
        'password': {
            'required': '密码必须输入',
            'minlength': '密码至少8位',
            'maxlength': '密码最多16位'
        },
        'confirmPassword': {
            'required': '重复密码必须输入',
            'minlength': '密码至少8位',
            'maxlength': '密码最多16位',
            'validateEqual': '两次输入的密码不一致'
        }
    }

    constructor(
        public fb: FormBuilder
    ) { }

    ngOnInit() { 
        this.buildForm();
    }

    buildForm(): void{
        this.userForm=this.fb.group({
            "userName": [
                this.userInfo.userName,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(32)
                ]
            ],
            "nickName": [
                this.userInfo.nickName,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(32)
                ]
            ],
            "email": [
                this.userInfo.email,
                [
                    Validators.required,
                    Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
                ]
            ],
            "password": [
                this.userInfo.password,
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16)
                ]
            ],
            "confirmPassword": [
                this.userInfo.confirmPassword,
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16)
                ]
            ]
        });

        this.userForm.valueChanges.subscribe(data=>this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any){
        if(!this.userForm){
            return;
        }

        const form=this.userForm;
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

    //用户注册
    register(): void{
        if(this.userForm.valid){
            this.userInfo=this.userForm.value;
        }
        else{
            this.formErrors.formError='存在不合法的输入项，请检查';
        }
        console.log(this.userInfo);
    }

    //重置表单
    reset(): void{
        this.userForm.reset();
    }
}