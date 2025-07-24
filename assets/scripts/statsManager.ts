export class StatsManager {
  private static _instance: StatsManager = null;
  highestScore: number = 0; // 最高分
  title: string = "Air Battle"; // 游戏标题

  static getInstance(): StatsManager {
    if (!StatsManager._instance) {
      StatsManager._instance = new StatsManager();
    }
    return StatsManager._instance;
  }

  gameOver(currentScore: number) {
    this.highestScore = Math.max(this.highestScore, currentScore); // 更新最高分
    this.title = "Game Over"; // 更新标题
  }
}
