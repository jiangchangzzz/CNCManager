import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NCSystem } from '../model/index';
import { DefaultService } from './defaultService';

@Injectable()
export class NCSystemTypeService {

    readonly requestUr: string;

    constructor(
        private http: Http,
        private defaultService: DefaultService) { 
        this.requestUr=defaultService.url+'NCSystems';
    }

    getNCSystems(){
        return this.http.get(this.requestUr)
            .map(response=>response.json().data as NCSystem[]);
    }
}