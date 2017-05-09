import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../model/user';
import { LocalStorageService } from '../../shared/service/index';

@Component({
    moduleId: module.id,
    selector: 'user-center',
    templateUrl: './user-center.component.html',
    styleUrls: ['./user-center.component.css']
})

export class UserCenterComponent implements OnInit {
    userInfo: User;

    constructor(
        private localStorageService: LocalStorageService,
        private location: Location
    ) { 
        this.userInfo=this.localStorageService.getItem('currentUser');
    }

    ngOnInit() { 
        
    }

    goBack(): void{
        this.location.back();
    }
}