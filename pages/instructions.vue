<template>
  <div class="container">
    <div class="main-container">
      <div class="row mb-5 pt-5 d-flex">
        <h1 class="col-12 col-sm-6 ">
          How does it work?
        </h1>
        <div class="col-12 col-sm-6 validator-link">
          <nuxt-link class="font-h3" to="/">
            Back to Validator
          </nuxt-link>
        </div>
      </div>
      <div class="instructions-container">
        <div class="instructions-content">
            Here is how Authtrail Validator helps you manually verify Authtrail-processed data against public anchors on the Moonbeam blockchain network.
          <h3 class="instructions-title">
            Data hashing
          </h3>
            Data hashing is used to seal data with a cryptographic fingerprint (hash) anchored on the blockchain network.
            This protects it from unauthorized edits and allows it to be validated in the next step.

          <h3 class="instructions-title">
            How is data hashed?
          </h3>
            In the hashing process, the platform calculates the hash value of entered data using the SHA-256 hashing algorithm.
            The hash value can be viewed as a leaf node on the Merkle tree. The leaf nodes are sorted by a hash value number.
          
          <h3 class="instructions-title">
             Data validation
          </h3>
           In this step, hashed data is checked against blockchain records to verify its authenticity and validity.

           <h3 class="instructions-title">
            How is data verified?
          </h3>
            The data hash is verified against the Merkle proof and the chain of blocks starting from the block containing data up to the first data anchor.
            There are two ways to verify data anchor. First, a public anchor can be obtained from the results of Authtrail Public Explorer. Second, the anchor can be read directly from Moonbeam smart contract by connecting to the Moonbeam network (using (Metamask)).
            The hash outcome is then compared to the value stored on the public ledger.
          <br/>
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
      color: $primary;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
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
      background-color: $bgSecondaryColor;
      box-shadow: $box-shadow;
      padding: 45px 44px 62px 44px;
      border-radius: $br-radius;

      .instructions-title {
        font-weight: 600;
        margin-bottom: 20px;
        margin-top: 38px;
      }
    }
  }
</style>
