import { _decorator, Component, EventTouch, Node, Vec3, UITransform, Prefab, instantiate, view, Collider2D, resources, Sprite, SpriteFrame, Contact2DType, director, find, Label } from "cc";
import { enemyControl } from "./enemyControl";
import { StatsManager } from "./statsManager";
import { score } from "./score";
const { ccclass, property } = _decorator;

@ccclass("playerControl")
export class playerControl extends Component {
  @property(Prefab)
  bulletPrefab: Prefab = null;

  start() {

    console.log("visiblesize:", view.getVisibleSize());

    // 移动
    this.node.on(Node.EventType.TOUCH_MOVE, (ev: EventTouch) => {
      const uiPos = ev.getUILocation();
      const canvas = this.node.parent // 父节点为canvas
      const canvasUITransform = canvas.getComponent(UITransform);
      const canvasWidth = canvasUITransform.width, canvasHeight = canvasUITransform.height;
      this.node.setPosition(uiPos.x - canvasWidth / 2, uiPos.y - canvasHeight / 2); // 方法一
      // this.node.setWorldPosition(uiPos.x, uiPos.y, 0); // 方法二 worldPosition原点canvas左下角
    });
    // 发射子弹
    this.schedule(this.shoot, 0.5); // 每0.5秒发射一次子弹

    // 碰撞检测
    const collider = this.getComponent(Collider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  update(deltaTime: number) {

  }

  // 发射子弹回调
  shoot () {
    if (!this.bulletPrefab) return;
    const bulletNode = instantiate(this.bulletPrefab);
    bulletNode.setPosition(this.node.position.x, this.node.position.y + 80); // 子弹位置在玩家上方
    this.node.parent.addChild(bulletNode);
  }


  // 与敌机相撞 game over
  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    if (otherCollider.tag === 1) { 
      otherCollider.getComponent(enemyControl)?.die(); // 调用敌人节点的die方法
      this.gameOver(); // 调用游戏结束方法
    }
  }

  // 游戏结束
  gameOver() {
    resources.load("hero2/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (err) {
        console.error("Failed to load sprite frame:", err);
        return;
      }
      this.getComponent(Sprite).spriteFrame = spriteFrame; // 设置玩家节点的精灵帧
      this.unschedule(this.shoot); // 停止发射子弹
    });
    // 更新总线状态管理
    StatsManager.getInstance().gameOver(find("Canvas/score")?.getComponent(score)?.currentScore ?? 0);
    // 延迟1秒后加载游戏结束场景
    this.scheduleOnce(() => {
      director.loadScene("s0"); 
    }, 1)
  }
}