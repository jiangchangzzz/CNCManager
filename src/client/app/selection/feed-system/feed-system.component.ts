import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id,
    selector: 'feedsystem',
    templateUrl: './feed-system.component.html',
    styleUrls: ['./feed-system.component.css']
})

export class FeedSystemComponent implements OnInit,OnDestroy {
    axis: string;

    sub: any;

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() { 
        //路由改变时更新进给轴类型
        this.sub=this.activatedRoute.params
            .subscribe(params=>this.axis=params['feed']);
    }

    ngOnDestroy(){
        //为了避免内存泄漏，在组件销毁时取消订阅
        this.sub.unsubscribe();
    }
}