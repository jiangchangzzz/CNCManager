import { Component,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { SystemAccessoryService } from '../../service/index';
import { LocalStorageService } from '../../../shared/service/index';
import { CNCTypeService } from '../../service/CNCType.service';

@Component({
    moduleId: module.id,
    selector: 'system-accessory',
    templateUrl: './system-accessory.component.html',
    styleUrls: ['./system-accessory.component.css'],
    providers: [SystemAccessoryService]
})
export class SystemAccessoryComponent implements OnInit{
    //位控方式选项
    controlTypeOptions: string[]=['全闭环','半闭环','开环'];

    //底板型号选项
    baseboardOptions: string[]=[];

    //通讯板型号选项
    communicationboardOptions: string[]=[];

    //IO模块型号选项
    IOModuleOptions: string[]=[]; 

    //UPS电源型号选项
    UPSPowerOptions: string[]=[];

    //手操盘型号选项
    wheelOptions: string[]=[];

    IOUnit: any={
        controlType: this.controlTypeOptions[0],
        baseboardId: '',
        baseboardNum: 0,
        communicationboardId: '',
        communicationboardNum: 0,
        IOModuleId: '',
        IOModuleNum: 0,
        inputboardNum: 0,
        outputboardNum: 0
    };

    UPSPower: any={
        isAdd: false,
        id: '',
        num: 0
    };

    wheel: any={
        isAdd: false,
        id: '',
        num: 0
    }

    constructor(
        private systemAccessoryService: SystemAccessoryService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private CNCTypeService: CNCTypeService
    ){}

    ngOnInit(){
        //获取IO单元型号数据
        this.systemAccessoryService.getIOUnit().then(data=>{
            data.forEach(value=>{
                if(value.Category==='底板'){
                    this.baseboardOptions.push(value.TypeID);
                }
                else if(value.Category==='通讯'){
                    this.communicationboardOptions.push(value.TypeID);
                }
                else if(value.Category==='I/O'){
                    this.IOModuleOptions.push(value.TypeID);
                }
            });

            if(this.baseboardOptions.length>0){
                this.IOUnit.baseboardId=this.baseboardOptions[0];
            }

            if(this.communicationboardOptions.length>0){
                this.IOUnit.communicationboardId=this.communicationboardOptions[0];
            }
            
            if(this.IOModuleOptions.length>0){
                this.IOUnit.IOModuleId=this.IOModuleOptions[0];
            }
            //console.log(this.baseboardOptions);
            //console.log(this.communicationboardOptions);
            //console.log(this.IOModuleOptions);
        });

        //获取UPS电源型号
        this.systemAccessoryService.getUPSPower().then(data=>{
            data.forEach(value=>{
                this.UPSPowerOptions.push(value.TypeID);
            });

            if(this.UPSPowerOptions.length>0){
                this.UPSPower.id=this.UPSPowerOptions[0];
            }
            //console.log(this.UPSPowerOptions);
        });

        //获取手操盘型号数据
        this.systemAccessoryService.getWheel().then(data=>{
            data.forEach(value=>{
                this.wheelOptions.push(value.TypeID);
            });

            if(this.wheelOptions.length>0){
                this.wheel.id=this.wheelOptions[0];
            }
            //console.log(this.wheelOptions);
        })
    }

    //下一步
    nextStep(): void{
        let accessory: any={
            IOUnit: this.IOUnit,
            UPSPower: this.UPSPower,
            wheel: this.wheel
        };
        this.localStorageService.setItem('accessory',accessory);

        let support=this.CNCTypeService.currentCNCType.support;
        if(support==='X'){
            this.router.navigate(['/selection/feedSystem','X']);
        }
        else if(support==='C'){
            this.router.navigate(['/selection/feedSystem','XY']);
        }
    }

    //取消选择
    cancel(): void{
        
    }
}

