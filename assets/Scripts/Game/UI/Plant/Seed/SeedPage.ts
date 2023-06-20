import UIAnim from "../../../Common/UI/UIAnim";
import Item from "../../../Item/Item";
import { ItemType } from "../../../Item/ItemType";
import GetJsonData from "../../../JsonData/GetJsonData/GetJsonData";
import UISeedPool from "../../../Pool/UISeedPool";
import SaveManager from "../../../Save/SaveManager";
import SeedBox from "./SeedBox";

const {ccclass, property} = cc._decorator;

/*
	20230616
*/
/** 种子页 */
@ccclass
export default class SeedPage extends cc.Component {
	/** 种子目录 */
    @property(cc.Node)
    private seedContent:cc.Node = null;

    private _background:cc.Node = null;
    /** 种子数量文本 */
    private _seedCountLab:cc.Label = null;

    private _seedNameLab:cc.Label = null;
    private _seedInfoLab:cc.Label = null;
    private _plantingBtn:cc.Node = null;

    /** 种子组 */
    private _seeds:SeedBox[] = [];
    private _seedTogs:cc.Toggle[] = [];

    /** 目录的行高 */
    private _contentRowHeight = 225;
    /** 目录的一行数量 */
    private _contentRowCount = 4;
    /** 选中的种子 */
    private _selectedSeed:Item = null;

    /** 选中的坑
     * 用来触发种种子事件
     */
    private _selectedPit:cc.Node = null;

    onLoad(){
        this.initClass();
    }

    protected onEnable(): void {
        //this.seedContent.height = this._contentOriginHeight;
        this.showSeeds();
    }

    protected onDisable(): void {
        // 回收所有种子
        for (let i = 0,max = this._seeds.length; i < max; i++) {
            UISeedPool.recycleSeed(this._seeds.pop());            
        }

        this.seedContent.height = 0;
    }

    private initClass(){
        if(this._seedCountLab) return;

        this._background = this.node.getChildByName("Spr_Background");

        this._seedCountLab = this._background.getChildByName("Spr_Count").getComponentInChildren(cc.Label);

        var infoParent:cc.Node = this._background.getChildByName("Spr_Info");
        this._seedNameLab = infoParent.getChildByName("Lab_SeedName").getComponent(cc.Label);
        this._seedInfoLab = infoParent.getChildByName("Lab_SeedInfo").getComponent(cc.Label);
        this._plantingBtn = infoParent.getChildByName("Btn_Enter");

        this._plantingBtn.on(cc.Node.EventType.TOUCH_START,() =>{this.planting()});
    
        this.node.on("GetResSuccess",() => {this.createSeeds()});
        this.node.on("ToggleOn",(item:Item) =>{this.showSeedInfo(item)});

        var blackBtn:cc.Node = this.node.getChildByName("Black");
        blackBtn.on(cc.Node.EventType.TOUCH_START,() =>{this.closePage()});
    }

    public showSeeds(){
        if(UISeedPool.havePrefab())
            this.createSeeds();
        else
            UISeedPool.initPrefab(this.node);
    }

    private createSeeds(){
        var items:Item[] = SaveManager.instance.saveData.items;

        for (let i = 0, max = items.length; i < max; i++) {
            if (items[i].itemType == ItemType.Seed) {
                var seed:SeedBox = UISeedPool.getSeed();                
                this._seeds.push(seed);

                seed.node.setParent(this.seedContent);
                seed.setSeed(items[i],this.node);

                // 一排四个种子，每增加4个种子，目录拉长
                if(this._seeds.length % this._contentRowCount == 1){
                    this.seedContent.height += this._contentRowHeight;
                }
            }
        }

        if(this._seeds.length > 0){
            // 默认显示第一个种子
            this._seeds[0].getComponent(cc.Toggle).check();
            //this.showSeedInfo(this._seeds[0].getSeed());
            this._seeds[0].node.emit('toggle');
        }else{
            this._seedCountLab.string = "-";
            this._seedNameLab.string = "-";
            this._seedInfoLab.string = "-";
        }
    }

    private planting(){
        if(!this._selectedPit) cc.error("没有坑");

        // 种子数量减少
        SaveManager.instance.changeItemCount(this._selectedSeed,-1);

        this._selectedPit.emit("Planting",this._selectedSeed.id);
        this.closePage();
    }

    public showSeedInfo(item:Item){
        if(item != null){
            this._selectedSeed = item;

            this._seedCountLab.string = "持有：" + item.count;

            var plantJson = GetJsonData.instance.getPlantJson()[item.id];
            this._seedNameLab.string = plantJson.name + "种子";
            this._seedInfoLab.string = "seedInfo";
        }
    }

    public openPage(selectedPit:cc.Node){
        this.initClass();

        this._selectedPit = selectedPit;

        this._plantingBtn.active = selectedPit != null;
        this.node.active = true;

        //UIAnim.magnifyWindowQ(this._background);
    }

    public closePage(){
        if(this._selectedPit){
            this._selectedPit.off("Planting");
            this._selectedPit = null;
        }

        this.node.active = false;
        // UIAnim.minifyWindow2(this._background,this.node);
        // this.node.on("MinifyEnd",() =>{this.node.active = false;});
    }
}
