/*
    20230511
*/
/** UI动画 */
export default class UIAnim {
    //#region 窗口
    /** 放大窗口 */
    public static magnifyWindow(node: cc.Node) {
        node.scale = 0;

        cc.tween(node)
            .to(0.5, { scale: 1 })
            .start();
    }

    /** 放大窗口Q弹 */
    public static magnifyWindowQ(node: cc.Node) {
        node.scale = 0;

        cc.tween(node)
            .to(0.3, { scale: 1.05 })
            .to(0.1, { scale: 0.95 })
            .to(0.1, { scale: 1 }) 
            .start();
    }

    /** 缩小窗口
     * @example //动画完毕触发事件，注册事件：
     * cc.node.on("MinifyEnd",() =>{});
     */
    public static minifyWindow(node:cc.Node,triggerEvent:boolean){
        cc.tween(node)
        .to(0.3, { scale: 0 })
        .call(() =>{
            if(triggerEvent) node.emit("MinifyEnd");            
        })
        .start();
    }

        /** 缩小窗口
     * @example //动画完毕触发事件，注册事件：
     * @param minifyNode:需要缩小的窗口
     * @param eventNode:触发事件的节点
     * cc.node.on("MinifyEnd",() =>{});
     */
        public static minifyWindow2(minifyNode:cc.Node,eventNode:cc.Node){
            cc.tween(minifyNode)
            .to(0.3, { scale: 0 })
            .call(() =>{
                eventNode.emit("MinifyEnd");            
            })
            .start();
        }
    //#endregion

    //#region 按钮
    /** 缩小并向下按钮 */
    public static minifyAndDownButton(node: cc.Node) {
        var originX = node.x;

        cc.tween(node)
            .to(0.2, { scale: 0.95, x: originX - 5 })
            .to(0.2, { scale: 1, x: originX })
            .start();
    }

    //#endregion
}
