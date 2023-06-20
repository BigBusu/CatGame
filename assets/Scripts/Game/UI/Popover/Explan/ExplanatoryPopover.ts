const {ccclass, property} = cc._decorator;

/*
	20230425
*/
/** 说明弹窗 */
@ccclass
export default class ExplanatoryPopover extends cc.Component {
    private _iconSpr:cc.Sprite = null;
    private _titleLab:cc.Label = null;
    private _infoLab:cc.Label = null;

    onLoad(){
        //if(this._popoverNode != null) return;

        let background:cc.Node = this.node.getChildByName("Spr_Background");
        this._iconSpr = background.getChildByName("Spr_IconBox")
            .getChildByName("Spr_Icon").getComponent(cc.Sprite);
        this._titleLab = background.getChildByName("Lab_Title").getComponent(cc.Label);
        this._infoLab = background.getChildByName("Lab_Info").getComponent(cc.Label);
    }

    public showPopover(icon:cc.SpriteFrame){
        //this.initClass();

        this.node.active = true;
        this._iconSpr.spriteFrame = icon;
    }
}
