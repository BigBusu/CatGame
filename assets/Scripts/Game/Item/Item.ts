import { ItemType } from "./ItemType";

/*
	20230613
*/
/** 物品 */
export default class Item {
	public itemType:ItemType = ItemType.Seed;
    public id:number = 0;
	public count:number = 0;
}
