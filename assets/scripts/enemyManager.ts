import { _decorator, Component, instantiate, Node, Prefab, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("enemyManager")
export class enemyManager extends Component {
  @property(Prefab)
  enemyPrefab: Prefab = null; // 敌人预制体

  start() {
    const canvas = this.node.parent; // 父节点为canvas
    const canvasUITransform = canvas.getComponent(UITransform);
    const uiWidth = canvasUITransform.width, uiHeight = canvasUITransform.height;
    this.node.setPosition(0, 0); 
    console.log("world pos:", canvas.getWorldPosition());
    // 随机生成敌人
    this.schedule(() => {
      if (!this.enemyPrefab) return;
      const enemyNode = instantiate(this.enemyPrefab);

      const padX = 30, padY = 50; // 边距
      // enemyNode.setPosition(padX+Math.random()*(uiWidth-padX*2)-(uiWidth-padX*2)/2, uiHeight/2); // 敌人位置在画布上方
      enemyNode.setPosition(padX+Math.random()*(uiWidth-padX*2)-uiWidth/2, uiHeight/2+padY); // 敌人位置在画布上方
      this.node.addChild(enemyNode); // 添加到敌人管理节点下
    }, 1)
  }

  update(deltaTime: number) {}
}
