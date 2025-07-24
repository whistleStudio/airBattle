import { _decorator, Component, Node, resources, SpriteFrame, Sprite, view, isValid, Prefab, instantiate, find } from "cc";
import { bulletControl } from "./bulletControl";
const { ccclass, property } = _decorator;

@ccclass("enemyControl")
export class enemyControl extends Component {
  @property
  speed: number = 200; // 敌人移动速度

  @property(Prefab)
  bulletPrefab: Prefab = null; // 子弹预制体

  isDie: boolean = false; // 敌人是否已死亡

  start() {
    this.schedule(this.shoot, 0.8); // 每0.8秒发射一次子弹
  }

  update(deltaTime: number) {
    // 敌人向下移动
    if (this.isDie) return; // 如果敌人已死亡，则不再更新位置
    this.node.setPosition(this.node.position.x, this.node.position.y - this.speed * deltaTime);

    // 检查敌人是否超出屏幕范围
    if (this.node.position.y < -view.getVisibleSize().height / 2) { 
      this.node.destroy(); // 超出范围则销毁敌人节点
    }
  }

 
  // 敌人死亡处理
  die () {
    this.isDie = true;
    resources.load("enemy2/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (err) {
        console.error("Failed to load enemy2 sprite:", err);
        return;
      }
      if (!isValid(this.node)) return; // 确保节点仍然有效
      this.unschedule(this.shoot); // 停止发射子弹
      this.getComponent(Sprite).spriteFrame = spriteFrame; 
      this.scheduleOnce(() => {
        this.node.destroy(); // 延迟销毁敌人节点
      }, 0.5); // 0.5秒后销毁
    });
  }

  // 发射子弹
  shoot() {
    if (!this.bulletPrefab) return; // 如果没有子弹预制体或敌人已死亡，则不发射子弹
    const bulletNode = instantiate(this.bulletPrefab);
    bulletNode.getComponent(bulletControl).isHero = false; // 设置子弹为敌人发射的
    bulletNode.setPosition(this.node.position.x, this.node.position.y - 80); // 子弹位置在敌人下方
    find("Canvas")?.addChild(bulletNode); // 将子弹添加到Canvas下
  }
}
