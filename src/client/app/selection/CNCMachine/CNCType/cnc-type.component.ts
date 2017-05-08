import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../shared/service/local-storage.service';
import { CNCType } from '../../model/index';
import { CNCTypeService } from '../../service/CNCType.service';

@Component({
    moduleId: module.id,
    selector: 'cnc-type',
    templateUrl: 'cnc-type.component.html',
    styleUrls: ['cnc-type.component.css']
})
export class CNCTypeComponent{
    constructor(
        private router: Router,
        private CNCTypeService: CNCTypeService
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
        this.CNCTypeService.setCNCType(this.selectedType);
        this.router.navigate(['/selection/CNCMachine/condition']);
    }

    //点击取消，取消选择的机床类型
    cancel(): void{
        this.selectedType=null;
    }
}