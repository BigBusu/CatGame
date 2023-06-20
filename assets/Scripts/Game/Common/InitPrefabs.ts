const {ccclass, property} = cc._decorator;

/*
	20230616
*/
/** 初始化预制件
 * cocos特殊的获取resources的机制导致必须在游戏开始时就初始化所有预制件，之后方便调用
 */
@ccclass
export default class InitPrefabs extends cc.Component {
	
}
