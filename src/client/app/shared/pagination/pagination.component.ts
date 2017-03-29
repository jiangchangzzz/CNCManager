import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * 分页组件类
 * 使用方法：
 *     Input totalItem 项目总数
 *     Output onPageChange {start: 项目开始序号，end: 项目结束序号}
 * @export
 * @class PaginationComponent
 */
@Component({
    moduleId: module.id,
    selector: 'cnc-pagination',
    templateUrl: './pagination.componet.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent{
    //每页条目数选项
    pageSizeOptions: number[]=[10,20,30];

    //显示页码数组
    pages: number[];

    //当前页码
    currentPage: number=1;

    //每页条目数
    private _pageSize: number=this.pageSizeOptions[0];
    set pageSize(pageSize: number){
        this._pageSize=pageSize;
        this.changePageOption();
        this.changeCurrentPage(1);
    }
    get pageSize(){
        return this._pageSize;
    }

    //项目总数
    private _totalItem: number=0;
    @Input()
    set totalItem(totalItem: number){
        this._totalItem=totalItem;
        this.changePageOption();
        setTimeout(()=>this.changeCurrentPage(1));
    }
    get totalItem(){
        return this._totalItem;
    }

    @Output()
    onChangePage=new EventEmitter<any>();

    //点击页码，改变当前页码
    changeCurrentPage(page: number): void{
            this.currentPage=page;

            let startNum=(page-1)*Number(this.pageSize);
            let endNum=startNum+Number(this.pageSize);
            this.onChangePage.emit({start: startNum,end: endNum});
    }

    //点击上一页
    previousPage(): void{
        if(this.currentPage!==1){
            this.changeCurrentPage(this.currentPage-1);
        }
    }

    //点击下一页
    nextPage(): void{
        if(this.currentPage!==this.pages.length){
            this.changeCurrentPage(this.currentPage+1);
        }
    }

    //改变页码选项
    changePageOption(): void{
        let pageNum=Math.ceil(this.totalItem/this.pageSize);
        this.pages=[];
        for(var i=1;i<=pageNum;i++){
            this.pages.push(i);
        }
    }
}