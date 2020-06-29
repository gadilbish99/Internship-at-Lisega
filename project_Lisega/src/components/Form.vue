<template>
  <b-container id="form">
    <b-row>
      <b-col align-self="center" cols="12">
        <b-form @submit="onSubmit">
          <h1>{{texts[0]}}</h1>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[1]"
          >
            <b-form-input 
              v-model="form.applicant"
              required
              maxlength="50"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[2]"
          >
            <b-form-input 
              v-model="form.date"
              type="date"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[3]"
          >
            <b-form-input 
              v-model="form.substance_name"
              required
              maxlength="100"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[4]"
          >
            <b-form-input 
              v-model="form.date_needed"
              required
              maxlength="50"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[5]"
          >
            <b-form-input 
              v-model="form.reason_needed"
              required
              maxlength="50"
            ></b-form-input>
          </b-form-group>

          {{texts[6]}}

          <b-form-group
            :label="texts[7]"
            required
          >
            <b-form-radio required v-model="form.inHouse" value="Ja">Ja</b-form-radio>
            <b-form-radio required v-model="form.inHouse" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[8]"
          >
            <b-form-input 
              v-model="form.department"
              required
              maxlength="50"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[9]"
          >
            <b-form-input 
              v-model="form.operation"
              required
              maxlength="50"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[10]"
          >
            <b-form-input 
              v-model="form.master"
              required
              maxlength="50"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[11]"
          >
            <b-form-input 
              v-model="form.duration"
              type="number"
              required
              min="0"
              max="1000000"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[12]"
          >
            <b-form-input 
              v-model="form.working_temp"
              type="number"
              min="-273"
              max="1000000"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[13]"
          >
            <b-form-input 
              v-model="form.stock_qty"
              type="number"
              min="1"
              max="1000000"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[14]"
          >
            <b-form-textarea
              v-model="form.description"
              placeholder="Etwas eingeben..."
              rows="3"
              max-rows="6"
              required
              maxlength="300"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            :label="texts[15]"
          >
            <b-form-radio v-for="plant_type in plant_types" :key="plant_type.id" v-model="form.plant_type" :value="plant_type">{{plant_type}}</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[16]"
          >
            <b-form-radio v-model="form.aerosol_method" value="Ja">Ja</b-form-radio>
            <b-form-radio v-model="form.aerosol_method" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[17]"
          >
            <b-form-radio v-model="form.skin_contact" value="Ja">Ja</b-form-radio>
            <b-form-radio v-model="form.skin_contact" value="Nein">Nein</b-form-radio>
          </b-form-group>

          <b-form-group
            :label="texts[18]"
          >
            <b-form-radio v-for="v_equipment in v_equipments" :key="v_equipment.id" v-model="form.v_equipment" :value="v_equipment">{{v_equipment}}</b-form-radio>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[19]"
          >
            <b-form-input 
              v-model="form.material_storage_place"
              required
              maxlength="50"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[20]"
          >
            <b-form-input 
              v-model="form.material_container"
              required
              maxlength="100"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            :label="texts[21]"
          >
            <b-form-input 
              v-model="form.substance_qty"
              type="number"
              min="1"
              max="1000000"
            ></b-form-input>
          </b-form-group>

          <p>
            <b>{{texts[22]}}</b>
          </p>

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
        plant_types: [
          "geschlossen", 
          "teilw. geschlossen",
          "offen",
          "im Freien"
        ],
        v_equipments: [
          "freie Raumlüftung",
          "technische Raumlüftung",
          "örtliche Absaugung",
          "Luftrückführung",
          "Bemerkungen"
        ],
        texts: [
          "1.	Allgemeine Angaben (Auszufüllen vom Antragsteller)",
          "Antragsteller:",
          "Datum:",
          "Bezeichnung des neuen Stoffes?",
          "Ab wann wird der neue Stoff benötigt?",
          "Warum wird ein neuer Stoff benötigt?",
          "Wurde geprüft, ob ein Stoff mit den benötigten Eigenschaften bereits",
          "im Haus ist (Gefahrstoffkataster)?",
          "Für welche Gruppe/Abteilung?",
          "Für welchen Arbeitsgang?	",
          "Verantwortlicher Meister?",
          "Dauer der Tätigkeiten (Std./Schicht):",
          "Verarbeitungstemperatur (°C):",
          "Vorratsmenge am Arbeitsplatz (kg/Ltr):",
          "Beschreibung des Arbeitsbereichs:",
          "Anlagenart:",
          "Verfahren mit Aerosolbildung:",
          "Unmittelbarer Hautkontakt zu dem Stoff:",
          "Lüftungseinrichtungen:",
          "Wo soll der neue Stoff gelagert werden?",
          "In welchen Gebinden wird der neue Stoff gelagert?",
          "Welche Mengen sollen von dem neuen Stoff gelagert werden? (kg)",
          "Ein aktuelles Sicherheitsdatenblatt für den neuen Stoff muß vom Antragsteller diesem Antrag beigefügt werden!"
        ],
        method: 'post',
        formName: 'form'
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
              this.$router.push("/")
            })
          }
          else
            alert(result.error)
        })
      },
      isEmpty(obj){
        return (Object.getOwnPropertyNames(obj).length === 0);
      },
    },
    created() {
      if (!this.isEmpty(this.$route.params)) {
        const data = this.$route.params.result
        const id = this.$route.params.id
        this.form = data
        this.form.date = this.form.date.split('T')[0]
        this.method = 'put'
        this.formName = this.formName + '/' + id
      }
    }
  }
</script>

<style scoped>
#form {
  padding: 60px 5px;
}
</style>