import { _decorator, Component, director, Label, Node, find } from "cc";
const { ccclass, property } = _decorator;

enum GameState {
  READY,
  PLAYING,
  GAME_OVER
}

@ccclass("statsManager")
export class statsManager extends Component {
  private currentState: GameState = GameState.READY;

  public startGame() {
    this.currentState = GameState.PLAYING;
    this.node.emit("game-started");
  }


  start() {
    director.addPersistRootNode(this.node); // 确保statsManager在场景切换时不会被销毁

    const canvas = find("Canvas");
    const startButton = canvas.getChildByName("StartButton");
    const titleLabel = canvas.getChildByName("title");
    const score = canvas.getChildByName("score");

    // 初始化
    startButton.active = true;
    titleLabel.active = true;
    score.active = false;


    // 监听开始按钮事件
    startButton.on(Node.EventType.TOUCH_END, () => {
      switch (this.currentState) {
        case GameState.READY:
          this.currentState = GameState.PLAYING;
          director.loadScene("s1"); // 切换到游戏场景
          // startButton.active = false;
          // titleLabel.active = false;
          // score.active = true;
          score.getComponent(Label).string = "Score: 0"; // 初始化分数显示
          break;
      }
    });
  }

  update(deltaTime: number) {}
}
