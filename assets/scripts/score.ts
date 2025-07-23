import { _decorator, Component, Label, Node, UI, UITransform, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("score")
export class score extends Component {
  currentScore: number = 0; // 当前分数

  start() {
    const visiblesize = view.getVisibleSize();
    this.getComponent(UITransform).setAnchorPoint(0, 1); // 设置锚点为左上角
    this.node.setWorldPosition(20, visiblesize.height, 0); // 设置分数显示位置

  }
  

  update(deltaTime: number) {}

  // 得分
  public addScore(value: number = 1) {
    console.log("add score:", value);
    this.currentScore += value;
    this.getComponent(Label).string = "Score " + this.currentScore; // 更新分数显示
  }
}
