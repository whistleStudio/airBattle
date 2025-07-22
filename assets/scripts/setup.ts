import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags } from "cc";
const { ccclass, property } = _decorator;

@ccclass("setup")
export class setup extends Component {
  protected onLoad(): void {
    // PhysicsSystem2D.instance.enable = true;

    //     // 开启所有调试绘制
    // PhysicsSystem2D.instance.debugDrawFlags = 
    //     EPhysics2DDrawFlags.Aabb | 
    //     EPhysics2DDrawFlags.Pair | 
    //     EPhysics2DDrawFlags.CenterOfMass | 
    //     EPhysics2DDrawFlags.Joint | 
    //     EPhysics2DDrawFlags.Shape;
  }
  start() {}
  protected onDestroy(): void {
    // PhysicsSystem2D.instance.enable = false;
  }

  update(deltaTime: number) {}
}
