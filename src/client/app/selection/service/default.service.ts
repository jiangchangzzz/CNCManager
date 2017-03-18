import { Injectable } from '@angular/core';

@Injectable()
export class DefaultService {
    readonly url: string='http://cncdataapi.azurewebsites.net/api/cncdata/';
}