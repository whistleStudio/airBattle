import { _decorator, Component, Node, Label, director } from "cc";
import { StatsManager } from "./statsManager";
const { ccclass, property } = _decorator;

@ccclass("menu")
export class menu extends Component {
  start() {
    this.node.getChildByName("title").getComponent(Label).string = StatsManager.getInstance().title; // 设置标题
    this.node.getChildByName("highestScore").getComponent(Label).string = `Highest Score ${StatsManager.getInstance().highestScore}`; // 设置最高分

    const startButton = this.node.getChildByName("startButton");
    startButton.on(Node.EventType.TOUCH_END, () => {
      director.loadScene("s1"); // 加载游戏场景
    });
  }

  update(deltaTime: number) {}
}
