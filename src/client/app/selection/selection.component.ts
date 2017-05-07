import { Component,ViewChild,OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService }from '../shared/service/index';


@Component({
    moduleId: module.id,
    selector: 'cnc-selection',
    templateUrl: 'selection.component.html',
    styleUrls: ['selection.component.css']
})
export class SelectionComponent implements OnInit{
    addShaftForm: FormGroup;
    shaftName: string;
    shaftNames: string[]=[];

    formErrors={
        'shaftName': '',
        'formError': ''
    };

    validationMessages={
        'shaftName': {
            'required': '轴的名称是必须的',
            'maxlength': '轴的名称最多5个字符'
        }
    };

    @ViewChild('addedModal')
    addedModal: ModalDirective;

    isAddedModalShown: boolean=false;

    constructor(
        private localStorageService: LocalStorageService,
        private fb: FormBuilder,
        private router: Router
    ){

    }

    ngOnInit(){
        this.buildForm();
    }

    buildForm(): void{
        this.addShaftForm=this.fb.group({
            'shaftName': [
                this.shaftName,[
                    Validators.required,
                    Validators.maxLength(5)
                ]
            ]
        });

        this.addShaftForm.valueChanges.subscribe(data=>this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?:any): void{
        if(!this.addShaftForm){
            return;
        }

        const form=this.addShaftForm;
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

    showAddedModal():void{
        this.isAddedModalShown=true;
    }

    hideAddedModal():void{
        this.addedModal.hide();
    }

    onHidden():void{
        this.isAddedModalShown=false;
    }

    //添加额外的轴
    addShaft(): void{
        if(this.addShaftForm.valid){
            this.shaftName=this.addShaftForm.value.shaftName;
            //console.log(this.shaftName);

            if(this.shaftNames.indexOf(this.shaftName)>=0){
                this.formErrors.formError='轴的名称已存在，请重新输入';
            }
            else if(this.shaftNames.length>=3){
                this.formErrors.formError='额外轴的数量已达上限';
            }
            else{
                this.shaftNames.push(this.shaftName);
                this.onHidden();
            }
        }
        else{
            this.formErrors.formError='存在不合法的输入项，请检查';
        }
    }

    removeShaft(shaftName: string){
        let index=this.shaftNames.indexOf(shaftName);
        if(index>=0){
            this.shaftNames.splice(index,1);
            this.router.navigate(['/home']);
        }
    }
}