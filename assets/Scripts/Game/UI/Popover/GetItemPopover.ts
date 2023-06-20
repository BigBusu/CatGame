import UIAnim from "../../Common/UI/UIAnim";

const { ccclass, property } = cc._decorator;

/*
    20230512
*/
/** 获取物品弹出框 */
@ccclass
export default class GetItemPopover extends cc.Component {
    private _background:cc.Node = null;
    private _itemNameLab: cc.Label = null;
    private _itemIconSpr: cc.Sprite = null;

    private _infoPage:cc.Node = null;
    private _titleInfoLab: cc.Label = null;
    private _infoLab: cc.Label = null;

    onLoad() {
        this._background = this.node.getChildByName("Spr_Background");

        this._itemNameLab = this._background.getChildByName("Spr_Name").getComponentInChildren(cc.Label);
        this._itemIconSpr = this._background.getChildByName("Spr_Icon").getComponent(cc.Sprite);

        this._infoPage = this.node.getChildByName("Spr_Info");
        this._titleInfoLab = this._infoPage.getChildByName("Lab_Title").getComponent(cc.Label);
        this._infoLab = this._infoPage.getChildByName("Lab_Info").getComponent(cc.Label);

        this.node.on("MinifyEnd",() =>{this.minifyEnd()});
    }

    public setItem(name:string){
        
    }

    public setItemIcon(btnIndex:number){
        this.openPage(true);

        //this._itemIconSpr.spriteFrame = icon;
        
    }

    private minifyEnd(){
        this.node.active = false;
    }

    public openPage(isOpen:boolean){
        if(isOpen){
            this.node.active = true;

            UIAnim.magnifyWindowQ(this._background);
            UIAnim.magnifyWindowQ(this._infoPage);
        }
        else{
            UIAnim.minifyWindow(this._background,true);
            UIAnim.minifyWindow(this._infoPage,false);
        }
    }
}
