import ResPath from "../Common/ResPath";
import SeedBox from "../UI/Plant/Seed/SeedBox";

/*
	20230616
*/
/** ui种子池 */
export default class UISeedPool {
	
    private static _seedPrefab:cc.Prefab = null;
    private static _seeds:SeedBox[] = [];

    public static havePrefab():boolean{
        return this._seedPrefab != null;
    }

    /**
     *  @param callNode:调用该方法的节点
     */
    public static initPrefab(callNode: cc.Node) {
        cc.resources.load(ResPath.plantPre + "SeedBox", cc.Prefab, (error: Error, prefab: cc.Prefab) => {
            this._seedPrefab = prefab;
            callNode.emit("GetResSuccess");
        });
    }

    /** 获取种子    */
    public static getSeed():SeedBox{
        var seed:SeedBox = null;

        if(this._seeds.length <1){
                seed = cc.instantiate(this._seedPrefab).getComponent(SeedBox);
        }else{
            seed = this._seeds.pop();
            seed.node.active = true;
        }

        return seed;
    }

    public static recycleSeed(seed:SeedBox){
        seed.node.active = false;
        this._seeds.push();
    }
}
