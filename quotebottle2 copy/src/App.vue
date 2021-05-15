<template>
  <div>
    <mattercanvas />    
    <p> 落下した物体のIDは {{ showID }} です</p>
    <p> showIDの設定：<br>親コンポーネント０→子コンポーネント１とする OK<br>→オブジェクト衝突検知でオブジェクトに設定した９９を取得したい</p>
  </div>
</template>

<script>
import mattercanvas from "./components/mattercanvas.vue";

export default {
  name: "app",
  components: {
    mattercanvas
  },
  data(){
    return{
      showID: 0 
    }
  }
  }
</script>

<style>

</style>