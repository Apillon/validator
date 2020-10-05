<template>
  <div>
    <div class="row first-row">
      <div class="col-12 col-md-6 data-input-box pr-0 pr-md-2 pr-lg-4" @click="$refs['data-hashed-input'].focus()">
        <div class="data-input-inner-box">
          <p class="data-input-label">
            Enter hash
          </p>
          <textarea
            ref="data-hashed-input"
            v-model="hash"
            class="data-input-textarea"
            @input="validationErrors.hash = ''"
          />
        </div>
        <p v-if="validationErrors.hash" class="validation-error">
          {{ validationErrors.hash }}
        </p>
      </div>
      <b-form-checkbox
        v-if="connected"
        v-model="useMetamask"
        class="metamask-switch mb-1 d-block d-sm-none"
        switch
        @change="useMetamask = !useMetamask; anchorData = '';"
      >
        Use Metamask
      </b-form-checkbox>
      <div class="col-12 col-md-6 data-input-box pl-0 pl-md-2 pl-lg-4" @click="$refs['data-hash-anchor'].focus()">
        <div class="data-input-inner-box">
          <p
            class="data-input-label"
            v-text="useMetamask ? 'Enter transaction ID' : 'Enter anchor data'"
          />
          <b-form-checkbox
            v-if="connected"
            v-model="useMetamask"
            class="data-input-switch d-none d-sm-block"
            switch
            @change="useMetamask = !useMetamask; anchorData = '';"
          >
            Use MetaMask
          </b-form-checkbox>
          <textarea
            ref="data-hash-anchor"
            v-model="anchorData"
            class="data-input-textarea"
            @input="validationErrors.anchorData = ''"
          />
        </div>
        <p v-if="validationErrors.anchorData" class="validation-error">
          {{ validationErrors.anchorData }}
        </p>
      </div>
    </div>
    <div class="row second-row">
      <div class="col-12 col-md-6 data-input-box pr-0 pr-md-2 pr-lg-4" @click="$refs['data-blocks-input'].focus()">
        <div class="data-input-inner-box">
          <p class="data-input-label">
            Enter blocks
          </p>
          <textarea
            ref="data-blocks-input"
            v-model="blocks"
            class="data-input-textarea"
            @input="validationErrors.blocks = ''"
          />
        </div>
        <p v-if="validationErrors.blocks" class="validation-error">
          {{ validationErrors.blocks }}
        </p>
      </div>
      <div class="col-12 col-md-6 data-input-box pl-0 pl-md-2 pl-lg-4" @click="$refs['data-merkle-input'].focus()">
        <div class="data-input-inner-box">
          <p class="data-input-label">
            Enter merkle proof
          </p>
          <textarea
            ref="data-merkle-input"
            v-model="merkleProof"
            class="data-input-textarea"
            @input="validationErrors.merkleProof = ''"
          />
        </div>
        <p v-if="validationErrors.merkleProof" class="validation-error">
          {{ validationErrors.merkleProof }}
        </p>
      </div>
    </div>
    <div v-if="verifyError" class="row d-flex justify-content-center mb-5">
      <div v-if="verifyError === verifyErrors.GENERAL" class="verify-error text-center">
        There was a problem while verifying data. Please make sure that you entered correct values in their corresponding fields and try again.
      </div>
      <div v-else-if="verifyError === verifyErrors.NETWORK" class="verify-error text-center">
        There was a problem while verifying data. Please make sure that MetaMask is connected to Main Ethereum network.
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <b-button
        v-if="!verified"
        variant="primary"
        @click="validateData"
      >
        Verify
      </b-button>
      <div v-else class="col-12 text-center">
        <p class="verified-status">
          <img src="/img/check-verified.png">
          Verified
        </p>
        <p class="verify-clear" @click="clearData()">
          clear data
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import JSON5 from 'json5'
import { blockHash, merkleRoot, validateJSON } from '../lib'
import { Web3Helper } from '../lib/web3'

export default Vue.extend({
  props: {
    hashedData: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      web3: new Web3Helper(),
      connected: false,
      useMetamask: false,
      anchorData: '',
      hash: '',
      merkleProof: '',
      blocks: '',
      verified: false,
      verifyError: 0,
      validationErrors: {
        hash: '',
        anchorData: '',
        blocks: '',
        merkleProof: ''
      },
      verifyErrors: {
        GENERAL: 1,
        NETWORK: 2
      }
    }
  },
  watch: {
    hashedData (value) {
      this.hash = value
      this.merkleProof = ''
      this.blocks = ''
      this.anchorData = ''
      this.verified = false
    }
  },
  mounted () {
    this.connected = this.web3.connect()
  },
  methods: {
    clearData () {
      this.hash = ''
      this.merkleProof = ''
      this.blocks = ''
      this.anchorData = ''
      this.verified = false
    },
    validateData () {
      let errors = false
      if (!this.hash) {
        this.validationErrors.hash = 'Please enter data hash.'
        errors = true
      }

      if (!this.anchorData) {
        this.validationErrors.anchorData = `Please enter ${this.useMetamask ? 'transaction ID' : 'anchor data'}.`
        errors = true
      }

      if (!this.blocks) {
        this.validationErrors.blocks = 'Please enter blocks.'
        errors = true
      } else if (!validateJSON(this.blocks)) {
        this.validationErrors.blocks = 'Blocks must be in valid JSON format.'
        errors = true
      }

      if (!this.merkleProof) {
        this.validationErrors.merkleProof = 'Please enter merkle proof.'
        errors = true
      } else if (!validateJSON(this.merkleProof)) {
        this.validationErrors.merkleProof = 'Merkle proof must be in valid JSON format.'
        errors = true
      }

      if (!errors) {
        this.verify()
      }
    },
    verify () {
      this.verifyError = 0

      const proof = JSON5.parse(this.merkleProof)
      const root = merkleRoot(proof, this.hash)
      const blocks = JSON5.parse(this.blocks)
      const verified = blockHash(blocks, root)

      if (root === '' || verified === '') {
        this.verifyError = this.verifyErrors.GENERAL
        return
      }

      if (this.connected && this.useMetamask) {
        console.log(this.anchorData)

        this.web3.readTxData(this.anchorData).then((txData) => {
          if (txData !== null) {
            this.verified = Buffer.from(txData[2], 'base64').toString('hex') === verified
          } else {
            this.verifyError = this.verifyErrors.NETWORK
            this.verified = false
          }
        }).catch((error) => {
          console.log(error)
          this.verifyError = this.verifyErrors.GENERAL
          this.verified = false
        })
      } else {
        this.verified = verified === this.anchorData
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  @import "../assets/sass/abstracts/variables";

  .metamask-switch {
    color: #aaaaaa;
  }

  .verify-error {
    max-width: 400px;
    color: $errorColor;
  }

  .first-row {
    margin-bottom: 46px;

    .data-input-box {
      height: 105px;
    }

    @media (max-width: 992px) {
      margin-bottom: 17px;
    }

    @media (max-width: 768px) {
      margin-bottom: 0px;

      .data-input-box {
        margin-bottom: 30px;
      }
    }
  }

  .second-row {
    margin-bottom: 76px;

    .data-input-box {
      height: 250px;
    }

    @media (max-width: 768px) {
      margin-bottom: 46px;

      .data-input-box {
        margin-bottom: 30px;
      }
    }
  }

  .validation-error {
    color: #525f7f;
    font-size: 14px;
  }

  .verified-status {
    margin-bottom: 10px;
    color: $successColor;
    font-size: 23px;
    font-weight: 600;

    img {
      margin-right: 11px;
      padding-bottom: 2px;
    }
  }

  .verify-clear {
    cursor: pointer;
    color: #aaaaaa;
    margin-bottom: 25px;

    &:hover {
      opacity: 0.7;
    }
  }
</style>
