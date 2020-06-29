<template>
  <b-container id="form2">
    <b-row>
      <b-col align-self="center" cols="12">
        <b-form @submit="onSubmit">
          <h1>{{texts[0]}}</h1>

          <b-form-group
            :label="texts[1]"
            required
          >
            <b-form-radio required v-model="form.isHazardous" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.isHazardous" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[2]"
            required
          >
            <b-form-radio required v-model="form.instRequired" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.instRequired" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[3]"
          >
            <b-form-input 
              v-model="form.label"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[4]"
          >
            <b-form-input 
              v-model="form.duration"
              type="number"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[5]"
          >
            <b-form-input 
              v-model="form.storage_info"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[6]"
          >
            <b-form-input 
              v-model="form.solvent_content"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :label="texts[7]"
            required
          >
            <b-form-radio required v-model="form.protMeasureRequired" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.protMeasureRequired" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[8]"
          >
            <b-form-input 
              v-model="form.protMeasure"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[9]"
          >
            <b-form-input 
              v-model="form.techMeasure"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[10]"
          >
            <b-form-input 
              v-model="form.orgMeasure"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[11]"
          >
            <b-form-input 
              v-model="form.perMeasure"
              required
            ></b-form-input>
          </b-form-group>

          <h1>{{texts[12]}}</h1>

          <b-form-group
            :label="texts[13]"
            required
          >
            <b-form-radio required v-model="form.manual" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.manual" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[14]"
          >
            <b-form-radio v-for="num in nums" :key="num.id" v-model="form.num" :value="num">{{num}}</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[15]"
            required
          >
            <b-form-radio required v-model="form.isChanging" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.isChanging" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[16]"
          >
            <b-form-radio v-for="letter in letters" :key="letter.id" v-model="form.letter" :value="letter">{{letter}}</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[17]"
            required
          >
            <b-form-radio required v-model="form.anyMeasure" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.anyMeasure" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[18]"
          >
            <b-form-input 
              v-model="form.measure"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[19]"
          >
            <b-form-input 
              v-model="form.techMeasure2"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[20]"
          >
            <b-form-input 
              v-model="form.orgMeasure2"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[21]"
          >
            <b-form-input 
              v-model="form.perMeasure2"
              required
            ></b-form-input>
          </b-form-group>

          <h1>{{texts[22]}}</h1>

          <b-form-group
            :label="texts[23]"
            required
          >
            <b-form-radio required v-model="form.isProcured" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.isProcured" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[24]"
          >
            <b-form-input 
              v-model="form.reason"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Absenden</b-button>

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
        },
        nums: [
            1,
            2,
            3
        ],
        letters: [
            "A",
            "B",
            "C",
            "D"
        ],
        texts: [
          "2. Gefährdungsbeurteilung (Auszufüllen von der FASi)",
          "Ist der neue Stoff ein Gefahrstoff?",
          "Betriebsanweisung §14 GefStoffV erforderlich?",
          "Wie ist der Stoff gekennzeichnet?",
          "Zündtemperatur (°C):",
          "Lagerhinweise: ",
          "Lösemittelgehalt (VOC):",
          "Ergeben sich durchzuführende Schutzmaßnahmen gemäß GefStoffV oder des Brandschutzes (zusätzliche Feuerlöscher usw.)?",
          "Wenn ja, welche?",
          "Technische Maßnahmen:",
          "Organisatorische Maßnahmen:",
          "Persönliche Maßnahmen?",
          "3. Angaben zur VAwS (Auszufüllen von der FASi)",
          "Gibt es für die LAU-HBV Anlage eine Betriebsanweisung nach §3 VAwS?",
          "Welche Wassergefährdungsklasse hat der Stoff?",
          "Ändert sich die Wassergefährdungsstufe der LAU-HBV Anlage?",
          "Wenn ja, neu eingestuft in WGS",
          "Ergeben sich Maßnahmen aus der Wassergefährdungsstufe?",
          "Wenn ja, welche?",
          "Technische Maßnahmen:",
          "Organisatorische Maßnahmen:",
          "Persönliche Maßnahmen?",
          "4. Freigabe des Stoffes (Auszufüllen von der FASi)",
          "Der Stoff darf beschafft werden!",
          "Wenn „nein“, warum nicht?",
        ],
        method: 'post',
        formName: 'form2'
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        service.submitForm(this.formName, this.form, this.method)
        .then((result) => {
          if (result.msg) {
            this.$bvModal.msgBoxOk(result.msg)
            .then(() => {
              this.$router.push("/");
            })
          }
          else
            alert(result.error)
        })
      },
      isEmpty(obj){
        return (Object.getOwnPropertyNames(obj).length === 0);
      }
    },
    created() {
      const data = this.$route.params
      if (!this.isEmpty(data)) {
        this.form = data
        this.method = 'put'
        this.formName = this.formName + '/' + data._id
      }
      else {
        this.formName = this.formName + '/' + this.$route.query.id
      }
    }
  }
</script>

<style scoped>
#form2 {
  padding: 60px 5px;
}
</style>