const {ccclass, property} = cc._decorator;

/*
	20230425
*/
/** 主页面下方按钮 */
@ccclass
export default class MainDownButtons extends cc.Component {
	private _plantBtn:cc.Node = null;
    private _dispatchBtn:cc.Node  = null;
    private _exploreBtn:cc.Node = null;
    private _bagBtn:cc.Node  = null;
    
    protected onLoad(): void {
        this._plantBtn = this.node.getChildByName("Spr_Plant");
        this._dispatchBtn = this.node.getChildByName("Spr_Dispatch");
        this._exploreBtn = this.node.getChildByName("Spr_Explore");
        this._bagBtn = this.node.getChildByName("Spr_Bag");

        this._plantBtn.on(cc.Node.EventType.TOUCH_START,() =>this.touchPlantBtn());
        this._dispatchBtn.on(cc.Node.EventType.TOUCH_START,() =>this.touchDispatchBtn());
        this._exploreBtn.on(cc.Node.EventType.TOUCH_START,() =>this.touchExploreBtn());
        this._bagBtn.on(cc.Node.EventType.TOUCH_START,() =>this.touchBagBtn());
    }

    private touchPlantBtn(){
        cc.log("点击种植按钮");
    }

    private touchDispatchBtn(){
        cc.log("点击派遣按钮");
    }

    private touchExploreBtn(){
        cc.log("点击探索按钮");
    }

    private touchBagBtn(){
        cc.log("点击背包按钮");
    }
}
