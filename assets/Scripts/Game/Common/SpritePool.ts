/*
	20230509
*/
/** 图片池 */
export default class SpritePool {
	/** 子弹字典 */
    private static _spriteDic:{[key:string]:cc.SpriteFrame} = {};

    // 这种方法完全不行，因为在这里获取图片是需要花时间的，而接收图片的脚本不会等待它获取完成而直接执行~~~~~~~~
    /** 获取图片，只能获取已有的图片 */
    public static getSprite(spritePath:string):cc.SpriteFrame{
        var getSpr:cc.SpriteFrame = this._spriteDic[spritePath];

        if(getSpr == null)cc.error("没有图片");
        
        return getSpr;       
    }

    /** 设置图片 */
    public static setSprite(spritePath:string,sprite:cc.Sprite){
        var getSpr:cc.SpriteFrame = this._spriteDic[spritePath];

        if(getSpr == null){
            cc.resources.load(spritePath,cc.SpriteFrame,(error:Error,spr:cc.SpriteFrame) =>{
                this._spriteDic[spritePath] = spr;
                sprite.spriteFrame = spr;
            });
        }
        else{
            sprite.spriteFrame = getSpr;
        }     
    }
}
