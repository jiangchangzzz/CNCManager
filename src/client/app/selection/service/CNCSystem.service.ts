import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { CNCSystem } from '../model/index';
import { DefaultService } from './index';

@Injectable()
export class CNCSystemService {

    private readonly requestUr: string;

    constructor(
        private http: Http,
        private defaultService: DefaultService) { 
        this.requestUr=defaultService.url+'NCSystems';
    }

    getNCSystems(): Promise<CNCSystem[]>{
        return this.http.get(this.requestUr)
            .toPromise()
            .then(response=>response.json() as CNCSystem[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any>{
        console.log("NCSystemTypeService error",error);
        return Promise.reject(error.message || error);
    }
}