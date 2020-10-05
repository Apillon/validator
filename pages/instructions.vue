<template>
  <div class="container">
    <div class="main-container">
      <div class="row mb-5 pt-5 d-flex">
        <h1 class="col-12 col-sm-6 title">
          Instructions
        </h1>
        <div class="col-12 col-sm-6 validator-link">
          <nuxt-link to="/">
            Validator
          </nuxt-link>
        </div>
      </div>
      <div class="instructions-container">
        <div class="instructions-content">
          Instructions for Authtrail validator for manual verification of Authtrail data with public anchors on Ethereum.
          <h3 class="instructions-title">
            Hashing
          </h3>
          The hashing step site calculates the SHA256 hash value of enetered data or document that can be used as leaves
          in the Merkle tree. The leaves are sorted by hash value number.
          <h3 class="instructions-title">
            Validation
          </h3>
          The validation step verifies the hash to the Merkle proof and the chain of blocks from the block where the data exists
          up to the first anchor.
          The resulting hash can then be directly compared to the value stored on the public ledger.
          The public anchor can either be copied from a public explorer, deep verify data or one can connect to Ethereum RPC
          using Metamask and read the anchor directly from Ethereum smart contract.
          <h3 class="instructions-title">
            How it works?
          </h3>
          <img class="how-it-works-img" src="/img/how-it-works.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      hashedData: ''
    }
  },
  methods: {
    handleHashedData (hash: string) {
      this.hashedData = hash
      if (process.browser) {
        const VueScrollTo = require('vue-scrollto')
        const element = document.getElementById('#second-step')
        VueScrollTo.scrollTo(element, 1000)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  @import "../assets/sass/abstracts/variables";

  .how-it-works-img {
    width: 100%;
    height: auto;
  }

  .validator-link {
    display: flex;
    align-items: flex-end;
    width: 100%;
    justify-content: flex-end;
    padding-bottom: 19px;

    a {
      color: $primaryColor;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .main-container {
    margin-top: 130px;
  }

  .title {
    font-size: 70px;
    font-weight: 600;

    @media (max-width: 576px) {
      font-size: 60px;
    }
  }

  .instructions-container {
    margin-bottom: 80px;

    .instructions-content {
      background-color: white;
      box-shadow: 0px 8px 63px #1C325B0F;
      padding: 45px 44px 62px 44px;

      .instructions-title {
        font-weight: 600;
        margin-bottom: 20px;
        margin-top: 38px;
      }
    }
  }
</style>
