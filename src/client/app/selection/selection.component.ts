import { Component,ViewChild,OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { LocalStorageService }from '../shared/service/index';


@Component({
    moduleId: module.id,
    selector: 'cnc-selection',
    templateUrl: 'selection.component.html',
    styleUrls: ['selection.component.css']
})
export class SelectionComponent implements OnInit{
    shaftName: string;

    constructor(
        private localStorageService: LocalStorageService
    ){

    }

    ngOnInit(){

    }

    @ViewChild('addedModal')
    addedModal: ModalDirective;

    isAddedModalShown: boolean=false;

    showAddedModal():void{
        this.isAddedModalShown=true;
    }

    hideAddedModal():void{
        this.addedModal.hide();
    }

    onHidden():void{
        this.isAddedModalShown=false;
    }

    doSubmit(): void{
        
    }
}