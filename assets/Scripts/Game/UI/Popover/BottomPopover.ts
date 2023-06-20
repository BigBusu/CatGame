import UIAnim from "../../Common/UI/UIAnim";


const {ccclass, property} = cc._decorator;

/*
	20230614
*/
/** 下方弹窗 */
@ccclass
export default class BottomPopover extends cc.Component {
	private _box:cc.Node = null;
    private _label:cc.Label = null;

    private _isCountDown:boolean = false;
    private _curTime:number = 0;
    private _showTime:number = 2;

    onLoad(){
        this._box = this.node.getComponentInChildren(cc.Sprite).node;        
        this._label = this._box.getComponentInChildren(cc.Label);
    }

    protected update(dt: number): void {
        if(this._isCountDown){
            this._curTime -= dt;

            if(this._curTime <= 0){
                this._isCountDown = false;
                this.hidePopover();
            }
        }
    }

    public showPopover(info:string){
        this.node.active = true;
        UIAnim.magnifyWindowQ(this._box);

        this._label.string = info;

        // 开始计时，一定时间后关闭弹窗
        this._isCountDown = true;
        this._curTime = this._showTime;
    }

    public hidePopover(){
        this.node.once("MinifyEnd", () => { this.node.active = false; });
        UIAnim.minifyWindow2(this._box, this.node);
    }
}
