import { _decorator, Collider2D, Component, Contact2DType, Node, view, find } from "cc";
import { enemyControl } from "./enemyControl";
import { score } from "./score";
import { playerControl } from "./playerControl";
const { ccclass, property } = _decorator;

@ccclass("bulletControl")
export class bulletControl extends Component {
  @property
  speed: number = 500; // 子弹速度；玩家正值，敌人负值

  isHero: boolean = true; // 是否为玩家发射的子弹

  start() {
    const collider = this.node.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  update(deltaTime: number) {
    // 玩家子弹向上移动, 敌人子弹向下移动
    this.node.setPosition(this.node.position.x, this.node.position.y + this.speed * deltaTime);
    // 检查子弹是否超出屏幕范围
    if (this.node.position.y > view.getVisibleSize().height / 2 || this.node.position.y < -view.getVisibleSize().height / 2) { // canvas原点为中心，子弹超出UI系统下屏幕可视区域尺寸时
      this.node.destroy(); // 销毁子弹
    }
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    if (this.isHero && otherCollider.tag === 1) { // 玩家子弹打到敌人
      otherCollider.getComponent(enemyControl)?.die(); // 调用敌人节点的die方法
      this.node.destroy(); // 销毁子弹节点
      find("Canvas/score")?.getComponent(score)?.addScore(); // 获取分数节点并增加分数
    } else if (!this.isHero && otherCollider.tag === 0) { // 敌人子弹打到玩家，游戏结束
      otherCollider.getComponent(playerControl)?.gameOver();
      this.node.destroy(); // 销毁子弹节点
    }
  }
}


