import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../shared/service/local-storage.service';

@Component({
    moduleId: module.id,
    selector: 'cnc-type',
    templateUrl: 'cnc-type.component.html',
    styleUrls: ['cnc-type.component.css']
})
export class CNCTypeComponent{
    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ){}

    CNCTypes: CNCType[]=[
        {name: '立式车床',support: 'C'},
        {name: '立式铣床',support: 'X'},
        {name: '龙门铣床',support: 'X'},
        {name: '卧式车床',support: 'C'},
        {name: '卧式铣床',support: 'X'},
        {name: '斜床身车床',support: 'C'},
        {name: '磨床',support: 'M'}];

    selectedType: CNCType=null;

    //选择数控机床类型
    selectType(type: CNCType): void{
        this.selectedType=type;
    }

    //点击下一步，保存数控机床数据到本地
    nextStep(): void{

        //如果上次选的机床类型和新选择的不同，则清除所有本地存储
        let oldCNCType=this.localStorageService.getItem('CNCType');
        if(oldCNCType && oldCNCType.name!==this.selectedType){
            this.localStorageService.clear();
        }

        this.localStorageService.setItem('CNCType',this.selectedType);
        this.router.navigate(['/selection/CNCMachine/condition']);
    }

    //点击取消，取消选择的机床类型
    cancel(): void{
        this.selectedType=null;
    }
}

//数控机床类型
export class CNCType{
    name: string;
    support: string;
}