const {ccclass, property} = cc._decorator;

/*
	20230602
*/
/** 开垦的动画事件 */
@ccclass
export default class CultivationAnimEvent extends cc.Component {
    /** 通知对象  */
    @property(cc.Node)
    private notifyObject:cc.Node = null;

    private digSoilEnd(){
        this.notifyObject.emit("DigSoilEnd");
    }

    private cultivationSuccessEnd(){
        this.notifyObject.emit("CultivationSuccessEnd");
    }
}
