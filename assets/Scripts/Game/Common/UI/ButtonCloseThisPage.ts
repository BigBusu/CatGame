const {ccclass, property} = cc._decorator;

/*
	20230425
*/
/** 按钮关闭该页面 */
@ccclass
export default class ButtonCloseThisPage extends cc.Component {
	@property(cc.Node)
    private btnNode:cc.Node = null;

    onLoad(){
        this.btnNode.on(cc.Node.EventType.TOUCH_START,()=>this.closePage());
    }

    private closePage(){
        this.node.active = false;
    }
}
