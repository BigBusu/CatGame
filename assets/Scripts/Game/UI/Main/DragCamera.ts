const {ccclass, property} = cc._decorator;

/*
	20230505
*/
/** 拖拽相机 */
@ccclass
export default class DragCamera extends cc.Component {
    private _cameraNode:cc.Node = null;

    private _beforeTouchPosX:number = 0;

    /** x最小值 */
    private _minX:number = 0;
    private _maxX:number = 2100;

    protected onLoad(): void {
        this._cameraNode = cc.find("Canvas/Main Camera");

        this.node.on(cc.Node.EventType.TOUCH_START,(e:cc.Event.EventTouch)=> this.touchStart(e));
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(e:cc.Event.EventTouch)=> this.movingCamera(e));
    }

    private touchStart(e:cc.Event.EventTouch) {
        this._beforeTouchPosX = e.getLocation().x;
    }

    private movingCamera(e:cc.Event.EventTouch){
        let curTouchPosX = e.getLocation().x ;

        if(curTouchPosX != this._beforeTouchPosX){
           let offsetX = this._beforeTouchPosX - curTouchPosX;
            this._cameraNode.x += offsetX;
            this._beforeTouchPosX = curTouchPosX;

            if(this._cameraNode.x < this._minX) this._cameraNode.x = this._minX;
            else if(this._cameraNode.x > this._maxX) this._cameraNode.x = this._maxX;

            this.node.setPosition(this._cameraNode.position);
        }
    }
}
