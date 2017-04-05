
/**
 * 数控系统IO单元数据
 * @export
 * @class IOUnit
 */
export class IOUnit{

    /**
     * 型号
     * @type {string}
     * @memberOf IOUnit
     */
    TypeID: string;

    /**
     * 生产厂家
     * @type {string}
     * @memberOf IOUnit
     */
    Manufacturer: string;

    /**
     * 类型
     * @type {string}
     * @memberOf IOUnit
     */
    Category: string;

    /**
     * 备注
     * @type {string}
     * @memberOf IOUnit
     */
    Comments?: string;
}