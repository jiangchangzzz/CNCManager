import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: 'user-forget',
    templateUrl: './forget-pwd.component.html',
    styleUrls: ['./forget-pwd.component.css']
})

export class ForgetPwdComponent implements OnInit {
    forgetForm: FormGroup;
    forgetInfo: User=new User();

    formErrors={
        'email': '',
        'formError': ''
    };

    validationMessages={
        'email': {
            'required': '邮箱必须输入',
            'pattern': '请输入注册时使用的邮箱'
        }
    }

    messageType: string;
    message: string;

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit() { 
        this.buildForm();
    }

    buildForm(): void{
        this.forgetForm=this.fb.group({
            'email':[
                this.forgetInfo.email,
                [
                    Validators.required,
                    Validators.pattern('^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$')
                ]
            ]
        });

        this.forgetForm.valueChanges.subscribe(data=>this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any): void{
        if(!this.forgetForm){
            return;
        }

        const form=this.forgetForm;
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

    //发送验证邮件
    sendEmail(): void{
        if(this.forgetForm.valid){
            this.forgetInfo=this.forgetForm.value;
            this.userService.sendEmail(this.forgetInfo.email)
                .subscribe(
                    (data)=>{
                        this.messageType='success';
                        this.message=data.message;
                    },
                    (error)=>{
                        this.messageType='danger';
                        this.message=error.message;
                    }
                );
        }
        else{
            this.formErrors.formError='存在不合法的输入项，请检查';
        }
    }

    //重置表单
    reset(): void{
        this.forgetForm.reset();
    }
}