import { Injectable } from '@angular/core';

import { GuideModel } from '../model/index';
import { LocalStorageService } from '../../shared/service/index'

 
@Injectable()
export class GuideService {

    CNCWorkingCondition: any;
    guide: GuideModel;

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    compute(guide: GuideModel,axis: string){
        this.CNCWorkingCondition=this.localStorageService.getItem('condition');
        this.guide=guide;

        switch(axis){
   			case "XY":
   			case "X":
   				this.computeWorkingAxisMinStaticLoad();
                this.computeWorkingAxisMinDynamicLoad();
   				break;
   			case "Y":
   				this.computeSupportingAxisMinStaticLoad();
                this.computeSupportingAxisMinDynamicLoad();
   				break;
   			case "Z":
   				this.computeSpindleAxisMinStaticLoad();
                this.computeSpindleAxisMinDynamicLoad();
   				break;
   			default:
   				break;
   		}
    }

     //计算导轨加工轴最小静载荷，即X轴或XY轴
    private computeWorkingAxisMinStaticLoad(){
        var w1=9.8*this.CNCWorkingCondition.productCondition.productMaxMass;
        var w2=9.8*this.CNCWorkingCondition.productCondition.tableMass;
        var a=this.CNCWorkingCondition.productCondition.productMaxLength;
        var b=this.CNCWorkingCondition.productCondition.productMaxWidth;
        var c=this.CNCWorkingCondition.productCondition.productMaxHeight;
        var l0=this.guide.sizeL0;
        var l1=this.guide.sizeL1;
        var l6=this.guide.sizeL2;
        var l9=this.guide.sizeL3;
        var l4=this.guide.sizeL4;
        var l10=this.guide.sizeL5;
        var FA=this.CNCWorkingCondition.productCondition.feedAcceleration;
        var workLoads=new Array(4);
        //强力切削，一般切削，精切削
        for(var i=0;i<3;i++){
        	var LF=this.CNCWorkingCondition.cuttingCondition[i].lengthwaysForce;
        	workLoads[i]=new Array(8); 
        	workLoads[i][0]=Math.abs(0.125*LF*(1.0+a/l0-b/l1-4.0*(c+l9+l10)/l0+2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][1]=Math.abs(0.125*LF*(1.0-a/l0-b/l1+4.0*(c+l9+l10)/l0+2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][2]=Math.abs(0.125*LF*(1.0-a/l0+b/l1+4.0*(c+l9+l10)/l0-2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][3]=Math.abs(0.125*LF*(1.0+a/l0+b/l1-4.0*(c+l9+l10)/l0-2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][4]=Math.abs(0.25*LF*(2*(l4+0.5*b)/l0+0.60+1.20*a/l0));
        	workLoads[i][5]=Math.abs(0.25*LF*(0.60-1.20*a/l0-2*(l4+0.5*b)/l0));
        	workLoads[i][6]=workLoads[i][5];
        	workLoads[i][7]=workLoads[i][4];
        }
        //快速进给
        workLoads[3]=new Array(8);
        workLoads[3][0]=Math.abs(0.25*w1-w1*FA*l6/(19.6133*l0)+0.25*w2-w2*FA*(l9+l10+0.5*c)/(19.6133*l0));
        workLoads[3][1]=Math.abs(0.25*w1+w1*FA*l6/(19.6133*l0)+0.25*w2+w2*FA*(l9+l10+0.5*c)/(19.6133*l0));
        workLoads[3][2]=workLoads[3][1];
        workLoads[3][3]=workLoads[3][0];
        workLoads[3][4]=Math.abs((w1+w2)*FA*l4/(19.6133*l0));
        workLoads[3][5]=workLoads[3][4];
        workLoads[3][6]=workLoads[3][4];
        workLoads[3][7]=workLoads[3][4];
        // 取所有静载荷中的最大值
        var maxworkLoads=workLoads[0][0];
        for(var i=0;i<4;i++){
        	for(var j=0;j<8;j++){
        		if(workLoads[i][j]>maxworkLoads){
        			maxworkLoads=workLoads[i][j];
        		}
        	}
        }
        this.guide.minStaticLoad=Math.round(maxworkLoads*this.guide.safety*1000)/1000;
    }

    //计算导轨支撑轴最小静载荷，即Y轴
    private computeSupportingAxisMinStaticLoad(){
    	var a=this.CNCWorkingCondition.productCondition.productMaxLength;
        var b=this.CNCWorkingCondition.productCondition.productMaxWidth;
        var c=this.CNCWorkingCondition.productCondition.productMaxHeight; 
        var l=this.CNCWorkingCondition.productCondition.tableTravel;
        var l0x=this.guide.sizeL0;
        var l1x=this.guide.sizeL1;
        var l7x=this.guide.sizeL2;
        var l12=this.guide.sizeL3;
        var l4x=this.guide.sizeL4;
        var l11=this.guide.sizeL5;
        var l6=this.guide.varL6;
        var l9=this.guide.varL9;
        var l10=this.guide.varL10;
        var w1=9.8*this.CNCWorkingCondition.productCondition.tableMass;
        var w2=9.8*this.CNCWorkingCondition.productCondition.productMaxMass;
        var w3=9.8*this.guide.XMass;
        var FA=this.CNCWorkingCondition.productCondition.feedAcceleration;
        var workLoads=new Array(4);
        //强力切削
        for(var i=0;i<3;i++){
        	var LF=this.CNCWorkingCondition.cuttingCondition[i].lengthwaysForce;
        	workLoads[i]=new Array(8);
        	workLoads[i][0]=Math.abs(0.125*LF*(1.0-(a+1)/l1x-b/l0x+4.0*(c+l9+l12)/l1x+2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)-0.25*(w1+w2)*l/l1x);
        	workLoads[i][1]=Math.abs(0.125*LF*(1.0-(a+1)/l1x+b/l0x+4.0*(c+l9+l12)/l1x-2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)-0.25*(w1+w2)*l/l1x);
        	workLoads[i][2]=Math.abs(0.125*LF*(1.0+(a+1)/l1x+b/l0x-4.0*(c+l9+l12)/l1x-2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)+0.25*(w1+w2)*l/l1x);
        	workLoads[i][3]=Math.abs(0.125*LF*(1.0+(a+1)/l1x-b/l0x-4.0*(c+l9+l12)/l1x+2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)+0.25*(w1+w2)*l/l1x);
        	workLoads[i][4]=Math.abs(0.25*LF*(1-b/l0x+1.2*(a/2+l6)/l1x));
        	workLoads[i][5]=Math.abs(0.25*LF*(1+b/l0x-1.2*(a/2+l6)/l1x));
        	workLoads[i][6]=workLoads[i][5];
        	workLoads[i][7]=workLoads[i][4];
        }
        workLoads[3]=new Array(8);
        workLoads[3][0]=Math.abs(0.25*w3*(1-2*FA*l7x/(9.8*l0x))+0.25*w1*(1-2*FA*(l6-l10+l11+l12) /(9.8*l0x))+0.25*w2*(1-2*FA*(l9+0.5*c+l11+l12)/(9.8*l0x)));
        workLoads[3][1]=Math.abs(0.25*w3*(1+2*FA*l7x/(9.8*l0x))+0.25*w1*(1+2*FA*(l6-l10+l11+l12) /(9.8*l0x))+0.25*w2*(1+2*FA*(l9+0.5*c+l11+l12)/(9.8*l0x)));
        workLoads[3][2]=workLoads[3][1];
        workLoads[3][3]=workLoads[3][0];
        workLoads[3][4]=Math.abs(0.5*FA*(w3*l4x/l0x+(w1+w2)*(0.5*l+l4x)/l0x)/9.8);
        workLoads[3][5]=workLoads[3][4];
        workLoads[3][6]=workLoads[3][4];
        workLoads[3][7]=workLoads[3][4];
        //取所有静载荷中的最大值
        var maxworkLoads=workLoads[0][0];
        for(var i=0;i<4;i++){
        	for(var j=0;j<8;j++){
        		if(workLoads[i][j]>maxworkLoads){
        			maxworkLoads=workLoads[i][j];
        		}
        	}
        }
        this.guide.minStaticLoad=Math.round(maxworkLoads*this.guide.safety*1000)/1000;
    }

    //计算导轨主轴最小静载荷，即Z轴
    private computeSpindleAxisMinStaticLoad(){
    	var a=this.CNCWorkingCondition.productCondition.productMaxLength;
        var b=this.CNCWorkingCondition.productCondition.productMaxWidth;
        var c=this.CNCWorkingCondition.productCondition.productMaxHeight;
        var l0=this.guide.sizeL0;
        var l1=this.guide.sizeL1;
        var l2=this.guide.sizeL2;
        var l5=this.guide.sizeL3;
        var l4=this.guide.sizeL4;
        var l7=this.guide.sizeL5;
        var l6=this.guide.sizeL6;
        var w1=9.8*this.CNCWorkingCondition.productCondition.tableMass;
        var w2=9.8*this.CNCWorkingCondition.productCondition.productMaxMass;
        var FA=this.CNCWorkingCondition.productCondition.feedAcceleration;
        var workLoads=new Array(4);
        //强力切削
        //强力切削
        for(var i=0;i<3;i++){
        	var LF=this.CNCWorkingCondition.cuttingCondition[i].lengthwaysForce;
        	var VF=this.CNCWorkingCondition.cuttingCondition[i].verticalForce;
        	workLoads[i]=new Array(8);
        	workLoads[i][0]=Math.abs(0.25*LF*(1+2*l2/l0+2*(l5+l6-l7)/l1)-0.5*VF*l5/l0+0.5*w1*l7/l0+0.5*w2*l5/l0);
        	workLoads[i][1]=Math.abs(0.25*LF*(1-2*l2/l0+2*(l5+l6-l7)/l1)+0.5*VF*l5/l0-0.5*w1*l7/l0-0.5*w2*l5/l0);
        	workLoads[i][2]=Math.abs(0.25*LF*(1-2*l2/l0-2*(l5+l6-l7)/l1)+0.5*VF*l5/l0-0.5*w1*l7/l0-0.5*w2*l5/l0);
        	workLoads[i][3]=Math.abs(0.25*LF*(1+2*l2/l0-2*(l5+l6-l7)/l1)-0.5*VF*l5/l0+0.5*w1*l7/l0+0.5*w2*l5/l0);
        	workLoads[i][4]=Math.abs(0.25*LF*(1+2*l2/l0)-0.5*VF*l4/l0+0.5*(w1+w2)*l4/l0);
        	workLoads[i][5]=Math.abs(0.25*LF*(1-2*l2/l0)+0.5*VF*l4/l0+0.5*(w1+w2)*l4/l0);
        	workLoads[i][6]=workLoads[i][5];
        	workLoads[i][7]=workLoads[i][4];
        }
        workLoads[3]=new Array(8);
        workLoads[3][0]=Math.abs(0.5*(w1*l7+w2*l5)*(1+FA/9.8)/l0);
        workLoads[3][1]=workLoads[3][0];
        workLoads[3][2]=workLoads[3][0];
        workLoads[3][3]=workLoads[3][0];
        workLoads[3][4]=Math.abs(0.5*(w1+w2)*l4*(1+FA/9.8)/l0);
        workLoads[3][5]=workLoads[3][4];
        workLoads[3][6]=workLoads[3][4];
        workLoads[3][7]=workLoads[3][4];
        //取所有静载荷中的最大值
        var maxworkLoads=workLoads[0][0];
        for(var i=0;i<4;i++){
        	for(var j=0;j<8;j++){
        		if(workLoads[i][j]>maxworkLoads){
        			maxworkLoads=workLoads[i][j];
        		}
        	}
        }
        this.guide.minStaticLoad=Math.round(maxworkLoads*this.guide.safety*1000)/1000;
    };

    //计算导轨加工轴最小动载荷,即X轴
    private computeWorkingAxisMinDynamicLoad(){
        var w1=9.8*this.CNCWorkingCondition.productCondition.productMaxMass;
        var w2=9.8*this.CNCWorkingCondition.productCondition.tableMass;
        var a=this.CNCWorkingCondition.productCondition.productMaxLength;
        var b=this.CNCWorkingCondition.productCondition.productMaxWidth;
        var c=this.CNCWorkingCondition.productCondition.productMaxHeight;
        var l0=this.guide.sizeL0;
        var l1=this.guide.sizeL1;
        var l6=this.guide.sizeL2;
        var l9=this.guide.sizeL3;
        var l4=this.guide.sizeL4;
        var l10=this.guide.sizeL5;
        var FA=this.CNCWorkingCondition.productCondition.feedAcceleration;
        var workLoads=new Array(4);
        //强力切削，一般切削，精切削
        for(var i=0;i<3;i++){
        	var LF=this.CNCWorkingCondition.cuttingCondition[i].lengthwaysForce;
        	workLoads[i]=new Array(8); 
        	workLoads[i][0]=Math.abs(0.125*LF*(1.0+a/l0-b/l1-4.0*(c+l9+l10)/l0+2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][1]=Math.abs(0.125*LF*(1.0-a/l0-b/l1+4.0*(c+l9+l10)/l0+2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][2]=Math.abs(0.125*LF*(1.0-a/l0+b/l1+4.0*(c+l9+l10)/l0-2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][3]=Math.abs(0.125*LF*(1.0+a/l0+b/l1-4.0*(c+l9+l10)/l0-2.4*(l9+c)/l1)+0.25*(w1+w2));
        	workLoads[i][4]=Math.abs(0.25*LF*(2*(l4+0.5*b)/l0+0.60+1.20*a/l0));
        	workLoads[i][5]=Math.abs(0.25*LF*(0.60-1.20*a/l0-2*(l4+0.5*b)/l0));
        	workLoads[i][6]=workLoads[i][5];
        	workLoads[i][7]=workLoads[i][4];
        }
        //快速进给
        workLoads[3]=new Array(8);
        workLoads[3][0]=Math.abs(0.25*w1+0.25*w2);
        workLoads[3][1]=workLoads[3][0];
        workLoads[3][2]=workLoads[3][0];
        workLoads[3][3]=workLoads[3][0];
        workLoads[3][4]=Math.abs((w1+w2)*FA*l4/(19.6133*l0));
        workLoads[3][5]=workLoads[3][4];
        workLoads[3][6]=workLoads[3][4];
        workLoads[3][7]=workLoads[3][4];
        // 取所有静载荷中的最大值
        var maxLoads=new Array(4);
        for(var i=0;i<4;i++){
            maxLoads[i]=workLoads[i][0]+workLoads[i][4];
            for(var j=0;j<4;j++){
                if(workLoads[i][j]+workLoads[i][j+4]>maxLoads[i]){
                    maxLoads[i]=workLoads[i][j]+workLoads[i][j+4];
                }
            }
        }
        //求平均当量载荷和平均速度
        var averageLoad=0;
        var averageSpeed=0;
        var allTime=0;
        for(var i=0;i<4;i++){
            averageLoad+=maxLoads[i]*maxLoads[i]*maxLoads[i]*this.CNCWorkingCondition.cuttingCondition[i].feedSpeed*this.CNCWorkingCondition.cuttingCondition[i].timeScale;
            allTime+=this.CNCWorkingCondition.cuttingCondition[i].timeScale;
            averageSpeed+=this.CNCWorkingCondition.cuttingCondition[i].feedSpeed*this.CNCWorkingCondition.cuttingCondition[i].timeScale;
        }
        averageSpeed=averageSpeed/allTime;
        if(this.guide.rollerType=='球滚子'){
            var lifeIndex=3;
            var rollingElementFormIndex=50;
        }
        else{
            var lifeIndex=10/3;
            var rollingElementFormIndex=100;
        }
        averageLoad=Math.pow(averageLoad/100,1/3);
        this.guide.minLiveLoad=Math.round(averageLoad*this.guide.load*Math.pow(this.guide.life*60*averageSpeed*0.001/rollingElementFormIndex,1/lifeIndex)/this.guide.contact*1000)/1000;
    };

    //计算导轨支撑轴最小动载荷，即Y轴
    private computeSupportingAxisMinDynamicLoad(){
        var a=this.CNCWorkingCondition.productCondition.productMaxLength;
        var b=this.CNCWorkingCondition.productCondition.productMaxWidth;
        var c=this.CNCWorkingCondition.productCondition.productMaxHeight; 
        var l=this.CNCWorkingCondition.productCondition.tableTravel;
        var l0x=this.guide.sizeL0;
        var l1x=this.guide.sizeL1;
        var l7x=this.guide.sizeL2;
        var l12=this.guide.sizeL3;
        var l4x=this.guide.sizeL4;
        var l11=this.guide.sizeL5;
        var l6=this.guide.varL6;
        var l9=this.guide.varL9;
        var l10=this.guide.varL10;
        var w1=9.8*this.CNCWorkingCondition.productCondition.tableMass;
        var w2=9.8*this.CNCWorkingCondition.productCondition.productMaxMass;
        var w3=9.8*this.guide.XMass;
        var FA=this.CNCWorkingCondition.productCondition.feedAcceleration;
        var workLoads=new Array(4);
        //强力切削
        for(var i=0;i<3;i++){
            var LF=this.CNCWorkingCondition.cuttingCondition[i].lengthwaysForce;
            workLoads[i]=new Array(8);
            workLoads[i][0]=Math.abs(0.125*LF*(1.0-(a+1)/l1x-b/l0x+4.0*(c+l9+l12)/l1x+2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)-0.25*(w1+w2)*l/l1x);
            workLoads[i][1]=Math.abs(0.125*LF*(1.0-(a+1)/l1x+b/l0x+4.0*(c+l9+l12)/l1x-2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)-0.25*(w1+w2)*l/l1x);
            workLoads[i][2]=Math.abs(0.125*LF*(1.0+(a+1)/l1x+b/l0x-4.0*(c+l9+l12)/l1x-2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)+0.25*(w1+w2)*l/l1x);
            workLoads[i][3]=Math.abs(0.125*LF*(1.0+(a+1)/l1x-b/l0x-4.0*(c+l9+l12)/l1x+2.4*(l9+c+l11+l12)/l0x)+0.25*(w1+w2+w3)+0.25*(w1+w2)*l/l1x);
            workLoads[i][4]=Math.abs(0.25*LF*(1-b/l0x+1.2*(a/2+l6)/l1x));
            workLoads[i][5]=Math.abs(0.25*LF*(1+b/l0x-1.2*(a/2+l6)/l1x));
            workLoads[i][6]=workLoads[i][5];
            workLoads[i][7]=workLoads[i][4];
        }
        workLoads[3]=new Array(8);
        workLoads[3][0]=Math.abs(0.25*w3*(1-2*FA*l7x/(9.8*l0x))+0.25*w1*(1-2*FA*(l6-l10+l11+l12) /(9.8*l0x))+0.25*w2*(1-2*FA*(l9+0.5*c+l11+l12)/(9.8*l0x)));
        workLoads[3][1]=Math.abs(0.25*w3*(1+2*FA*l7x/(9.8*l0x))+0.25*w1*(1+2*FA*(l6-l10+l11+l12) /(9.8*l0x))+0.25*w2*(1+2*FA*(l9+0.5*c+l11+l12)/(9.8*l0x)));
        workLoads[3][2]=workLoads[3][1];
        workLoads[3][3]=workLoads[3][0];
        workLoads[3][4]=Math.abs(0.5*FA*(w3*l4x/l0x+(w1+w2)*(0.5*l+l4x)/l0x)/9.8);
        workLoads[3][5]=workLoads[3][4];
        workLoads[3][6]=workLoads[3][4];
        workLoads[3][7]=workLoads[3][4];
        // 取所有静载荷中的最大值
        var maxLoads=new Array(4);
        for(var i=0;i<4;i++){
            maxLoads[i]=workLoads[i][0]+workLoads[i][4];
            for(var j=0;j<4;j++){
                if(workLoads[i][j]+workLoads[i][j+4]>maxLoads[i]){
                    maxLoads[i]=workLoads[i][j]+workLoads[i][j+4];
                }
            }
        }
        //求平均当量载荷和平均速度
        var averageLoad=0;
        var averageSpeed=0;
        var allTime=0;
        for(var i=0;i<4;i++){
            averageLoad+=maxLoads[i]*maxLoads[i]*maxLoads[i]*this.CNCWorkingCondition.cuttingCondition[i].feedSpeed*this.CNCWorkingCondition.cuttingCondition[i].timeScale;
            allTime+=this.CNCWorkingCondition.cuttingCondition[i].timeScale;
            averageSpeed+=this.CNCWorkingCondition.cuttingCondition[i].feedSpeed*this.CNCWorkingCondition.cuttingCondition[i].timeScale;
        }
        averageSpeed=averageSpeed/allTime;
        if(this.guide.rollerType=='球滚子'){
            var lifeIndex=3;
            var rollingElementFormIndex=50;
        }
        else{
            var lifeIndex=10/3;
            var rollingElementFormIndex=100;
        }
        averageLoad=Math.pow(averageLoad/100,1/3);
        this.guide.minLiveLoad=Math.round(averageLoad*this.guide.load*Math.pow(this.guide.life*60*averageSpeed*0.001/rollingElementFormIndex,1/lifeIndex)/this.guide.contact*1000)/1000;
    };

    //计算导轨主轴最小动载荷
    private computeSpindleAxisMinDynamicLoad(){
        var a=this.CNCWorkingCondition.productCondition.productMaxLength;
        var b=this.CNCWorkingCondition.productCondition.productMaxWidth;
        var c=this.CNCWorkingCondition.productCondition.productMaxHeight;
        var l0=this.guide.sizeL0;
        var l1=this.guide.sizeL1;
        var l2=this.guide.sizeL2;
        var l5=this.guide.sizeL3;
        var l4=this.guide.sizeL4;
        var l7=this.guide.sizeL5;
        var l6=this.guide.sizeL6;
        var w1=9.8*this.CNCWorkingCondition.productCondition.tableMass;
        var w2=9.8*this.CNCWorkingCondition.productCondition.productMaxMass;
        var FA=this.CNCWorkingCondition.productCondition.feedAcceleration;
        var workLoads=new Array(4);
        //强力切削
        //强力切削
        for(var i=0;i<3;i++){
            var LF=this.CNCWorkingCondition.cuttingCondition[i].lengthwaysForce;
            var VF=this.CNCWorkingCondition.cuttingCondition[i].verticalForce;
            workLoads[i]=new Array(8);
            workLoads[i][0]=Math.abs(0.25*LF*(1+2*l2/l0+2*(l5+l6-l7)/l1)-0.5*VF*l5/l0+0.5*w1*l7/l0+0.5*w2*l5/l0);
            workLoads[i][1]=Math.abs(0.25*LF*(1-2*l2/l0+2*(l5+l6-l7)/l1)+0.5*VF*l5/l0-0.5*w1*l7/l0-0.5*w2*l5/l0);
            workLoads[i][2]=Math.abs(0.25*LF*(1-2*l2/l0-2*(l5+l6-l7)/l1)+0.5*VF*l5/l0-0.5*w1*l7/l0-0.5*w2*l5/l0);
            workLoads[i][3]=Math.abs(0.25*LF*(1+2*l2/l0-2*(l5+l6-l7)/l1)-0.5*VF*l5/l0+0.5*w1*l7/l0+0.5*w2*l5/l0);
            workLoads[i][4]=Math.abs(0.25*LF*(1+2*l2/l0)-0.5*VF*l4/l0+0.5*(w1+w2)*l4/l0);
            workLoads[i][5]=Math.abs(0.25*LF*(1-2*l2/l0)+0.5*VF*l4/l0+0.5*(w1+w2)*l4/l0);
            workLoads[i][6]=workLoads[i][5];
            workLoads[i][7]=workLoads[i][4];
        }
        workLoads[3]=new Array(8);
        workLoads[3][0]=Math.abs(0.5*(w1*l7+w2*l5)*(1+FA/9.8)/l0);
        workLoads[3][1]=workLoads[3][0];
        workLoads[3][2]=workLoads[3][0];
        workLoads[3][3]=workLoads[3][0];
        workLoads[3][4]=Math.abs(0.5*(w1+w2)*l4*(1+FA/9.8)/l0);
        workLoads[3][5]=workLoads[3][4];
        workLoads[3][6]=workLoads[3][4];
        workLoads[3][7]=workLoads[3][4];
        // 取所有静载荷中的最大值
        var maxLoads=new Array(4);
        for(var i=0;i<4;i++){
            maxLoads[i]=workLoads[i][0]+workLoads[i][4];
            for(var j=0;j<4;j++){
                if(workLoads[i][j]+workLoads[i][j+4]>maxLoads[i]){
                    maxLoads[i]=workLoads[i][j]+workLoads[i][j+4];
                }
            }
        }
        //求平均当量载荷和平均速度
        var averageLoad=0;
        var averageSpeed=0;
        var allTime=0;
        for(var i=0;i<4;i++){
            averageLoad+=maxLoads[i]*maxLoads[i]*maxLoads[i]*this.CNCWorkingCondition.cuttingCondition[i].feedSpeed*this.CNCWorkingCondition.cuttingCondition[i].timeScale;
            allTime+=this.CNCWorkingCondition.cuttingCondition[i].timeScale;
            averageSpeed+=this.CNCWorkingCondition.cuttingCondition[i].feedSpeed*this.CNCWorkingCondition.cuttingCondition[i].timeScale;
        }
        averageSpeed=averageSpeed/allTime;
        if(this.guide.rollerType=='球滚子'){
            var lifeIndex=3;
            var rollingElementFormIndex=50;
        }
        else{
            var lifeIndex=10/3;
            var rollingElementFormIndex=100;
        }
        averageLoad=Math.pow(averageLoad/100,1/3);
        this.guide.minLiveLoad=Math.round(averageLoad*this.guide.load*Math.pow(this.guide.life*60*averageSpeed*0.001/rollingElementFormIndex,1/lifeIndex)/this.guide.contact*1000)/1000;

    };
}