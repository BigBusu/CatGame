import Item from "../Item/Item";
import PlantData from "../Plant/PlantData";

/*
	20230508
*/
/** 保存数据 */
export default class SaveData {
	
	public date:number[] = [];
	/** 登录天数累计 */
	public signInDayCount:number = 0;
	/** 登录奖励的天数累计 */
	public signInCumulativeAward: number = 0;

	/** 最大耐心 */
	public maxPatience = 20;
	/** 耐心 */
	public patience = 20;
	/** 鱼干数 */
	public fishCount = 0;
	/** 道具 */
	public items:Item[] = [];

	//#region 种植
	public plantDatas:PlantData[] = []; 
	//#endregion
}
