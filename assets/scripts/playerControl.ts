import { _decorator, Component, EventTouch, Node, Vec3, UITransform, Prefab, instantiate, view, Collider2D } from "cc";
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
      this.node.setPosition(uiPos.x - canvasWidth / 2, uiPos.y - canvasHeight / 2);
    });
    // 发射子弹
    this.schedule(() => {
      if (!this.bulletPrefab) return;
      const bulletNode = instantiate(this.bulletPrefab);
      bulletNode.setPosition(this.node.position.x, this.node.position.y + 80); // 子弹位置在玩家上方
      this.node.parent.addChild(bulletNode);
    }, 0.5); // 每0.5秒发射一次子弹
  }

  update(deltaTime: number) {

  }
}