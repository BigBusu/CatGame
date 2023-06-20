import SpritePool from "../../Common/SpritePool";
import SaveManager from "../../Save/SaveManager";
import SaveData from "../../Save/SaveData";
import UIAnim from "../../Common/UI/UIAnim";
import PopoverManager from "../Popover/PopoverManager";
import RandomValue from "../../Utils/RandomValue";

const {ccclass, property} = cc._decorator;

/*
	20230508
*/
/** 登录奖励
 * 累计奖励如果当时没有领取，并不会保存，下一次登录时，之前没有领取的累计奖励不会再出现
 */
@ccclass
export default class SignInAward extends cc.Component {

    private _dayLab:cc.Label = null;
    private _nameLab:cc.Label = null;

    private _weatherSpr:cc.Sprite = null;
    /** 奖品的图片 */
    @property(cc.Sprite)
    private awardSpr:cc.Sprite = null;
    /** 累计奖励按钮 */
    private _cumulativeAwardBtnNodes:cc.Node[] = [];

    /** 测试用手动签到 */
    @property(cc.Node)
    private manualSignInBtn:cc.Node = null;

    private _sD:SaveData = null;

    protected onLoad(): void {
        var dayPage:cc.Node = this.node.getChildByName("Spr_Background").getChildByName("Spr_Day");
        var labels:cc.Node = dayPage.getChildByName("Labels");
        this._dayLab = labels.getChildByName("Lab_Day").getComponent(cc.Label);
        this._nameLab = labels.getChildByName("Lab_Name").getComponent(cc.Label);

        this._weatherSpr = dayPage.getChildByName("Spr_Weather").getComponent(cc.Sprite);

        // ~累计奖励
        var cumulativeAwardBtns:cc.Button[] = this.node.getChildByName(
            "Spr_Background").getChildByName("Spr_CumulativeAward").getComponentsInChildren(cc.Button);

        var cumulativeAwardBtnCount = cumulativeAwardBtns.length;
        this._cumulativeAwardBtnNodes = Array<cc.Node>(cumulativeAwardBtnCount);

        for (let i = 0; i < cumulativeAwardBtnCount; i++) {
            var btnNode:cc.Node = cumulativeAwardBtns[i].node;
            this._cumulativeAwardBtnNodes[i] = btnNode;
        }
        // end~

        // 点击奖励物品的外框
        var awardIconBox:cc.Node = this.awardSpr.node.parent.parent;
        awardIconBox.on(cc.Node.EventType.TOUCH_START,() =>{
            cc.log(1111);
            PopoverManager.instance.explan.showPopover(this.awardSpr.spriteFrame);
        });

        //测试签到
        this.manualSignInBtn.on(cc.Node.EventType.TOUCH_START,() =>{
            this.addSignInDayCount();
        });
    }
    
    protected start(): void {
        this._sD = SaveManager.instance.getSaveData();

        var savDate:number[] = this._sD.date;
        
        var date:Date = new Date();
        var curYear:number = date.getFullYear();
        var curMonth:number = date.getMonth();
        var curDay:number = date.getDate();
        var curWeekDay:number = date.getDay();
        var curDate:number[] = [curYear,curMonth,curDay,curWeekDay];

        if(savDate != null){            
            for (let i = 0; i < 4; i++) {
                if(curDate[i] != savDate[i]){

                    // 只要有一个日期被改变，则可以签到
                    this._sD.date = curDate;
                    this.addSignInDayCount();
                    break;
                };
            }
        }else{
            this._sD.date = curDate;
            this.addSignInDayCount();
        }
        
        // ~获取签到奖励
        //猫咪-5％概率   作物-25％   解物-25％   道具-20％   家具-10％   秘传鱼干5个-15％
        var randomValue:number = RandomValue.randomValueFloat(0,1);
        var ratios: number[] = new Array<number>(0.05, 0.25, 0.25, 0.2, 0.1, 0.15);
        var targetRatio: number = 0;// 目标比例

        for (let i = 0, max = ratios.length; i < max; i++) {
            targetRatio += ratios[i];

            if (randomValue <= targetRatio) {
                switch (i) {
                    case 0:
                        SpritePool.setSprite("Sprite/SignIn/1-火烈喵-1", this.awardSpr);
                        break;
                    case 1:
                        SpritePool.setSprite("Sprite/SignIn/1-普通解物-1", this.awardSpr);
                        break;
                    case 2:
                        SpritePool.setSprite("Sprite/SignIn/1-普通解物-1", this.awardSpr);
                        break;
                    case 3:
                        SpritePool.setSprite("Sprite/SignIn/1-粘液网", this.awardSpr);
                        break;
                    case 4:
                        SpritePool.setSprite("Sprite/SignIn/1-普通解物-1", this.awardSpr);
                        break;
                    case 5:
                        SpritePool.setSprite("Sprite/SignIn/9-密传鱼干-图标", this.awardSpr);
                        break;
                }
            }         
        }
        //end~
    }

    /** 注册累计奖励点击事件
     * @param index 按钮的索引
     */
    public registerCumulativeAwardBtn(index:number){
        var btnNode:cc.Node = this._cumulativeAwardBtnNodes[index];

        btnNode.once(cc.Node.EventType.TOUCH_START,() =>this.getCumulativeAward(index));
        
        var btnSprite:cc.Sprite = btnNode.getChildByName("Background").getComponent(cc.Sprite);
        SpritePool.setSprite("Sprite/SignIn/10-累积奖励-可领取",btnSprite);

        btnNode.getChildByName("Spr_Light").active = true;// 发光
    }

     /** 获取累计奖励
     * @param index 按钮的索引
     */
    private getCumulativeAward(index:number){
        // 领取奖励

        // ~按钮
        var btnNode:cc.Node = this._cumulativeAwardBtnNodes[index];

        var btnSprite:cc.Sprite = btnNode.getChildByName("Background").getComponent(cc.Sprite);
        SpritePool.setSprite("Sprite/SignIn/9-累积奖励-已领取",btnSprite);

        btnNode.getChildByName("Spr_Light").active = false;
        // end~

        // ~弹窗
        PopoverManager.instance.item.openPage(true);
        // end~
    }

    /** 增加登录天数 */
    private addSignInDayCount(){
        this._sD.signInDayCount ++;
        this._sD.signInCumulativeAward++;

        // 如果累加奖励达到标准，则可获得
        var awardDayCount = this._sD.signInCumulativeAward;

        if (awardDayCount == 3) {
            this.registerCumulativeAwardBtn(0);
        } else if (awardDayCount == 5) {
            this.registerCumulativeAwardBtn(1);
        } else if (awardDayCount == 7) {
            this.registerCumulativeAwardBtn(2);
        } else if (awardDayCount == 8) {
            this._sD.signInCumulativeAward = 1;
        }

        this._dayLab.string = this._sD.signInDayCount.toString(); 
    }

    public openPage(isOpen:boolean){
        this.node.active = isOpen;

        UIAnim.magnifyWindowQ(this.node);        
    }
}
