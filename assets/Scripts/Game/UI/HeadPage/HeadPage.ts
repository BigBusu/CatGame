import UIBasePage from "../../Common/UI/UIBasePage";

const {ccclass, property} = cc._decorator;

/*
	20230425
*/
/** 头像页 */
@ccclass
export default class HeadPage extends UIBasePage {
	
    protected onLoad(): void {
        // let blackBtn:cc.Node = this.node.getChildByName("Black");
        // blackBtn.on(cc.Node.EventType.TOUCH_START,() =>this.openPage(false));
    }    
}
