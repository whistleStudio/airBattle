import { _decorator, Collider2D, Component, Contact2DType, Node, view } from "cc";
import { enemyControl } from "./enemyControl";
const { ccclass, property } = _decorator;

@ccclass("bulletControl")
export class bulletControl extends Component {
  @property
  speed: number = 500; // 子弹速度

  start() {
    const collider = this.node.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  update(deltaTime: number) {
    // 更新子弹位置
    this.node.setPosition(this.node.position.x, this.node.position.y + this.speed * deltaTime);

    // 检查子弹是否超出屏幕范围
    if (this.node.position.y > view.getVisibleSize().height / 2) { // canvas原点为中心，子弹超出UI系统下屏幕可视区域尺寸时
      this.node.destroy(); // 超出范围则销毁子弹
    }
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    if (otherCollider.tag === 1) { // 假设敌人节点的标签为1
      otherCollider.getComponent(enemyControl)?.die(); // 调用敌人节点的die方法
      this.node.destroy(); // 销毁子弹节点
    }
  }

}


