/*
	20230529
*/
/** 植物数据（应该是土坑的数据）
 * 植物种植结束后，坑不会随之消失
 */
export default class PlantData {
	/** 植物索引 */
    public id:number = 0;
    /** 位置索引 */
    public locationId:number = 0;
    /** 当前生长阶段
     * 1:种子
     * 2:生长
     * 3:结果
     */
    public growthStage:number = 1;
    /** 下阶段所需时间：秒 */
    public nextStageTime:number = 0;
    // /** 剩余浇水次数 */
    // public wateringCount:number = 0;
    /** 是否需要浇水 */
    public needWatering:boolean = false;
    /** 浇水减少时间 */
    public wateringReduceTime:number = 0;
}
