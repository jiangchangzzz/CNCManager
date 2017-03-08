import { Injectable } from '@angular/core';

/**
 * 操作localStorage服务
 * @export
 * @class LocalStorageService
 */
@Injectable()
export class LocalStorageService {

    /**
     * 将value存储到key字段
     * 
     * @param {string} key 键
     * @param {*} value 值
     * 
     * @memberOf LocalStorageService
     */
    setItem(key: string,value: any): void{
        localStorage.setItem(key,JSON.stringify(value));
    }

    /**
     * 获取指定key本地存储的值
     * @param {string} key 键
     * @returns {*} 值
     * @memberOf LocalStorageService
     */
    getItem(key: string): any{
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * 删除指定key本地存储的值
     * @param {string} key 键
     * @memberOf LocalStorageService
     */
    removeItem(key: string): void{
        localStorage.removeItem(key);
    }

    /**
     * 清除所有的key和value
     * @memberOf LocalStorageService
     */
    clear(): void{
        localStorage.clear();
    }
}