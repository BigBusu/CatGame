import MapManager from "./UI/Map/MapManager";
import UIManager from "./UI/UIManager";

const {ccclass, property} = cc._decorator;

/*
	20230531
*/
/** 游戏启动 */
@ccclass
export default class GameLaunch extends cc.Component {
	// @property(cc.Node)
	// public plantPage:cc.Node = null
	
	protected onLoad(): void {
    this.scheduleOnce(() =>{
		UIManager.instance.plant.node.active = true;
		MapManager.instance.plant.node.active = true;
	},1);
    }
}
