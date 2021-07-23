<template>
  <div>
    <nav
      class="navbar fixed-top px-0"
      :class="[ scrollPosition >= 40 ? 'solid-nav' : 'transparent-nav']"
    >
      <div class="container">
        <a class="navbar-brand" href="https://authtrail.com/" target="_blank" rel="noopener noreferrer">
          <img src="/img/logo.svg" width="166" height="45" class="d-inline-block align-top" alt="">
        </a>
        <b-button 
          variant="primary" 
          href="https://authtrail.com/"
          class="my-2 my-md-0"
        >
          Homepage
        </b-button>
      </div>

    </nav>
    <Nuxt />
    <!-- <footer class="pt-5 pb-5">
      <div class="text-center">
        <div class="at-verified">
          <img src="/img/verified.svg" alt="Verified by AuthTrail" style="max-width: 127px;">
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollPosition: null
    }
  },
  mounted () {
    if (process.browser) {
      window.addEventListener('scroll', this.updateScroll)
    }
  },
  beforeDestroy () {
    if (process.browser) {
      window.removeEventListener('scroll', this.updateScroll)
    }
  },
  methods: {
    updateScroll () {
      if (process.browser) {
        this.scrollPosition = document.documentElement.scrollTop
      }
    }
  }
}
</script>

<style lang="scss">
  .transparent-nav {
    background: transparent;
    padding: 40px 0px;
    transition: background-color 0.15s, padding 0.15s;
  }

  .solid-nav {
    background: white;
    padding: 8px 0px;
    transition: background-color 0.15s, padding 0.15s;
  }
</style>
