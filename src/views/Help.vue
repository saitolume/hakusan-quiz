<template>
  <div class="help">
    <v-card color="white">
      <v-card-text>
        <p>1. 右上の「ログイン」からGoogleアカウントでログインしてください</p>
        <p>2. 右下のカメラボタンを押してQRカメラを起動</p>
        <p>3. QRを読み取って「クイズへ」ボタンをタップ</p>
        <p>4. 4択クイズに答えることでヒントを入手できます</p>
        <p>5. 一度クリアすると「クリア済み」からヒントを確認できます</p>
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

p {
  margin: 30px 10px;
}
</style>
