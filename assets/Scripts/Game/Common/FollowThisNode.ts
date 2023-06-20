const {ccclass, property} = cc._decorator;

/*
	20230505
*/
/** 跟随该对象 */
@ccclass
export default class FollowThisNode extends cc.Component {
	@property(cc.Node)
    /** 选择追随者 */
    public selectedNode:cc.Node = null;

    update(dt:number){
        this.selectedNode.position = this.node.position;
    }
}
