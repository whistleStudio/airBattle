import { _decorator, Component, Node, Prefab, resources, Sprite, SpriteFrame, UITransform, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("bgControl")
export class bgControl extends Component {

  isBg2Loaded = false;

  protected onLoad(): void {
    // 获得canvas节点
    const canvas = this.node.getParent();
    console.log("canvas width:", canvas.getComponent(UITransform).width);

    const screenSize = view.getViewportRect();
    console.log('屏幕实际显示宽高:', screenSize.width, screenSize.height);
    // 动态创建background2节点
    resources.load("background/spriteFrame", SpriteFrame, (err, spriteFrame) => {
      if (err) {
        console.error("加载SpriteFrame失败:", err);
        return;
      }
      const background2 = new Node("background2Node");
      const sprite = background2.addComponent(Sprite);
      sprite.spriteFrame = spriteFrame;
      background2.setPosition(0, spriteFrame.height, 0);
      this.node.addChild(background2);
      this.isBg2Loaded = true;
    });
  }

  start() { }

  update(deltaTime: number) {
    if (!this.isBg2Loaded) return; // 确保背景2已加载
    for (let bgNode of this.node.children) {
      bgNode.y -= 50 * deltaTime;
      if (bgNode.y < -852) {
        bgNode.y += 852 * 2;
      }
    }
  }
}
