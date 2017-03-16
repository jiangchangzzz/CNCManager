import { Component,OnInit } from '@angular/core';

import { SystemType,NCSystem } from './../../model/index';
import { LocalStorageService } from '../../../shared/service/index';
import { NCSystemTypeService } from '../../service/index';


@Component({
    moduleId: module.id,
    selector: 'system-type',
    templateUrl: './system-type.component.html',
    styleUrls: ['./system-type.component.css']
})
export class SystemTypeComponent implements OnInit{

    readonly manufacturerOptions: string[]=["华中数控","广州数控","沈阳高精","北京航天数控"];

    filterNum: SystemType={
        Manufacturer:this.manufacturerOptions[0],
     	SupportNumberOfChannels:1,
     	MaxControlNumberOfFeedAxis:1,
     	SupportTypeOfMachine:null
    };

    NCSystems: 

    constructor(
        private localStorageService: LocalStorageService,
        private NCSystemTypeService: NCSystemTypeService
    ){}

    ngOnInit(){
        this.filterNum.SupportTypeOfMachine=this.localStorageService.getItem('CNCType').support;
    }
}