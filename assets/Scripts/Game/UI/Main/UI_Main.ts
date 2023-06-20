import SaveManager from "../../Save/SaveManager";
import PatienceBar from "./PatienceBar";

const {ccclass, property} = cc._decorator;

/*
	20230529
*/
/**  */
@ccclass
export default class UI_Main extends cc.Component {
	/** 屏幕下方的按钮组 */
    private _downBtns:cc.Node = null;

    /** 耐心条 */
    // @property(cc.ProgressBar)
    // private patienceBar:cc.ProgressBar = null;
    public patienceBar:PatienceBar = null;

    onLoad(){
        this._downBtns = this.node.getChildByName("Down");
        this.patienceBar = this.getComponentInChildren(PatienceBar);
    }

    public showDownBtns(isShow:boolean){
        this._downBtns.active = isShow;        
    }

    // /** 显示即将消耗的耐心值 */
    // public showAboutToConsumePatience(consumeValue:number){
    //     this._patienceBar.showAboutToConsumePatience(consumeValue);
    // }

    // /** 刷新耐心值 */
    // public refreshPatience(patienceValue:number){
    //     this._patienceBar.refreshPatience(patienceValue);
    // }
}
