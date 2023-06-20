import UI_Main from "./Main/UI_Main";
import UI_Plant from "./Plant/UI_Plant";

const {ccclass, property} = cc._decorator;

/*
	20230613
*/
/** ui管理 */
@ccclass
export default class UIManager extends cc.Component {
	public static instance:UIManager = null;

    public main:UI_Main = null;
    public plant:UI_Plant = null;

    onLoad(){
        UIManager.instance = this;

        this.main = this.getComponentInChildren(UI_Main);
        this.plant = this.getComponentInChildren(UI_Plant);
    }

    protected start(): void {
        // 测试种植，延迟0.5秒开启
        
    }
}
