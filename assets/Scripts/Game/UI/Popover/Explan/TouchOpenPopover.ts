import PopoverManager from "../PopoverManager";

const {ccclass, property} = cc._decorator;

/*
	20230425
*/
/** 点击打开弹窗 */
@ccclass
export default class TouchOpenPopover extends cc.Component {
    private _icon:cc.SpriteFrame = null;

	protected onLoad(): void {
        this._icon = this.node.getComponent(cc.Sprite).spriteFrame;

        this.node.on(cc.Node.EventType.TOUCH_START,() =>this.openPopover());
    }

    private openPopover(){
        PopoverManager.instance.explan.showPopover(this._icon);
    }
}
