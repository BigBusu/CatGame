
/*
	20230331
*/
/** 随机值 */
export default class RandomValue {
	/** 获取随机整数
     *  min:包含
     *  max:包含
     */
    public static randomValueInt(min:number,max:number):number{        
        let differenceNum:number = max - min;
        let randomFloat:number = Math.random();

        let resultNum = min + Math.round(differenceNum * randomFloat);
        
        return resultNum;
    }

    /** 获取随机小数
     *  min:包含
     *  max:包含
     */
    public static randomValueFloat(min:number,max:number):number{
        let differenceNum:number = max - min;
        let randomFloat:number = Math.random();

        let resultNum = min + differenceNum * randomFloat;
        
        return resultNum;
    }
}
