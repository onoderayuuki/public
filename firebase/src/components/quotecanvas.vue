<template>
  <!-- <div> -->
  <!-- <button @click="test()">+1</button> -->
  <div id="canvas-container"></div>
  <!-- </div> -->
</template>

// <script>
import Matter from "matter-js";

export default {
  name: "quotecanvas",
  // props: ["value"],
  // el: '#canvas-container',
  data() {
    return {
      // message: this.value,
      // aaa: "aaa",
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
      // showID: 0,
      Event: Matter.Events,
    };
  },
  mounted() {
    // this.$parent.message = "child!!!";
    // console.log(this.showID);
    // create engine
    (this.engine = this.Engine.create()), (this.world = this.engine.world);
    // console.log(this.world);
    // create renderer
    var render = this.Render.create({
      element: this.$el,
      engine: this.engine,
      options: {
        width: 300,
        height: 450,
        background: "rgba(0, 0, 0, 0)",
        // pixelRatio: 'auto',
        wireframes: false,
        showDebug: false,
        showBroadphase: false,
        showBounds: false,
        showVelocity: false,
        showCollisions: false,
        showSeparations: false,
        showAxes: false,
        showPositions: false,
        showAngleIndicator: false,
        showIds: false,
        showShadows: false,
        showVertexNumbers: false,
        showConvexHulls: false,
        showInternalEdges: false,
        showMousePosition: false,
        // texture: "../assets/img/bottle.png",
      },
    });
    render.textures = "bottle.png";
    this.Render.run(render);

    // create runner
    var runner = this.Runner.create();
    this.Runner.run(runner, this.engine);

    //床を作る
    let groud_back = {
      isStatic: true, //固定する
      render: {
        // fillStyle: "#797979", // 線の色: debug
        fillStyle: "rgba(0, 0, 0, 0)", // 塗りつぶす色: CSSの記述法で指定
        strokeStyle: "rgba(0, 0, 0, 0)", // 線の色: CSSの記述法で指定
        lineWidth: 0,
      },
    };
    this.World.add(this.world, [
      this.Bodies.rectangle(8, 340, 15, 400, groud_back), //左
      this.Bodies.rectangle(290, 350, 20, 400, groud_back), //右
      this.Bodies.rectangle(160, 450, 300, 60, groud_back), //
      this.Bodies.polygon(5, 105, 3, 60, {
        ...groud_back,
        angle: Math.PI * 0.2,
      }), //左上
      this.Bodies.polygon(20, 430, 3, 60, {
        ...groud_back,
        angle: -Math.PI * 0.2,
      }), //左下
      this.Bodies.polygon(295, 110, 3, 65, {
        ...groud_back,
        angle: Math.PI * 0.15,
      }), //右上
      this.Bodies.polygon(275, 430, 3, 60, {
        ...groud_back,
        angle: -Math.PI * 0.14,
      }), //右下
    ]);

    let groud_back_test = {
      id: "aaa",
      isStatic: true, //固定する
      render: {
        // fillStyle: "#FF0000", // 塗りつぶす色: CSSの記述法で指定
        fillStyle: "rgba(0, 0, 0, 0)", // 塗りつぶす色: CSSの記述法で指定
        strokeStyle: "rgba(0, 0, 0, 0)", // 線の色: CSSの記述法で指定
        lineWidth: 0,
      },
    };
    this.World.add(this.world, [
      // this.Bodies.rectangle(160, 450, 300, 60, groud_back_test),//debug用底
      this.Bodies.polygon(0, 40, 3, 80, {
        ...groud_back_test,
        angle: -Math.PI * 0.1,
      }), //検知用
      this.Bodies.polygon(300, 40, 3, 80, {
        ...groud_back_test,
        angle: -Math.PI * 0.2,
      }), //検知用
    ]);

    // add mouse control
    var mouse = this.Mouse.create(render.canvas),
      mouseConstraint = this.MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.8,
          render: {
            visible: false,
          },
        },
      });
    this.World.add(this.world, mouseConstraint);
    // keep the mouse in sync with rendering
    render.mouse = mouse;

  // console.log('start'); 文字が入ったら衝突検知をスタートさせる
    let collisionstart = false;
    setTimeout(function () {
      collisionstart = true;
      console.log('collisionstart');
    }, 5000);

  // let sample = this.showID
let self = this;
    //取り出す操作を検知して表示側に渡す
    this.Event.on(this.engine, "collisionStart", function (event) {
      let pairs = event.pairs; //衝突物がpairs配列に入る
      pairs.forEach(function (pair) {
        // console.log(pair.bodyB.id);
        if (collisionstart && pair.bodyB.id == "aaa") {
          // console.log('collision');
          let pickid = pair.bodyA.id.split("_");
          // console.log(sample);
          // this.$parent.message = 'child!!!';
          // console.log(pair);
          self.$parent.showID = pickid[0];

          //マウスを離してあげたいがやり方がよくわからない
          //画面外に出すことで消去する:
          pair.bodyA.position.x = 10000;
          pair.bodyA.position.y = 10000;

          // Matter.World.remove(self.world, pair.bodyA)
        }
      });
    });
    //実験
    //  this.World.add(this.world, [this.Bodies.rectangle(100, 30, 20, 20)]);
    //  this.test();
  },
  // created(){this.test();},
  methods: {
    test() {
      console.log("test");
      // console.log(this.aaa);
      // console.log(this.world);
      //実験
      this.World.add(this.world, [this.Bodies.rectangle(100, 30, 20, 20)]);
    },
    createQuote(array, id) {
      // console.log(array);
      let imgarray = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "_",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "8",
        "9",
      ];
      // var groupId = Body.nextGroupId();
      let testA = this.Composite.create();
      let nowX = this.Common.random(90, 210);
      let nowY = this.Common.random(-100, 80);
      //文字の数だけブロックを追加
      for (let i = 0; i < array.length; i++) {
        // console.log(array[i]);
        if (imgarray.indexOf(array[i]) === -1) {
          // console.log('存在しません');
          continue;
        } else {
          // console.log('存在します');
          let texture = "img/" + array[i] + ".png";
          // console.log(texture);
          let brock_back = {
            id: id + "_" + i,
            // density: 0.0000001, // 密度
            // frictionAir: 0.0005, // 空気抵抗
            restitution: 0.8,// 弾力性
            // friction: 0, // 本体の摩擦
            render: {
              sprite: {
                texture: texture,
              },
            },
          };
          // const element = array[index];
          this.Composite.add(
            testA,
            this.Bodies.rectangle(nowX, nowY - 30 * i, 20, 20, brock_back)
          );
        }
      }
      //追加したブロックを鎖でつなげる
      let chain_back = {
        stiffness: 0.1,
        render: {
          fillStyle: "rgba(0, 0, 0, 0)",
          strokeStyle: "rgba(0, 0, 0, 0)",
          // fillStyle: "#FF0000",
          // strokeStyle: "#FF0000",
        },
      };
      this.Composites.chain(testA, 0.1 ,0,-0.1 , 0, chain_back);
      this.World.add(this.world, testA);
    },
  },
};
</script>

<style>
#canvas-container {
  width: 300px;
  height: 450px;
  /* margin: 0 auto; */
}
</style>