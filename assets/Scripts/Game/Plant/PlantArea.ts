import ResPath from "../Common/ResPath";
import SpritePool from "../Common/SpritePool";
import GetJsonData from "../JsonData/GetJsonData/GetJsonData";
import SaveManager from "../Save/SaveManager";
import UIManager from "../UI/UIManager";
import Map_Plant from "./Map_Plant";
import { PlantAreaState } from "./PlantAreaState";
import PlantData from "./PlantData";

const {ccclass, property} = cc._decorator;

/*
	20230529
*/
/** 植物区域 */
@ccclass
export default class PlantArea extends cc.Component {
    /** 坑 */
    private _pit: cc.Node = null;
    private _pitSprNode:cc.Node = null;
    /** 开垦选区 */
    private _circleArea: cc.Node = null;
    private _shovel:cc.Node = null;
    /** 开垦选区动画 */
    private _circleTween:cc.Tween = null;
    private _plantSpr:cc.Sprite = null;
    /** 提示框 */
    private _hintBox:cc.Node = null;
    private _hintSpr:cc.Sprite = null;

    private _mapPlant:Map_Plant = null;

    /** 区域的索引 */
    private _areaIndex:number = 0;

    private _plantData:PlantData = null;
    private _areaState:PlantAreaState = PlantAreaState.None;

    /** 生长动画 */
    private _growthTween:cc.Tween = null;

    onLoad(){
        this._pit = this.node.getChildByName("Pit");
        this._pitSprNode = this._pit.getChildByName("Spr_Pit");
        this._circleArea = this.node.getChildByName("Spr_Area");
        this._shovel = this.node.getChildByName("Spr_Shovel");
        this._plantSpr = this._pit.getChildByName("Spr_Plant").getComponent(cc.Sprite);
        this._hintBox = this.node.getChildByName("Spr_HintBox");
        this._hintSpr = this._hintBox.getChildByName("Spr_Hint").getComponent(cc.Sprite);        


        //this.node.on("CultivationSoil",() =>{});
    }

    public initClass(mapPlant:Map_Plant,areaIndex:number){
        this._mapPlant = mapPlant;
        this._areaIndex = areaIndex;
    }

    /** 开垦（圆形）区域的动画 */
    public circleAreaAnim(isPlay:boolean){
        if(isPlay){
            this._shovel.active = true;

            if(this._circleTween == null){
                this._circleTween = cc.tween(this._circleArea)
                .to(1, { opacity: 75 })
                .to(1, { opacity: 255 })
                .union()
                .repeatForever()
                .start();
            }
            else{
                this._circleTween.start();
            }

            // 需不需要找个机会将已经开垦好的土地取消该事件注册？（每次读取游戏中的已开垦土地不需要再次开垦）
            this._circleArea.once(cc.Node.EventType.TOUCH_START,() =>{this.cultivateSoil()});
        }else{
            this._shovel.active = false;
            this._circleTween.stop();

            this._circleArea.off(cc.Node.EventType.TOUCH_START);
        }
    }

    /** 显示坑 */
    public showPit(isShow: boolean) {
        this._pit.active = isShow;
        this._circleArea.active = !isShow;

        if(isShow){
            this.switchSoilState(PlantAreaState.Pit);   
        }
    }

    /** 隐藏坑和圆形区域 */
    public hidePitAndCircle(){
        this._pit.active = false;
        this._circleArea.active = false;
    }

    public showPlant(isShow:boolean){
        this._plantSpr.node.active = isShow;
    }

    public setPlant(plantData:PlantData){        
        this._plantData = plantData;  
        
        if(plantData.id >0){      
            this.switchSoilState(PlantAreaState.Plant);      
            //this._areaState = PlantAreaState.Plant;
            this.showPlant(true);

            // 根据植物的当前阶段赋值图片
            this.plantStage(plantData.growthStage);
            // switch (plantData.growthStage) {
            //     case 1:
            //     case 2:
            //         this.showHint(plantData.needWatering,true);

            //         var plantJson = GetJsonData.instance.getPlantJson()[plantData.id];

            //         this._wateringReduceTime = plantJson.wateringReduceTime;
            //         SpritePool.setSprite(ResPath.plantSpr + plantJson.stageSprite1, this._plantSpr);
            //         break;
            //     case 3:
            //     this.showHint(true,false);
    
            //     this._plantSpr.node.once(cc.Node.EventType.TOUCH_START,() =>{this.harvestCrop()});
            //         break;
            // }
            //this._plantSpr.spriteFrame = sf;
        }else{
            this.switchSoilState(PlantAreaState.Pit);
            //this._areaState = PlantAreaState.Pit;
        }

    }

    /** 植物的阶段 */
    private plantStage(growthStage:number){
        var plantJson = GetJsonData.instance.getPlantJson()[this._plantData.id];

        // 根据植物的当前阶段赋值图片
        switch (growthStage) {
            case 1:
                this.showHint(this._plantData.needWatering, true);
                SpritePool.setSprite(ResPath.plantSpr + plantJson.stageSprite1, this._plantSpr);
                break;
            case 2:
                this.showHint(this._plantData.needWatering, true);
                SpritePool.setSprite(ResPath.plantSpr + plantJson.stageSprite2, this._plantSpr);
                break;
            case 3:
                this.showHint(true, false);
                SpritePool.setSprite(ResPath.plantSpr + plantJson.stageSprite3, this._plantSpr);
                this._plantSpr.node.once(cc.Node.EventType.TOUCH_START, () => { this.harvestCrop() });
                break;
        }
    }

    public getPlantData():PlantData{
        return this._plantData
    }

    public getAreaState():PlantAreaState{
        return this._areaState;
    }

    /** 显示提示窗
     * @param isWatering:浇水或收获
     */
    public showHint(isShow:boolean,isWatering:boolean){
        this._hintBox.active = isShow;

        if(isShow){
            if (isWatering) {
                SpritePool.setSprite(ResPath.plantSpr + "8-浇水图标", this._hintSpr);
            } else {
                SpritePool.setSprite(ResPath.plantSpr + "7-收获图标", this._hintSpr);
            }
        }
    }

    /** 收获作物 */
    public harvestCrop(){
        cc.log("收获作物");

        this.switchSoilState(PlantAreaState.Pit);
    }

    /** 开垦土地 */
    private cultivateSoil(){
        this._areaState = PlantAreaState.Pit;
        this._mapPlant.startCultivation(this, this._areaIndex);

        this._shovel.active = false;//同时需要隐藏该圈上的铲子

        // 改为不需要确认，直接开垦
        // // 先要确认是否开垦
        // // 耐力足够才能确认~~~~~~~~~~~
        // var confirm:ConfirmPopover = PopoverManager.instance.confirm;

        // confirm.showPage(true);
        // confirm.setInfo("开垦区域需要5点耐心。确认开垦？");
        // confirm.node.once("YesBtnDown",() =>{
        //     this._areaState = PlantAreaState.Pit;
        //     this._mapPlant.startCultivation(this,this._areaIndex);

        //     this._shovel.active = false;//同时需要隐藏该圈上的铲子

        //     confirm.node.off("NoBtnDown");
        // });
        // confirm.node.once("NoBtnDown",() =>{
        //     this._mapPlant.hideCultivationCircle();
        //     confirm.node.off("YesBtnDown");
        // });
  
        //this.node.once("CultivationSuccess",() =>{});
    }

    public recycleArea(){
        // 如果没有收获作物则需要取消注册，下次加载时再次注册
        this._plantSpr.node.targetOff(this._plantSpr.node);
        //this.node.targetOff(this.node);
    }

    public switchSoilState(areaState:PlantAreaState){
        this._areaState = areaState;

        switch (this._areaState) {
            case PlantAreaState.Pit:
                this.showHint(false,false);
                this.showPlant(false);

                // 同时注册种植事件
                this._pitSprNode.on(cc.Node.EventType.TOUCH_END,() =>{
                    UIManager.instance.plant.openSeedPage(this.node);
                    this.node.once("Planting",(seedId:number) =>{this.planting(seedId)});
                });
                break;
            case PlantAreaState.Plant:
                this._pitSprNode.off(cc.Node.EventType.TOUCH_END);               
                break;
        }
    }

    private planting(seedId:number){
        cc.log("中下种子");

        this.switchSoilState(PlantAreaState.Plant);

        var plantJson = GetJsonData.instance.getPlantJson()[seedId];
        var plantData:PlantData = new PlantData();
        plantData.id = seedId;
        plantData.locationId = this._areaIndex;
        plantData.growthStage = 1;
        plantData.nextStageTime = plantJson.growthStageTime1*60;
        plantData.needWatering = true;
        plantData.wateringReduceTime = plantJson.wateringReduceTime*60

        SaveManager.instance.saveData.plantDatas.push(plantData);
        this.setPlant(plantData);
    }

    public enterWatering():boolean{
        // 是否有植物，植物是否可以浇水
        if(this._plantData && this._plantData.growthStage != 3){
            this._plantSpr.node.once(cc.Node.EventType.TOUCH_START,() =>{this.watering()});
            return true;
        }

        return false;
    }

    public exitWatering(){
        // 注册事件时保存了有植物的坑位索引，所以不需要再次判断
        this._plantSpr.node.off(cc.Node.EventType.TOUCH_START);
    }

    /** 给该植物浇水 */
    private watering(){
        if(this._plantData.needWatering){
            this._plantData.needWatering = false;
            this.showHint(false,false);
        }

        // 浇水动画，动画结束后缩短生长时间
        this._mapPlant.startWatering(this);
    }

    /** 浇水结束 */
    public wateringEnd(){
        this._plantData.nextStageTime -= this._plantData.wateringReduceTime *100;// 此处因为测试x100~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        cc.log("剩余生长时间：" + this._plantData.nextStageTime);

        // 进入下一个阶段
        // 植物播放生长的小动画
        // 然后更改植物图片
        if(this._plantData.nextStageTime <=0){
            if(!this._growthTween){
                this._growthTween = cc.tween(this._plantSpr.node)
                .to(0.3,{scaleX:1.2,scaleY:0.8})
                .to(0.3,{scaleX:0.8,scaleY:1.2})
                .to(0.3,{scale:1})
                .call(()=>{this.plantEnterNextLevel()})
                .start();
            }
            else{
                this._growthTween.start();
            }
        }
    }

    /** 植物进入下一个阶段 */
    private plantEnterNextLevel(){
        this._plantData.growthStage ++;        

        var plantJson = GetJsonData.instance.getPlantJson()[this._plantData.id];

        // 先赋值剩余生长时间，
        if(this._plantData.growthStage == 2){
            this._plantData.needWatering = true;
            this._plantData.nextStageTime = plantJson.growthStageTime2 * 60;
        }

        this.plantStage(this._plantData.growthStage);
    }
}
