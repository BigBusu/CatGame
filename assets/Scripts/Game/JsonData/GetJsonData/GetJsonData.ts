const {ccclass, property} = cc._decorator;

/*
	20230530
*/
@ccclass
export default class GetJsonData extends cc.Component {
	public static instance:GetJsonData = null;

    private plantPath:string = "JsonData/PlantTable";
    private _plantJson:any = null;//:cc.JsonAsset

    private growPath:string = "JsonData/GrowTable";
    private _growJson:any = null;

    onLoad(){
        GetJsonData.instance = this;
        
        this.getPlantTable();
        this.getGrowTable();
    }
    
    private getPlantTable(){
        // 必须赋值self
        var self = this;

        cc.resources.load(this.plantPath,function(error,jsonAsset:cc.JsonAsset){
            self._plantJson = jsonAsset.json;
        });
    }

    public getPlantJson():any{
        return this._plantJson;
    }

    private getGrowTable(){
        // 必须赋值self
        var self = this;

        cc.resources.load(this.growPath,function(error,jsonAsset:cc.JsonAsset){
            self._growJson = jsonAsset.json;
        });
    }

    public getGrowJson():any{
        return this._growJson;
    }
}
