import SaveData from "../Save/SaveData";
import SaveManager from "../Save/SaveManager";
import { MapPlantState } from "./MapPlantState";
import PlantArea from "./PlantArea";
import { PlantAreaState } from "./PlantAreaState";
import PlantData from "./PlantData";
import UI_Plant from "../UI/Plant/UI_Plant";
import GetJsonData from "../JsonData/GetJsonData/GetJsonData";
import BottomPopover from "../UI/Popover/BottomPopover";
import PopoverManager from "../UI/Popover/PopoverManager";

const { ccclass, property } = cc._decorator;

/*
    20230529
*/
@ccclass
export default class Map_Plant extends cc.Component {
    /** 种植区域父级 */
    private _plantAreaParent: cc.Node = null;
    /** 开垦动画 */
    private _cultivationAnim:cc.Animation = null;
    private _uiPlant:UI_Plant = null;
    /** 浇水状态的黑色背景 */
    private _watringBlackBack:cc.Node = null;
    /** 浇水动画 */
    private _wateringAnim:cc.Animation = null;

    /** 所有种植区 */
    private _plantAreas: PlantArea[] = [];

    private _saveData: SaveData = null;
    //private _plantState:MapPlantState = MapPlantState.None;
    /** 当前正在开垦区域的索引 */
    private _curCultivationIndex:number = 0;
    /** 当前正在开垦的区域
     * 或者 正在浇水的区域
     */
    private _curCultivationArea:PlantArea = null;
    /** 开垦消耗耐心 */
    private _cutivationCostPatience:number = 0;
    /** 可以浇水的植物索引组 */
    private _canWateringPlantIndexs:number[] = [];

    onLoad() {
        this._plantAreaParent = this.node.getChildByName("Soil");
        this._cultivationAnim = this.node.getChildByName("CultivationAnim").getComponent(cc.Animation);

        this._watringBlackBack = this.node.getChildByName("Spr_Black");
        this._wateringAnim = this.node.getChildByName("WateringAnim").getComponent(cc.Animation);
        //cc.log("显示植物");
    }

    protected start(): void {
        var self = this;

        // 创建24块区域
        cc.resources.load("Prefabs/Plant/PlantArea", cc.Prefab, (error: Error, prefab: cc.Prefab) => {
            for (let i = 0; i < 24; i++) {
                var plantAreaNode: cc.Node = cc.instantiate(prefab);
                plantAreaNode.setParent(self._plantAreaParent);

                var area:PlantArea = plantAreaNode.getComponent(PlantArea);
                area.initClass(self,i);
                self._plantAreas.push(area);
            }

            self.showAllPlant();
        })

        this._saveData = SaveManager.instance.saveData;
        this._cutivationCostPatience = GetJsonData.instance.getGrowJson()[0].cultivationCostPatience;
    }

    private showAllPlant() {        
        // 读取存档中已有的植物
        var plantDatas: PlantData[] = this._saveData.plantDatas;

        if (plantDatas.length > 0) {
            for (let i = 0, max = plantDatas.length; i < max; i++) {
                var plantData: PlantData = plantDatas[i];
                var locationId = plantData.locationId;

                this._plantAreas[locationId].showPit(true);

                if (plantData.id > 0) {
                    this._plantAreas[locationId].setPlant(plantData);
                }
            }
        }
    }

    public setUIPlant(uiPlant:UI_Plant){
        this._uiPlant = uiPlant;
    }

    //#region 开垦
    /** 显示开垦圈 */
    public showCultivationCircle(){
        for (let i = 0,max = this._plantAreas.length; i < max; i++) {
            if(this._plantAreas[i].getAreaState() == PlantAreaState.None) {
                this._plantAreas[i].showPit(false);
                this._plantAreas[i].circleAreaAnim(true);
            }
        }
    }

    /** 开始开垦 */
    public startCultivation(plantArea:PlantArea,areaIndex:number){
        this.hideCultivationCircle();
        this._curCultivationIndex = areaIndex;
        this._curCultivationArea = plantArea;

        var worldPos:cc.Vec3 = this._plantAreaParent.convertToWorldSpaceAR(plantArea.node.position);
        var soilNodePos:cc.Vec3 = this.node.convertToNodeSpaceAR(worldPos);

        // 在开垦的区域上播放铲子动画，播放完毕后显示坑        
        this._cultivationAnim.node.setPosition(soilNodePos);
        this._cultivationAnim.play("DigSoil");
        this.node.once("DigSoilEnd",()=>{this.digSoilEnd()});
    }

    /** 隐藏开垦圈 */
    public hideCultivationCircle(){
        this._uiPlant.setPlantState(MapPlantState.None);

        for (let i = 0,max = this._plantAreas.length; i < max; i++) {
            if(this._plantAreas[i].getAreaState() == PlantAreaState.None) {
                this._plantAreas[i].circleAreaAnim(false);
                this._plantAreas[i].hidePitAndCircle();                
            }
        }
    }

    /** 开垦挖土结束 */
    private digSoilEnd() {
        this._curCultivationArea.showPit(true); 
        //this._curCultivationArea = null;                    
        PopoverManager.instance.bottom.showPopover("开垦成功");

        this._cultivationAnim.play("CultivationSuccess");
        this.node.once("CultivationSuccessEnd", () => { this.cultivationSuccessEnd() });

        // 加入存档
        var plantData: PlantData = new PlantData();
        plantData.locationId = this._curCultivationIndex;
        this._saveData.plantDatas.push(plantData);
    }

    /** 开垦成功 */
    private cultivationSuccessEnd() {
        // 消耗掉耐心
        SaveManager.instance.changePatienceValue(this._cutivationCostPatience);   
        
        // 如果耐心值还够开垦下一块土地，则不退出开垦状态
        // 否则退出开垦状态
        if( this._saveData.patience + this._cutivationCostPatience >=0){
            this._uiPlant.enterCutivation();
        } else{            
            PopoverManager.instance.bottom.showPopover("耐心值不足");
            this._uiPlant.exitCutivation();
        }
    }
    //#endregion

    //#region 浇水
    /** 进入浇水状态 */
    public enterWateringState(){
        this._watringBlackBack.active = true;
    
        for (let i = 0, max = this._plantAreas.length; i < max; i++) {
            if (this._plantAreas[i].enterWatering()) {
                this._canWateringPlantIndexs.push(i);
            }
        }
    }

    /** 退出浇水状态 */
    public exitWateringState(){
        this._watringBlackBack.active = false;

        for (let i = 0,max = this._canWateringPlantIndexs.length; i < max; i++) {
            this._plantAreas[this._canWateringPlantIndexs.pop()].exitWatering();            
        }
    }

    /** 开始浇水 */
    public startWatering(plantArea:PlantArea){
        cc.log("开始浇水");
        this._watringBlackBack.active = false;
        this._curCultivationArea = plantArea;

        var worldPos:cc.Vec3 = this._plantAreaParent.convertToWorldSpaceAR(plantArea.node.position);
        var soilNodePos:cc.Vec3 = this.node.convertToNodeSpaceAR(worldPos);

        // 在开垦的区域上播放铲子动画，播放完毕后显示坑        
        this._wateringAnim.node.setPosition(soilNodePos);
        this._wateringAnim.play("Watering");
        this.node.once("WateringEnd",()=>{this.wateringEnd()});
    }

    private wateringEnd(){
        this._curCultivationArea.wateringEnd();
        this._uiPlant.exitWatering();
        this.exitWateringState();
        //this._curCultivationArea = null; 
    }
    //#endregion
}
