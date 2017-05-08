import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CNCType } from '../model/index';
import { LocalStorageService } from '../../shared/service/index'

@Injectable()
export class CNCTypeService {
    subject: Subject<CNCType>=new Subject<CNCType>();

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    //设置数控机床类型
    setCNCType(newType: CNCType): void{
        //如果上次选的机床类型和新选择的不同，则清除所有本地存储
        let oldCNCType=this.localStorageService.getItem('CNCType');
        if(oldCNCType && oldCNCType.name!==newType.name){
            this.localStorageService.clear();
        }   

        this.localStorageService.setItem('CNCType',newType);
        this.subject.next(newType); 
    }

    //获取数控机床类型，返回一个可观察对象
    getCNCType(): Observable<CNCType>{
        return this.subject.asObservable();
    }
}