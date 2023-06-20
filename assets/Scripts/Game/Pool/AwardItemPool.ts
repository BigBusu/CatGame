const {ccclass, property} = cc._decorator;

/*
	20230510
*/
/** 奖励物品池 */
@ccclass
export default class AwardItemPool extends cc.Component {
    public static instance: AwardItemPool = null;

    private _itemPrefab:cc.Prefab = null;
    private _items:cc.Node[] = [];

    onLoad() {
        AwardItemPool.instance = this;

        // 必须开始就获得所有的预制件！！！！！！！！！！！
        this.initPrefab();
    }

    public getItem():cc.Node{
        let itemNode: cc.Node = null;
        
        if(this._items.length <1){
            itemNode = cc.instantiate(this._itemPrefab);
        }else {
            itemNode = this._items.pop();
            itemNode.active = true;
        }

        return itemNode;
    }

    public recycleItem(itemNode: cc.Node) {
        itemNode.active = false;
        this._items.push(itemNode);
    }

    private initPrefab() {
        cc.resources.load("Prefabs/SignIn/AwardItem", cc.Prefab, (error: Error, prefab: cc.Prefab) => {
            this._itemPrefab = prefab;
        });
    }
}
