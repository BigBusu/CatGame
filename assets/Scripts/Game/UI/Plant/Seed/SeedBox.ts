import ResPath from "../../../Common/ResPath";
import SpritePool from "../../../Common/SpritePool";
import Item from "../../../Item/Item";
import GetJsonData from "../../../JsonData/GetJsonData/GetJsonData";

const {ccclass, property} = cc._decorator;

/*
	20230615
*/
/** 种子框 */
@ccclass
export default class SeedBox extends cc.Component {
	private _seedSpr:cc.Sprite = null;
    private _tog:cc.Toggle = null;

    private _seedItem:Item = null;
    private _togEventNode:cc.Node = null;

    onLoad(){
        this._seedSpr = this.node.getChildByName("Spr_Seed").getComponent(cc.Sprite);
        this._tog = this.getComponent(cc.Toggle);

        this._tog.node.on('toggle',() =>{this._togEventNode.emit("ToggleOn",this._seedItem)});
    }

    public setSeed(seedItem:Item,togEventNode:cc.Node){
        this._seedItem = seedItem;
        this._togEventNode = togEventNode;

        var seedSprName:string = GetJsonData.instance.getPlantJson()[seedItem.id].stageSprite1;
        SpritePool.setSprite(ResPath.plantSpr + seedSprName,this._seedSpr);
    }

    public getSeed():Item{
        return this._seedItem;
    }
}
