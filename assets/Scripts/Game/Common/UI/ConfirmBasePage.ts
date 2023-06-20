import UIBasePage from "./UIBasePage";

const {ccclass, property} = cc._decorator;

/*
	20230426
*/
/** 确认基础页 */
@ccclass
export default abstract class ConfirmBasePage extends UIBasePage {
	protected infoLab:cc.Label = null;

	protected onLoad(): void {
		let background:cc.Node = this.node.getChildByName("Spr_Background");

		this.infoLab = background.getChildByName("Spr_Info").getComponentInChildren(cc.Label);

		let yesBtn:cc.Node = background.getChildByName("Btn_Yes");
		let noBtn:cc.Node = background.getChildByName("Btn_No");

		yesBtn.on(cc.Node.EventType.TOUCH_START,() => this.clickYesBtn());
		noBtn.on(cc.Node.EventType.TOUCH_START,() => this.clickNoBtn());
	}

	protected abstract clickYesBtn();

	protected abstract clickNoBtn();
}
