import UIBasePage from "../../Common/UI/UIBasePage";
import SignInAward from "./SignInAward";
import SaveData from "../../Save/SaveData";
import SaveGame from "../../Save/SaveGame";
import SaveManager from "../../Save/SaveManager";
import UIAnim from "../../Common/UI/UIAnim";

const {ccclass, property} = cc._decorator;

/*
	20230508
*/
/** 登录页面 */
@ccclass
export default class SignInPage extends UIBasePage {
	
    private _signInBtnNode:cc.Node = null;

    private _signInAward:SignInAward = null;

    onLoad(){
        this._signInAward = this.getComponentInChildren(SignInAward);

        this._signInBtnNode = this.node.getChildByName("Btn_SignIn");
        this._signInBtnNode.on(cc.Node.EventType.TOUCH_START,() => this.signIn());

        // // 测试储存数据
        // if (SaveGame.loadData("a") == null) {
        //     cc.log("储存数据");
        //     var saveData: SaveData = new SaveData();
        //     saveData.date = new Array<number>(1, 2);
        //     SaveGame.saveData("a",saveData);
        // }else{
        //     cc.log(SaveGame.loadData("a").date);
        // }
    }

    protected onEnable(): void {
        if(this._signInAward.node.active)
            this._signInAward.openPage(false);
    }

    private signIn(){
        this._signInAward.openPage(true);

        UIAnim.minifyAndDownButton(this._signInBtnNode);
    }
}
