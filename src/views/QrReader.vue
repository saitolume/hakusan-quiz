<template>
  <div class="qr-reader">
    <QrcodeStream @decode="onDecode" @init="$emit('init', $event)" />
    <v-btn v-if="result.includes('quiz')" :to="result">クイズへ</v-btn>
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
