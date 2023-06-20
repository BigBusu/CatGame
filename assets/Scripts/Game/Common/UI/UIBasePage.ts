const {ccclass, property} = cc._decorator;

/*
	20230425
*/
/** UI的基础页 */
@ccclass
export default class UIBasePage extends cc.Component {
	public openPage(isOpen:boolean){
        this.node.active = isOpen;
    }
}
