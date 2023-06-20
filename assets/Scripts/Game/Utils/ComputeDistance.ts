/*
    20230406
*/
/** 计算距离 */
export default class ComputeDistance {
    /** 获取距离的平方
     * @param pos1 Vec2/Vec3
     */
    public static getDistance(pos1, pos2): number {
        let dx: number = pos1.x - pos2.x;
        let dy: number = pos1.y - pos2.y;
        return dx * dx + dy * dy;
    }

    /** 获取距离
     * @param pos1 Vec2/Vec3
     */
    public static getDistanceSqr(pos1, pos2): number {
        let dx: number = pos1.x - pos2.x;
        let dy: number = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    public static getAngle(pos1,pos2):number{
        // 计算朝向
        let dx: number = pos1.x - pos2.x;
        let dy: number = pos1.y - pos2.y;
        let dir =cc.v2(dx,dy);

        //根据朝向计算夹角
        let radian:number = dir.signAngle(cc.v2(1,0));

        // 将弧度转换为角度
        return radian / Math.PI *100;
    }
}
