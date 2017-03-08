import { Component, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../shared/service/local-storage.service';

import { CuttingCondition } from '../model/cutting-condition';
import { ProductCondition } from '../model/product-condition';

@Component({
    moduleId: module.id,
    selector: 'condition',
    templateUrl: 'condition.component.html',
    styleUrls: ['condition.component.css']
})
export class ConditionComponent implements AfterViewChecked,OnInit {
    cuttingConditions: CuttingCondition[];  //切削条件数据模型 

    productCondition: ProductCondition;   //工况数据模型

    loadCharacterOptions: string[] = ['无冲击', '轻微冲击', '有冲击或振动'];   //负载性质选项

    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ){}

    ngOnInit(){
        this.reset();
    }

    //点击下一步，保存数据到本地，并跳转到下一步
    nextStep(){
        let condition={
            cuttingCondition: this.cuttingConditions,
            productCondition: this.productCondition
        };
        this.localStorageService.setItem('condition',condition);
        this.router.navigate(['./']);
    }

    //点击重置，重置页面数据
    reset() {
        this.cuttingConditions = [
            {
                type: '强力切削',
                lengthwaysForce: 2000,
                verticalForce: 1200,
                feedSpeed: 0.6,
                timeScale: 10,
            },
            {
                type: '一般切削',
                lengthwaysForce: 1000,
                verticalForce: 500,
                feedSpeed: 0.8,
                timeScale: 30,
            },
            {
                type: '精切削',
                lengthwaysForce: 500,
                verticalForce: 200,
                feedSpeed: 1,
                timeScale: 50,
            },
            {
                type: '快速进给',
                lengthwaysForce: 0,
                verticalForce: 0,
                feedSpeed: 15,
                timeScale: 10,
            }
        ];

        this.productCondition = {
            maxFeedSpeed: 15,
            tableTravel: 1000,
            productMaxMass: 300,
            tableMass: 100,
            productMaxHeight: 400,
            loadCharacter: this.loadCharacterOptions[0],
            productMaxLength: 400,
            feedAcceleration: 1,
            productMaxWidth: 400,
            spindleBoxMass: 100,
            tableLength: 1200,
            productStiffness: 1150000000,
        };
    }

    //集中显示错误信息
    formErrors: string[];

    conditionForm: NgForm;

    @ViewChild('conditionForm')
    currentForm: NgForm;

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.conditionForm) {
            return;
        }
        this.conditionForm = this.currentForm;
        if (this.conditionForm) {
            this.conditionForm.valueChanges
                .subscribe(data => this.onvalueChanged(data));
        }
    }

    onvalueChanged(data?: any) {
        if (!this.conditionForm) {
            return;
        }
        this.formErrors = [];
        let required = false;
        let pattern = false;
        for (let key in this.conditionForm.controls) {
            let control = this.conditionForm.controls[key];
            if (control.dirty && !control.valid) {
                required = control.errors['required'] || required;
                pattern = control.errors['nonnegative'] || pattern;
            }
        }
        required ? this.formErrors.push('值不能为空') : null;
        pattern ? this.formErrors.push('值必须是非负数') : null;
    }
}
