import { Component,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';


@Component({
    moduleId: module.id,
    selector: 'cnc-selection',
    templateUrl: 'selection.component.html',
    styleUrls: ['selection.component.css']
})
export class SelectionComponent{
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
}