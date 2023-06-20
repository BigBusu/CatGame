import Map_Plant from "../../Plant/Map_Plant";

const {ccclass, property} = cc._decorator;

/*
	20230614
*/
/** 地图管理 */
@ccclass
export default class MapManager extends cc.Component {
    public static instance:MapManager = null;

    public plant:Map_Plant = null;

    onLoad(){
        MapManager.instance = this;
        
        this.plant = this.getComponentInChildren(Map_Plant);
    }
}
