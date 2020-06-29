<template>
    <b-navbar type="dark" :variant="variant">
        <b-navbar-nav>
          <router-link to="/" tag="b-nav-item">Hauptseite</router-link>
          <router-link to="/form" tag="b-nav-item">Neues Dokument</router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item right @click="onClick">Ausloggen</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import service from '@/service';

export default {
    computed: {
      variant() {
        return this.$store.getters.variant
      }
    },
    methods: {
      async onClick() {
        service.logout()
        .then(() => {
          // Navigate back to startpage
          this.$store.dispatch('toggle')
          this.$router.push('/login')
        })
      }
    }
}
</script>