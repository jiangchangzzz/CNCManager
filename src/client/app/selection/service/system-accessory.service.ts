import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DefaultService } from './index';
import { IOUnit,UPSPower,Wheel } from '../model/index';

@Injectable()
export class SystemAccessoryService {
    private readonly IOUnitRequestUrl: string;
    private readonly UPSPowerRequestUrl: string;
    private readonly wheelRequestUrl: string;

    constructor(
        private http: Http,
        private defaultService: DefaultService
    ) { 
        this.IOUnitRequestUrl=this.defaultService.url+'NCSystemIOUnits';
        this.UPSPowerRequestUrl=this.defaultService.url+'NCSystemPowerUnits';
        this.wheelRequestUrl=this.defaultService.url+'NCSystemManuals';
    }
    
    //获取IO单元数据
    getIOUnit(): Promise<IOUnit[]>{
        return this.http.get(this.IOUnitRequestUrl)
            .toPromise()
            .then(response=>response.json() as IOUnit[])
            .catch(this.handleError);
    }

    //获取UPS电源数据
    getUPSPower(): Promise<UPSPower[]>{
        return this.http.get(this.UPSPowerRequestUrl)
            .toPromise()
            .then(response=>response.json() as UPSPower[])
            .catch(this.handleError);
    }

    //获取手操盘数据
    getWheel(): Promise<Wheel[]>{
        return this.http.get(this.wheelRequestUrl)
            .toPromise()
            .then(response=>response.json() as Wheel[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
        console.log('SystemAccessoryService error',error);
        return Promise.reject(error.message || error);
    }
}