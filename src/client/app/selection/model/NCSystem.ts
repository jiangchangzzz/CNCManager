export class NCSystem{
    /**
     * 型号
     * @type {string}
     * @memberOf NCSystem
     */
    TypeID: string;  


    /**
     * 生产厂家
     * @type {string}
     * @memberOf NCSystem
     */
    Manufacturer: string;


    /**
     * 系列
     * @type {string}
     * @memberOf NCSystem
     */
    series: string;


    /**
     * 支持机床类型
     * @type {string}
     * @memberOf NCSystem
     */
    SupportMachineType: string;


    /**
     * 支持通道数
     * @type {number}
     * @memberOf NCSystem
     */
    SupportChannels: number;


    /**
     * 进给轴最大控制轴数
     * @type {number}
     * @memberOf NCSystem
     */
    MaxNumberOfFeedShafts: number;


    /**
     * 主轴最大控制轴数
     * @type {number}
     * @memberOf NCSystem
     */
    MaxNumberOfSpindels: number;


    /**
     * 最大联轴数
     * @type {number}
     * @memberOf NCSystem
     */
    MaxNumberOfLinkageAxis: number;


    /**
     * 图片路径
     * @type {string}
     * @memberOf NCSystem
     */
    PictureUrl: string;
}