import SaveData from "../../Save/SaveData";
import SaveManager from "../../Save/SaveManager";

const {ccclass, property} = cc._decorator;

/*
	20230613
*/
/** 耐心条 */
@ccclass
export default class PatienceBar extends cc.Component {
	
    private _patienceBar:cc.ProgressBar = null;
    /** 即将减少的耐心条 */
    private _aboutToConsume:cc.Node = null;

    /** 条的x值 */
    private _barX:number = 0;

    private _aboutToConsumeTween:cc.Tween = null;

    onLoad(){
        this._patienceBar = this.getComponent(cc.ProgressBar);
        this._aboutToConsume = this.node.getChildByName("Spr_AboutToConsume");

        this._barX = this.node.getChildByName("bar").x;
    }

    public refreshPatience(patienceValue:number,maxPatience:number){
        this._patienceBar.progress = patienceValue / maxPatience;
    }

    /** 显示即将消耗的耐心条 */
    public showAboutToConsumePatience(consumeValue:number){
        this._aboutToConsume.active = true;

        var saveData:SaveData = SaveManager.instance.saveData;
        var maxPatience:number = saveData.maxPatience;
        var curPatience:number = saveData.patience;

        var afterPatience:number = curPatience + consumeValue;// 修改后的耐心值
        var overflowValue:number = 0;// 溢出值

        // 耐心值不得超出范围
        if(afterPatience > maxPatience) {
            overflowValue = afterPatience - maxPatience;
            afterPatience = maxPatience;
        }
        else if(afterPatience < 0) {
            overflowValue = afterPatience;
            afterPatience = 0;
        }

        consumeValue += overflowValue;

        var consumRatio:number = consumeValue / maxPatience;
        var consumeSprLength:number = consumRatio * this._patienceBar.totalLength;// 减少条的长度

        var consumeSprX:number = this._patienceBar.progress*this._patienceBar.totalLength + this._barX;// 减少条的位置

        cc.log("位置：" + consumeSprX+"~~长度:"+consumeSprLength);

        if(consumeSprLength >=0){
            this._aboutToConsume.width = consumeSprLength;
            this._aboutToConsume.x = consumeSprX;  
        }else{
            this._aboutToConsume.width = -consumeSprLength;
            this._aboutToConsume.x = consumeSprX + consumeSprLength;  
        }
      

        if(this._aboutToConsumeTween == null){
            this._aboutToConsumeTween = cc.tween(this._aboutToConsume)
            .to(0.5,{color:cc.Color.GREEN})
            .to(0.5,{color:cc.Color.RED})
            .to(0.5,{color:cc.Color.WHITE})
            .union()
            .repeatForever()
            .start();
        }
        else{
            this._aboutToConsumeTween.start();
        }
    }

    /** 隐藏即将消耗的耐心条 */
    public hideAboutToConsumePatience(){
        this._aboutToConsumeTween.stop();
        this._aboutToConsume.active = false;
    }
}
