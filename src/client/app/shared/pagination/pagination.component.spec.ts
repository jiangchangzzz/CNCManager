import { TestBed, inject, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent',function(){

    let comp: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(function(){
        TestBed.configureTestingModule({
            declarations: [PaginationComponent],
            imports: [FormsModule]
        })
        .compileComponents();   //编译模板和css
    }));

    beforeEach(function(){
        fixture=TestBed.createComponent(PaginationComponent);
        comp=fixture.componentInstance;
        el=fixture.debugElement.nativeElement;

        comp.totalItem=100;
        comp.pageSize=20;
    });

    it('changePageOption()',function(){
        expect(comp.pages.length).toBe(5);
    });

    it('previousPage()',function(){
        let first=comp.pages[0];
        comp.changeCurrentPage(first);
        comp.previousPage();
        expect(comp.currentPage).toBe(first);

        comp.changeCurrentPage(comp.pages[1]);
        comp.previousPage();
        expect(comp.currentPage).toBe(comp.pages[0]);
    });

    it('nextPage()',function(){
        let last=comp.pages[comp.pages.length-1];
        comp.changeCurrentPage(last);
        comp.nextPage();
        expect(comp.currentPage).toBe(last);

        comp.changeCurrentPage(comp.pages[0]);
        comp.nextPage();
        expect(comp.currentPage).toBe(comp.pages[1]);
    });
});