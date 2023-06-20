const {ccclass, property} = cc._decorator;

/*
	20230425
*/
/** 主页面头像框 */
@ccclass
export default class MainHaedBox extends cc.Component {
	private _headSpr:cc.Sprite = null;
    private _progressPro:cc.ProgressBar = null;
    private _dayLab:cc.Label = null;
    private _weatherSpr:cc.Sprite = null;

    @property(cc.Node)
    private headPage:cc.Node = null;

    onLoad(){
        let headCircle = this.node.getChildByName("Spr_Box");
        headCircle.on(cc.Node.EventType.TOUCH_START,() =>this.touchHead());

        this._headSpr = headCircle.getChildByName("Spr_Head").getComponent(cc.Sprite);
        this._progressPro = this.getComponentInChildren(cc.ProgressBar);
        
        let weatherParent:cc.Node = this.node.getChildByName("Spr_WeatherBox");
        this._dayLab = weatherParent.getComponentInChildren(cc.Label);
        this._weatherSpr = weatherParent.getChildByName("Spr_Weather").getComponent(cc.Sprite);
    }

    private touchHead(){
        this.headPage.active = true;
    }
}
