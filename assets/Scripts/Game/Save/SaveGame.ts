import SaveData from "./SaveData";

//const { ccclass, property } = cc._decorator;

/*
    20230508
*/
/** 保存游戏 */
//@ccclass
export default class SaveGame {
    /**
 * 存储数据
 *
 * @static
 */
    public static saveData(key: string, saveData: SaveData) {
        var jsonData = JSON.stringify(saveData);
        localStorage.setItem(key, jsonData);


        // //这里判断是否为微信环境（使用你自己的判断方式）
        // if (G.isWX) {
        //     wx.setStorage({
        //         key: key, data: data,
        //         success(res) {
        //             console.log("-->Set--" + data)
        //         }
        //     })
        // } else {
        //     cc.sys.localStorage.setItem(key, data);
        // }
    }
    /**
     * 读取数据
     *
     * @static
     */
    public static loadData(key: string): SaveData {
        var savData:SaveData = null;
        var jsonData = localStorage.getItem(key);

        if(jsonData != null)        
            savData = Object.assign(new SaveData(), JSON.parse(jsonData));

        return savData;

        //   //这里判断是否为微信环境（使用你自己的判断方式）
        // if (G.isWX) {
        //     var value = wx.getStorageSync(key)
        //     console.log("-->Get--" + value)
        //     return value
        // } else {
        //     return cc.sys.localStorage.getItem(key);
        // }
    }
    /**
    * 移除数据
    *
    * @static
    */
    public static removeData(key: string) {
        localStorage.removeItem(key);

        // //这里判断是否为微信环境（使用你自己的判断方式）
        // if (G.isWX) {
        //     wx.removeStorage({
        //         key: key,
        //         success(res) {
        //             console.log("-->Remove--" + res)
        //         }
        //     })
        // } else {
        //     cc.sys.localStorage.removeItem(key);
        // }
    }

    // static hasData(key: string): boolean {
    //     //这里判断是否为微信环境（使用你自己的判断方式）
    //     if (G.isWX) {
    //         if (wx.getStorage({ key: key, }) == undefined) {
    //             return false

    //         } else {
    //             return true

    //         }
    //     } else {
    //         if (cc.sys.localStorage.getItem(key) == undefined) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     }
    // }

}
