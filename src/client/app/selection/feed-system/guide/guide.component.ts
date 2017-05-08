import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GuideModel } from '../../model/guide.model';
import { GuideService } from '../../service/guide.service';

@Component({
    moduleId: module.id,
    selector: 'feedsystem-guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.css'],
    providers: [GuideService]
})

export class GuideComponent implements OnInit,OnDestroy {
    guide: GuideModel;   //导轨表单模型
    axis: string;   //进给轴类型

    guideTypeOptions: string[]=GuideModel.guideTypes;
    rollerTypeOptions: string[]=GuideModel.rollerTypes;

    private sub: any;

    constructor(
        private guideService: GuideService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() { 
        //路由变化时读取进给轴类型
        this.sub=this.activatedRoute.parent.params.subscribe(params=>this.axis=params['feed']);
        this.reset();
    }

    ngOnDestroy(){
        //避免内存泄漏，在组件销毁时取消订阅
        this.sub.unsubscribe();
    }

    compute(){
        this.guideService.compute(this.guide,this.axis);
    }

    //重置表单
    reset(){
        this.guide=new GuideModel();
        this.compute();
    }
}