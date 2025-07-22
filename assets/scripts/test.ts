import {_decorator, Component, BoxCollider2D, PhysicsSystem2D, Collider2D, IPhysics2DContact, Contact2DType,} from "cc";
const { ccclass } = _decorator;

@ccclass("Test")
export class Test extends Component {
  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(
        Contact2DType.BEGIN_CONTACT, 
        (self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) => console.log("碰撞开始:", self.node.name, other.node.name)
      );
    }
  }
}
