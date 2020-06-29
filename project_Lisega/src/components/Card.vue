<template>
    <b-card
      :header="substance_name"
      header-tag="header"
      :header-bg-variant="color"
      :border-variant="color"
      header-text-variant="white"
      :footer="date"
      footer-tag="header"
    >
        <b-card-text>Antragsteller: {{applicant}}</b-card-text>
        <b-button-group vertical>
            <b-button :variant="variant" @click="openForm1">Sehen Sie das Formular 1 aus</b-button>
            <b-button :variant="variant" @click="editForm1">Bearbeiten Sie das Formular 1</b-button>
            <b-button :variant="variant" :disabled="isFilled" @click="openForm2" v-if="isFasi">Füllen Sie das Formular 2 aus</b-button>
            <b-button :variant="variant" :disabled="!isFilled" @click="editForm2" v-if="isFasi">Bearbeiten Sie das Formular 2</b-button>
            <b-button :variant="variant" :disabled="!isFilled" @click="generate" v-if="isFasi">PDF erzeugen</b-button>
            <b-button :variant="variant" :disabled="!isGenerated" @click="download">PDF Herunterladen</b-button>
            <b-button variant="danger" @click="deleteDoc" v-if="isFasi">Löschen</b-button>
        </b-button-group>
    </b-card>
</template>

<script>
import download from 'downloadjs';
import service from '@/service';

export default {
    props: {
      feed: Object
    },
    computed: {
      applicant() {
        return this.feed.applicant
      },
      substance_name() {
        return this.feed.substance_name
      },
      date() {
        const date = new Date(this.feed.date)
        return date.toLocaleDateString() + "\n" + date.toLocaleTimeString()
      },
      isFilled() {
        return this.feed.isFilled
      },
      isGenerated() {
        return this.feed.isGenerated
      },
      color() {
        return this.isFilled ? "success" : "danger"
      },
      variant() {
        return this.$store.getters.variant
      },
      isFasi() {
        return this.$store.getters.isFasi
      }
    },
    methods: {
      openForm1() {
        this.$router.push({
          path: '/detail',
          query: {
            id: this.feed.form
          }
        })
      },
      openForm2() {
        this.$router.push({
          path: '/form2',
          query: {
            id: this.feed._id
          }
        })
      },
      generate() {
        service.generateForm(this.feed._id)
        .then(result => {
          this.$bvModal.msgBoxOk(result.msg)
          .then(() => {
            this.$router.go()
          })
        })
      },
      download() {
        service.downloadForm(this.feed._id)
        .then(response => {
           const content = response.headers['content-type'];
           download(response.data, this.feed._id, content)
        })
        .catch(error => alert(error));
      },
      deleteDoc() {
        this.$bvModal.msgBoxConfirm('Sind Sie sicher?')
        .then((isConfirmed) => {
          if (isConfirmed) {
            service.deleteDoc(this.feed._id)
            .then(result => {
              this.$bvModal.msgBoxOk(result.msg)
              .then(() => {
                this.$router.go()
              })
            })
            .catch(error => alert(error));
          }
        })
        
      },
      editForm1() {
        service.fetchForm(this.feed.form)
        .then(result => {
            this.$router.push({
              name: 'form',
              params: {
                result: result,
                id: this.feed._id
              }
            })
        })
      },
      editForm2() {
        service.fetchForm2(this.feed.form2)
        .then(result => {
            this.$router.push({
              name: 'form2',
              params: result
            })
        })
      }
    }
  }
</script>

<style scoped>

</style>