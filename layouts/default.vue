<template>
  <div>
    <b-navbar
      fixed="top"
      toggleable="md"
      class="px-0"
      :class="[ scrollPosition >= 40 ? 'solid-nav' : 'transparent-nav']"
    >
      <b-container class="px-0375">
        <!-- Logo - mobile -->
        <b-navbar-brand to="/">
          <img src="/img/logo.svg" width="166" height="45" class="d-inline-block align-top" alt="" />
          <h2
            class="d-inline-block mb-0 ml-2"
            style="line-height: 44px;"
          >
            Validator
          </h2>
        </b-navbar-brand>

        <!-- Mobile hamburger -->
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <!-- Links -->
        <b-collapse
          id="nav-collapse"
          is-nav
          class="justify-content-end text-center text-md-left"
        >
          <a href="https://authtrail.com/wp-content/uploads/2021/08/Authtrail-Whitepaper-v1.0.pdf" target="_blank" class="mx-md-4 d-block px-md-3 py-2">Whitepaper</a>
          <b-button 
            variant="primary" 
            href="https://authtrail.com/"
            class="my-2 my-md-0"
          >
            Homepage
          </b-button>
         </b-collapse>
      </b-container>
    </b-navbar>

    <!-- Page content -->
    <div class="container main-container">
      <Nuxt />
    </div>
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

<style lang="scss" scoped>
  @import "../assets/sass/abstracts/variables";

  .transparent-nav {
    background: transparent;
    padding-top: 2rem;
    padding-bottom: 2rem;
    transition: background-color 0.15s, padding 0.15s;

    @media (min-width: 576px) {
      padding-top: 4rem;
    }
  }

  .solid-nav {
    background: $white;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-shadow: 0px 2px 16px $primary-transparent;
    transition: background-color 0.15s, padding 0.15s, box-shadow 0.15s;
  }

  #nav-collapse.show {
    background-color: $white;
  }
</style>
