<template>
  <div>
    <div class="row data-hash-row">
      <div class="col-12 col-md-12 data-input-box" @click="$refs['data-hash-input'].focus()">
        <label>
            Enter data
          </label>
          <textarea ref="data-hash-input" v-model="data" class="form-control data-input-textarea" />
        
      </div>
      <!-- <div class="or-container col-12 col-md-2">
        <span>or</span>
      </div>
      <div class="col-12 col-md-5 px-0">
        <div class="file-dropbox">
          <input
            type="file"
            class="input-file"
            @change="hashDocument"
          >
          <div class="text-center">
            <img src="/img/document-attach.png">
            <p v-if="!fileName" class="file-dropbox-text">
              <span>Choose documents</span>
              <br> or drop here
            </p>
            <p v-else class="file-dropbox-text">
              {{ fileName }}
            </p>
          </div>
        </div>
      </div> -->
    </div>
    <div class="row d-flex justify-content-center mt-5">
      <b-button
        v-if="!hash"
        variant="primary"
        @click="hashData"
      >
        Hash it
      </b-button>
      <div v-else class="col-12 data-hash">
        <p class="data-hash-status">
          <img src="/img/at-checkmark.svg" width="36" height="auto">
          Data hashed succesfully
        </p>
        <p class="data-hash-hash">
          <strong>Hash: </strong> {{ hash }}
          <b-button
          class="btn-clipboard ml-1"
          variant="outline-primary"
          width="1em"
          height="1em"
          @click="copyToClipboard(hash)"
        >
          <b-icon icon="files" />
        </b-button>
        </p>
        <p class="data-hash-clear" @click="clearData()">
          Clear data
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import JSON5 from 'json5'
import { sha256 } from '../lib'

export default Vue.extend({
  data () {
    return {
      data: '',
      hash: '',
      dragging: false,
      fileName: ''
    }
  },
  methods: {
    clearData () {
      this.data = ''
      this.hash = ''
      this.fileName = ''
    },
    copyToClipboard (text: string) {
      if (process.browser) {
        navigator.clipboard.writeText(text)
      }
    },
    hashData () {
      let digest: Buffer
      try {
        digest = sha256(JSON5.stringify(JSON5.parse(this.data)))
      } catch {
        digest = sha256(this.data)
      }
      this.hash = digest.toString('base64')
      this.$emit('hashed', this.hash)
    },
    // hashDocument (event: any) {
    //   const file = event.target.files && event.target.files[0] ? event.target.files[0] : null
    //   if (!file) {
    //     return
    //   }
    //   const reader = new FileReader()
    //   reader.onload = () => {
    //     if (reader.result) {
    //       const buffer = Buffer.from(reader.result)
    //       const digest = sha256(buffer)
    //       const hash = digest.toString('base64')
    //       this.hash = sha256(hash).toString('base64')
    //       this.$emit('hashed', this.hash)
    //     }
    //   }
    //   reader.readAsArrayBuffer(file)
    //   this.fileName = file.name
    // }
  }
})
</script>

<style lang="scss" scoped>
  @import "../assets/sass/abstracts/variables";

  .data-input-box {
    height: 250px;
  }

  .or-container {
    display: flex;
    height: 250px;
    align-items: center;
    justify-content: center;
    color: #aaaaaa;

    @media (max-width: 768px) {
      height: 100px;
    }
  }

  .data-hash {
    text-align: center;

    .data-hash-status {
      color: $primary;
      font-size: 23px;
      margin-bottom: 35px;
      font-weight: 600;

      img {
        margin-right: 11px;
        padding-bottom: 2px;
      }
    }

    .data-hash-hash {
      font-size: 19px;
      word-break: break-word;
    }

    .data-hash-clear {
      cursor: pointer;
      color: #aaaaaa;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .file-dropbox {
    border: 2px dashed $primaryColor;
    position: relative;
    cursor: pointer;
    height: 250px;
    padding: 40px;

    .file-dropbox-text {
      margin-top: 21px;
      font-size: 16px;

      span {
        color: $primaryColor;
        font-weight: 600;
      }
    }

    &:hover {
      .file-dropbox-text {
        span {
          opacity: 0.8;
        }
      }
    }
  }

  .input-file {
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 10;
    position: absolute;
  }

  .copy-icon {
    height: 100%;
    width: 24px;
    padding-bottom: 3px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
</style>
