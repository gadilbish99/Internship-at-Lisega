<template>
  <b-container id="detail">
    <b-row>
      <b-col>
          <h1>{{main_text}}</h1>
          <b-table stacked :items="items"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import service from '@/service';

export default {
  data() {
    return {
        items: [],
        main_text: "1.	Allgemeine Angaben (Auszufüllen vom Antragsteller)",
        texts: [
          "Antragsteller:",
          "Datum:",
          "Bezeichnung des neuen Stoffes?",
          "Ab wann wird der neue Stoff benötigt?",
          "Warum wird ein neuer Stoff benötigt?",
          "im Haus ist (Gefahrstoffkataster)?",
          "Für welche Gruppe/Abteilung?",
          "Für welchen Arbeitsgang?	",
          "Verantwortlicher Meister?",
          "Dauer der Tätigkeiten:",
          "Verarbeitungstemperatur:",
          "Vorratsmenge am Arbeitsplatz:",
          "Beschreibung des Arbeitsbereichs:",
          "Anlagenart:",
          "Verfahren mit Aerosolbildung:",
          "Unmittelbarer Hautkontakt zu dem Stoff:",
          "Lüftungseinrichtungen:",
          "Wo soll der neue Stoff gelagert werden?",
          "In welchen Gebinden wird der neue Stoff gelagert?",
          "Welche Mengen sollen von dem neuen Stoff gelagert werden?",
        ]
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
      service.fetchForm(this.id)
      .then(result => {
          const feed = {}
          const date = new Date(result.date)
          for (let i = 0; i < this.texts.length; i++) {
              feed[this.texts[i]] = result[Object.keys(result)[i + 1]]
          }
            
          feed["Datum:"] = date.toLocaleDateString() + "\n" + date.toLocaleTimeString()
          this.items = [feed]
      })
      .catch(error => {
        alert(error.response.data)
      })
  }
}
</script>

<style scoped>
#detail {
  padding: 60px 5px;
}
</style>