<template>
  <b-container id="login">
    <b-row>
      <b-col align-self="center" cols="12">
        <b-form @submit="onSubmit">
            <b-form-group
                label="Email:"
                label-cols-sm="4"
                label-cols-lg="3"
            >
                <b-form-input
                v-model="form.email"
                type="email"
                required
                placeholder="Email eingeben"
                autocomplete="email"
                maxlength="50"
                ></b-form-input>
            </b-form-group>

            <b-form-group 
                label="Kennwort:"
                label-cols-sm="4"
                label-cols-lg="3"
            >
                <b-form-input
                v-model="form.password"
                type="password"
                required
                placeholder="Kennwort eingeben"
                autocomplete="password"
                maxlength="100"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" :variant="variant">Einloggen</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import service from '@/service';

  export default {
    data() {
      return {
        form: {
        }
      }
    },
    computed: {
      variant() {
        return this.$store.getters.variant
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        service.login(this.form)
        .then((result) => {
          if (result.accesstoken) {
            this.$store.dispatch('toggle');
            this.$router.push('/')
          } else {
            alert(result.error)
          }
        })
      }
    }
  }
</script>

<style scoped>
#login {
  padding: 260px 300px;
}
</style>