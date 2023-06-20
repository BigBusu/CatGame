import Item from "../Item/Item";
import { ItemType } from "../Item/ItemType";
import GetJsonData from "../JsonData/GetJsonData/GetJsonData";
import PlantData from "../Plant/PlantData";
import UIManager from "../UI/UIManager";
import SaveData from "./SaveData";
import SaveGame from "./SaveGame";

const {ccclass, property} = cc._decorator;

/*
	20230509
*/
/** 存档管理 */
@ccclass
export default class SaveManager extends cc.Component {
    public static instance:SaveManager = null;

	//private _saveData:SaveData = null;
    public saveData:SaveData = null;

    private _saveName:string = "SaveCat";

    onLoad(){
        SaveManager.instance = this;
    }

    protected start(): void {
        // 需要延迟初始化，因为读取表格需要时间
        this.scheduleOnce(() =>{
            this.initSaveData();
            this.initGameData();
        },0.5);
    }

    public initSaveData(){
        this.saveData = SaveGame.loadData(this._saveName);

        if(this.saveData == null) {
            this.saveData = new SaveData();

            // 同时添加初始数据
            // ~作物
            var p1:PlantData = new PlantData();
            p1.id = 1;
            p1.locationId = 0;
            p1.growthStage = 3;
            
            var p2:PlantData = new PlantData();
            p2.id = 1;
            p2.locationId = 1;
            p2.growthStage = 3;

            var p3:PlantData = new PlantData();
            p3.id = 1;
            p3.locationId = 2;
            p3.growthStage = 1;
            p3.needWatering = true;

            var plantJsons:any = GetJsonData.instance.getPlantJson();
            p3.nextStageTime = plantJsons[1].growthStageTime1 *60;
            p3.wateringReduceTime = plantJsons[1].wateringReduceTime*60;            

            this.saveData.plantDatas.push(p1);
            this.saveData.plantDatas.push(p2);
            this.saveData.plantDatas.push(p3);
            // end~

            // ~种子物品
            var s1:Item = new Item();
            s1.itemType = ItemType.Seed;
            s1.id = 1;
            s1.count = 2;

            var s2:Item = new Item();
            s2.itemType = ItemType.Seed;
            s2.id = 2;
            s2.count = 1;

            this.saveData.items.push(s1);
            this.saveData.items.push(s2);
            // end~
        }
    }

    private initGameData(){
        UIManager.instance.main.patienceBar.refreshPatience(this.saveData.patience,this.saveData.maxPatience);
    }

    public changePatienceValue(changeValue:number){
        cc.log("修改值：" + changeValue);
        this.saveData.patience += changeValue;

        var patience = this.saveData.patience;
        var maxPatience = this.saveData.maxPatience;

        if(patience > maxPatience)this.saveData.patience = maxPatience;
        else if(patience <0) this.saveData.patience = 0;

        // 将值显示在屏幕上
        UIManager.instance.main.patienceBar.refreshPatience(patience,maxPatience);
    }

    public changeItemCount(item:Item,changeValue:number){
        item.count += changeValue;

        if(item.count <=0){
            var index:number = this.saveData.items.indexOf(item);
            this.saveData.items.splice(index,1);
        }
    }
}
