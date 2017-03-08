import { Component } from '@angular/core';

import { CuttingCondition } from '../model/cutting-condition';
import { ProductCondition } from '../model/product-condition';

@Component({
    moduleId: module.id,
    selector: 'condition',
    templateUrl: 'condition.component.html',
    styleUrls: ['condition.component.css']
})
export class ConditionComponent {
    cuttingConditions: CuttingCondition[] = [
        {
            type: '强力切削',
            lengthwaysForce: 2000,
            verticalForce: 1200,
            feedSpeed: 0.6,
            timeScale: 10,
        },
        {
            type: '一般切削',
            lengthwaysForce: 1000,
            verticalForce: 500,
            feedSpeed: 0.8,
            timeScale: 30,
        },
        {
            type: '精切削',
            lengthwaysForce: 500,
            verticalForce: 200,
            feedSpeed: 1,
            timeScale: 50,
        },
        {
            type: '快速进给',
            lengthwaysForce: 0,
            verticalForce: 0,
            feedSpeed: 15,
            timeScale: 10,
        }
    ];

    productCondition: ProductCondition = {
        maxFeedSpeed: 15,
        tableTravel: 1000,
        productMaxMass: 300,
        tableMass: 100,
        productMaxHeight: 400,
        loadCharacter: "无冲击",
        productMaxLength: 400,
        feedAcceleration: 1,
        productMaxWidth: 400,
        spindleBoxMass: 100,
        tableLength: 1200,
        productStiffness: 1150000000,
    };
}
