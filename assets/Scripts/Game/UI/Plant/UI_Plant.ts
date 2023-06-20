import GetJsonData from "../../JsonData/GetJsonData/GetJsonData";
import { MapPlantState } from "../../Plant/MapPlantState";
import Map_Plant from "../../Plant/Map_Plant";
import SaveData from "../../Save/SaveData";
import SaveManager from "../../Save/SaveManager";
import MapManager from "../Map/MapManager";
import PopoverManager from "../Popover/PopoverManager";
import UIManager from "../UIManager";
import SeedPage from "./Seed/SeedPage";

const {ccclass, property} = cc._decorator;

/*
	
*/
@ccclass
export default class UI_Plant extends cc.Component {
	// private _cultivationBtn:cc.Node = null;
    // private _seedBtn:cc.Node = null;
    // private _wateringBtn:cc.Node = null;
    // @property(Map_Plant)
    private mapPlant:Map_Plant = null;
    private _seedPage:SeedPage = null;

    private _mapPlantState:MapPlantState = MapPlantState.None;
    /** 开垦消耗耐心 */
    private _cutivationCostPatience:number = 0;

    private _saveData:SaveData = null;

    onLoad(){
        this._seedPage = this.getComponentInChildren(SeedPage);

        var btnParent:cc.Node = this.node.getChildByName("Buttons");
        var cultivationBtn:cc.Node = btnParent.getChildByName("Spr_Cultivation");
        var seedBtn:cc.Node = btnParent.getChildByName("Spr_Seed");
        var wateringBtn:cc.Node = btnParent.getChildByName("Spr_Watering");

        cultivationBtn.on(cc.Node.EventType.TOUCH_START,() =>{this.clickCultivationBtn()});
        seedBtn.on(cc.Node.EventType.TOUCH_START,() =>{this.clickSeedBtn()});
        wateringBtn.on(cc.Node.EventType.TOUCH_START,() =>{this.clickWatringBtn()});

        
    }

    protected start(): void {
        this._saveData = SaveManager.instance.saveData;

        this.mapPlant = MapManager.instance.plant;
        this.mapPlant.setUIPlant(this);

        this._cutivationCostPatience = GetJsonData.instance.getGrowJson()[0].cultivationCostPatience;
    }

    private clickCultivationBtn(){
        // 如果正在播种或浇水，关闭它们
        switch (this._mapPlantState) {
            case MapPlantState.None:
                if (this._saveData.patience + this._cutivationCostPatience >= 0)
                    this.enterCutivation();
                else {
                    PopoverManager.instance.bottom.showPopover("耐心值不足");
                }               
                break;
            case MapPlantState.Cultivation:
                this.exitCutivation();
                break;
            case MapPlantState.Seed:

                break;
            case MapPlantState.Watering:

                break;
        }
    }

    private clickSeedBtn(){
        // 这里没有进入种子状态，所以关闭种子页面时不需要退出状态

        switch (this._mapPlantState) {
            case MapPlantState.None:                     
                break;
            case MapPlantState.Cultivation:
                this.exitCutivation();
                break;
            case MapPlantState.Seed:                
                break;
            case MapPlantState.Watering:
                break;
        }

        this._seedPage.openPage(null);
    }

    private clickWatringBtn() {
        switch (this._mapPlantState) {
            case MapPlantState.None:
                // 需要先判断今日浇水次数是否足够，如果不够~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                this.enterWatering();
                break;
            case MapPlantState.Cultivation:
                this.exitCutivation();
                break;
            case MapPlantState.Seed:
                break;
            case MapPlantState.Watering:
                this.exitWatering();
                break;
        }        
    }

    public setPlantState(plantState:MapPlantState){
        this._mapPlantState = plantState;
    }

    public enterCutivation(){
        this._mapPlantState = MapPlantState.Cultivation;

        // 是否还能够添加种植区域
        // 开启所有可种植区域的圆形区域动画
        this.mapPlant.showCultivationCircle();
        UIManager.instance.main.patienceBar.showAboutToConsumePatience(this._cutivationCostPatience);
    }

    public exitCutivation(){
        this._mapPlantState = MapPlantState.None;
        this.mapPlant.hideCultivationCircle();
        UIManager.instance.main.patienceBar.hideAboutToConsumePatience();
    }

    public openSeedPage(selectedPit:cc.Node){
        this._seedPage.openPage(selectedPit);
    }

    public enterWatering(){
        this._mapPlantState = MapPlantState.Watering;

        this.mapPlant.enterWateringState();
    }

    public exitWatering(){
        this._mapPlantState = MapPlantState.None;

        this.mapPlant.exitWateringState();
    }
}
