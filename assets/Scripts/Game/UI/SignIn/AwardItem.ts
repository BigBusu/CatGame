const {ccclass, property} = cc._decorator;

/*
	20230510
*/
/** 奖励物品 */
@ccclass
export default class AwardItem extends cc.Component {
	
    @property(cc.Sprite)
    private iconSpr:cc.Sprite = null;

    onLoad(){

    }

    public setIcon(icon:cc.SpriteFrame){
        this.iconSpr.spriteFrame = icon;
    }
}
