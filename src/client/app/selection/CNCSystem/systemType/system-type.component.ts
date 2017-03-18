import { Component,OnInit } from '@angular/core';

import { SystemType,CNCSystem } from './../../model/index';
import { LocalStorageService } from '../../../shared/service/index';
import { CNCSystemService } from '../../service/index';


@Component({
    moduleId: module.id,
    selector: 'system-type',
    templateUrl: './system-type.component.html',
    styleUrls: ['./system-type.component.css'],
    providers: [CNCSystemService]
})
export class SystemTypeComponent implements OnInit{

    readonly manufacturerOptions: string[]=["华中数控","广州数控","沈阳高精","北京航天数控"];

    //筛选条件
    filterNum: SystemType={
        Manufacturer:this.manufacturerOptions[0],
     	SupportNumberOfChannels:1,
     	MaxControlNumberOfFeedAxis:1,
     	SupportTypeOfMachine:null
    };

    //从后盾获取到的数控系统数据
    CNCSystems: CNCSystem[];

    //用户当前选择的数控系统
    selectedCNCSystem: CNCSystem;

    //页面信息
    page: any={
        start: 0,
        end: 10
    }

    constructor(
        private localStorageService: LocalStorageService,
        private NCSystemTypeService: CNCSystemService
    ){}

    ngOnInit(){
        this.filterNum.SupportTypeOfMachine=this.localStorageService.getItem('CNCType').support;
        this.NCSystemTypeService.getNCSystems().then(data=>this.CNCSystems=data);
    }

    //页码改变事件处理程序
    changePage($event: any): void{
       this.page=$event;
    }

    //追踪函数，根据TypeID值判断是否为重复数据，避免重复渲染
    trackByCNCSystems(index: number,CNCSystem: CNCSystem){
        return CNCSystem.TypeID;
    }

    selectCNCSystem(CNCSystem: CNCSystem){
        this.selectedCNCSystem=CNCSystem;
    }
}