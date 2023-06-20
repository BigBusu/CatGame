const {ccclass, property} = cc._decorator;

/*
	20230619
*/
/** 浇水动画事件 */
@ccclass
export default class WateringAnimEvent extends cc.Component {
    /** 通知对象  */
    @property(cc.Node)
    private notifyObject: cc.Node = null;

    private wateringEnd() {
        this.notifyObject.emit("WateringEnd");
    }
}
