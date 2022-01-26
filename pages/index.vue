<template>
  <div class="container">
    <div class="main-container">
      <div class="row mb-5 pt-5 d-flex">
         <h1 class="col-12 col-sm-8 ">
          Hash and verify data in 2 steps
        </h1>
        <div class="col-12 col-sm-4 instructions-link">
          <nuxt-link class="font-h3" to="/instructions">
            How does it work?
          </nuxt-link>
        </div>
      </div>
      <div class="step-container">
        <h3 class="step-title">
          <strong>Step 1:</strong> Hash data
        </h3>
        <div class="font-body-big">
          Use Authtrail Validator to verify data validity on the blockchain network.
        </div> <br/>
        <HashData
          class="step-content"
          @hashed="handleHashedData($event)"
        />
      </div>
     
      <div id="#second-step" class="step-container">
        <h3 class="step-title">
          <strong>Step 2:</strong> Verify data
        </h3>
        <div class="font-body-big">
          Input the data you get as a result of calling the deep verify route from the API.
        </div> <br/>
        <ValidatateData
          class="step-content"
          :hashed-data="hashedData"
        />
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

  .instructions-link {
    display: flex;
    align-items: flex-end;
    width: 100%;
    justify-content: flex-end;
    padding-bottom: 19px;

    a {
      color: $primary;
      font-weight: 700;
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

  .step-container {
    margin-bottom: 80px;

    .step-title {
      font-weight: 400;
      margin-bottom: 28px;

      strong {
        font-weight: 600;
      }
    }

    .step-content {
      background-color: $bgSecondaryColor;
      padding: 45px 44px 62px 44px;
      box-shadow: $box-shadow;
      border-radius: $br-radius;
    }
  }
</style>
