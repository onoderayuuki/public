<template>
  <div>
  </div>
</template>

// <script>
import Matter from "matter-js";

export default {
  name:"mattercanvas",
  data() {
    return {
      Engine: Matter.Engine,
      Render: Matter.Render,
      MouseConstraint: Matter.MouseConstraint,
      Mouse: Matter.Mouse,
      Runner: Matter.Runner,
      Common: Matter.Common,
      Composite: Matter.Composite,
      Composites: Matter.Composites,
      World: Matter.World,
      Bodies: Matter.Bodies,
      engine: {},
      world: {},
      Event: Matter.Events,
    };
  },
  mounted() {
    this.$parent.showID = 1;
    
    // create engine
    (this.engine = this.Engine.create()), (this.world = this.engine.world);

    // create renderer
    var render = this.Render.create({
      element: this.$el,
      engine: this.engine,
      options: {
        width: 300,
        height: 450,
      },
    });
    this.Render.run(render);

    // create runner
    var runner = this.Runner.create();
    this.Runner.run(runner, this.engine);

    // add mouse control
    var mouse = this.Mouse.create(render.canvas),
      mouseConstraint = this.MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });
    this.World.add(this.world, mouseConstraint);
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    //床を作る
    let groud_back = {
      id: "aaa",
      isStatic: true, //固定する
      render: {
        fillStyle: "#FF0000", // 線の色: debug
      },
    };
    this.World.add(this.world, [
      this.Bodies.rectangle(10, 350, 20, 400, groud_back), //左
      this.Bodies.rectangle(290, 350, 20, 400, groud_back), //右
      this.Bodies.rectangle(150, 450, 300, 60, groud_back), //下
    ]);

    //要素を投下
    this.World.add(this.world, this.Bodies.rectangle(100, 100, 20, 20,{ id : 99}));

    //衝突した要素のIDを取ってVueのdataに渡したい
    this.Event.on(this.engine, "collisionStart", function (event) {
      let pairs = event.pairs; //衝突物がpairs配列に入る
      pairs.forEach(function (pair) {
        // console.log(pair);
        if (pair.bodyA.id == "aaa") {
          //衝突した要素のIDは取得できている
          let pickid = pair.bodyB.id;
          console.log(`落下した物体のID：${pickid}`);
          //これをdataに定義している変数に渡そうとするとエラー
          // canvasの中しか参照できない？
          this.showID = pickid[0];
          console.log(this.showID);
        }
      });
    });
  },
};
</script>
