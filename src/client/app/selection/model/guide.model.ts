export class GuideModel{
    sizeL0: number=500;
    sizeL1: number=500;
    sizeL2: number=200;
    sizeL3: number=150;
    sizeL4: number=50;
    sizeL5: number=100;
    sizeL6: number=60;
    varL6: number=200;
    varL9: number=150;
    varL10: number=100;

    guidType: string=GuideModel.guideTypes[0];
    rollerType: string=GuideModel.rollerTypes[0];
    life: number=20000;
    safety: number=2;
    load: number=1.2;
    contact: number=1.2;
    friction: number=0.003;
    minStaticLoad: number=0;
    minLiveLoad: number=0;
    XMass: number=400; 

    static guideTypes: string[]=['滚动导轨','滑动导轨'];
    static rollerTypes: string[]=['球滚子','圆柱滚子'];
}