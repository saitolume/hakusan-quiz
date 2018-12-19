<template>
  <div class="help">
    <v-card color="white">
      <v-card-text>
        <p>1. 右下のカメラボタンを押してQRカメラを起動</p>
        <p>2. QRを読み取って「クイズへ」ボタンをタップ</p>
        <p>3. 4択クイズに答えることでヒントを入手できます</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Help',
}
</script>

<style scoped>
.help {
  text-align: left;
  margin: 20px;
  margin-top: 90px;
}

h3 {
  margin-bottom: 20px;
}
</style>
