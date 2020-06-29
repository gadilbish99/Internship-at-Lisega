<template>
  <b-container id="login">
    <b-row>
      <b-col align-self="center" cols="12">
        <b-form @submit="onSubmit">
            <b-form-group>
              <b-form-radio-group
                v-model="form.isFasi"
                :options="options"
                required
              ></b-form-radio-group>
            </b-form-group>

            <b-form-group 
                label="Vorname:"
                label-cols-sm="4"
                label-cols-lg="3"
            >
                <b-form-input
                v-model="form.first_name"
                type="text"
                required
                placeholder="Vorname eingeben"
                maxlength="50"
                ></b-form-input>
            </b-form-group>

            <b-form-group 
                label="Nachname:"
                label-cols-sm="4"
                label-cols-lg="3"
            >
                <b-form-input
                v-model="form.last_name"
                type="text"
                required
                placeholder="Nachname eingeben"
                maxlength="50"
                ></b-form-input>
            </b-form-group>

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
                maxlength="100"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" :variant="variant">Absenden</b-button>
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
        form: {},
        options: [
          { text: 'Antragsteller', value: false },
          { text: 'FASi', value: true }
        ]
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
        service.register(this.form)
        .then((result) => {
          if (result.msg) {
            this.$bvModal.msgBoxOk(result.msg)
            .then(() => {
              this.$router.push('/login')
            })
          } else {
              alert(result.error);
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