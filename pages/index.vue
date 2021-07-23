<template>
  <div class="container">
    <div class="main-container">
      <div class="row mb-5 pt-5 d-flex">
        <h1 class="col-12 col-sm-6 title">
          Validator
        </h1>
        <div class="col-12 col-sm-6 instructions-link">
          <nuxt-link to="/instructions">
            Instructions
          </nuxt-link>
        </div>
      </div>
      <div class="step-container">
        <h3 class="step-title">
          <strong>1. Step</strong> Enter data
        </h3>
        <HashData
          class="step-content"
          @hashed="handleHashedData($event)"
        />
      </div>
      <div id="#second-step" class="step-container">
        <h3 class="step-title">
          <strong>2. Step</strong> Verify data
        </h3>
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
      background-color: white;
      padding: 45px 44px 62px 44px;
      box-shadow: 10px 10px 40px $primary-transparent;
      border-radius: .75rem!important;
    }
  }
</style>
