import UIAnim from "../../Common/UI/UIAnim";

const {ccclass, property} = cc._decorator;

/*
	20230602
*/
/** 确认弹出框 */
@ccclass
export default class ConfirmPopover extends cc.Component {
    private _backgroundNode:cc.Node = null;
	private _infoLab:cc.Label = null;
    private _yesBtn:cc.Node = null;
    private _noBtn:cc.Node = null;

    onLoad(){
        this._backgroundNode = this.node.getChildByName("Spr_Background");
        this._infoLab = this._backgroundNode.getChildByName("Spr_Info").getComponentInChildren(cc.Label);
        this._yesBtn = this._backgroundNode.getChildByName("Btn_Yes");
        this._noBtn = this._backgroundNode.getChildByName("Btn_No");

        this._yesBtn.on(cc.Node.EventType.TOUCH_START,() =>{this.yesBtnDown()});
        this._noBtn.on(cc.Node.EventType.TOUCH_START,() =>{this.noBtnDown()});
    }

    public setInfo(info:string){
        this._infoLab.string = info;
    }

    private yesBtnDown(){
        this.node.emit("YesBtnDown");
        this.showPage(false);
    }

    private noBtnDown(){
        this.node.emit("NoBtnDown");
        this.showPage(false);
    }

    public showPage(isShow: boolean) {
        if (isShow) {
            this.node.active = true;
            UIAnim.magnifyWindowQ(this._backgroundNode);
        } else {
            this.node.once("MinifyEnd", () => { this.node.active = false; });
            UIAnim.minifyWindow2(this._backgroundNode, this.node);
        }
    }
}
