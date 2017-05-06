import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../user/service/user.service';

@Component({
    moduleId: module.id,
    selector: 'cnc-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit{
    nickName: string;

    constructor(
        private userService: UserService,
        private router: Router
    ){}

    ngOnInit(){
        this.userService.currentUser.subscribe(
            data=>{
                if(data){
                    this.nickName=data.nickName;
                }
                else{
                    this.nickName=null;
                }
            }
        )
    }

    logout(): void{
        this.userService.logout();
        this.router.navigate(['/home']);
    }
}