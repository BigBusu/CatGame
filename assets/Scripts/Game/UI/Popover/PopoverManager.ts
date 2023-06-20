import BottomPopover from "./BottomPopover";
import ConfirmPopover from "./ConfirmPopover";
import ExplanatoryPopover from "./Explan/ExplanatoryPopover";
import GetItemPopover from "./GetItemPopover";

const {ccclass, property} = cc._decorator;

/*
	20230512
*/
/** 弹出窗管理 */
@ccclass
export default class PopoverManager extends cc.Component {
	public static instance:PopoverManager = null;

    public explan:ExplanatoryPopover = null;
    public item:GetItemPopover = null;
    public confirm:ConfirmPopover = null;
    public bottom:BottomPopover = null;

    onLoad(){
        PopoverManager.instance = this;

        this.explan = this.getComponentInChildren(ExplanatoryPopover);
        this.item = this.getComponentInChildren(GetItemPopover);
        this.confirm = this.getComponentInChildren(ConfirmPopover);
        this.bottom = this.getComponentInChildren(BottomPopover);
    }
}
