import { _decorator, Component, Node, resources, SpriteFrame, Sprite, UITransform, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("enemyControl")
export class enemyControl extends Component {
  @property
  speed: number = 50; // 敌人移动速度

  start() {
  }

  update(deltaTime: number) {
    // 敌人向下移动
    this.node.setPosition(this.node.position.x, this.node.position.y - this.speed * deltaTime);

    // 检查敌人是否超出屏幕范围
    if (this.node.position.y < -this.node.parent.getComponent(UITransform).height / 2) { // 等价于view.getVisibleSize().height / 2
      this.node.destroy(); // 超出范围则销毁敌人节点
    }
  }

 
  // 敌人死亡处理
  die () {
    console.log("Enemy died");

    resources.load("enemy1/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (err) {
        console.error("Failed to load enemy1 sprite:", err);
        return;
      }
      this.getComponent(Sprite).spriteFrame = spriteFrame;
    });

    this.scheduleOnce(() => {
      this.node.destroy(); // 延迟销毁敌人节点
    }, 0.5); // 0.5秒后销毁
  }
}
