<template>
  <div class="qr-reader">
    <QrcodeStream class="camera-field" @decode="onDecode" @init="$emit('init', $event)" />
    <v-btn
      class="link-btn"
      v-if="result.includes('quiz')"
      :to="result"
      color="#689F38"
      dark large round
    >
      クイズへ
    </v-btn>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream },
  data () {
    return {
      result: ''
    }
  },
  methods: {
    onDecode (result) {
      this.result = result;
    }
  }
}
</script>

<style>
a.link-btn {
  margin: 50px;
}

.qrcode-stream__camera {
  width: 80%;
  margin: auto;
}
</style>
