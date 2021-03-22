<template>
  <div>
    <!-- Identity right sidebar -->
    <v-row>
      <v-col cols="12">
        <v-card
          @click="toggleEditRelationalInfo"
        >
          <!-- Relational info -->
          <v-card-text>
            <v-icon>mdi-graph</v-icon>
            {{ relationalInfo }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <!-- Pronouns -->
          <v-card-text>
            <v-icon>mdi-bullhorn-outline</v-icon>
            {{ identity.pronouns }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <!-- Looks -->
          <v-card-text>
            <v-icon>mdi-human</v-icon>
            {{ identity.looks.heightCm | metricToImperial }} | {{ identity.looks.bodyType }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <!-- Background -->
          <v-card-text>
            <v-icon>mdi-earth</v-icon>
            {{ identity.background.ethnicity }} | {{ identity.background.politics }} | {{ identity.background.languages.join(', ') }} | {{ identity.background.education }} | {{ identity.background.employment }} | {{ identity.background.occupation }} ({{ identity.background.employer }}) | {{ identity.background.religion }} ({{ identity.background.religionSeriousness }}) | {{ identity.background.astrologicalSign }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <!-- Lifestyle -->
          <v-card-text>
            <v-icon>mdi-glass-cocktail</v-icon>
            {{ identity.lifestyle.smoking }} | {{ identity.lifestyle.drinking }} | {{ identity.lifestyle.marijuana }} | {{ identity.lifestyle.diet }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <!-- Family -->
          <v-card-text>
            <v-icon>mdi-home-city-outline</v-icon>
            {{ identity.family.children }} | {{ identity.family.pets.join(', ') }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-overlay v-model="overlayEditRelationalInfo">
      <v-card min-width="500px">
        <v-card-title>Basics</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                v-model="orientations"
                :items="orientationChoices"
                label="Orientations"
                @change="setOrientations"
                multiple
                chips
                hint="Pick as many as you like"
                persistent-hint
              ></v-select>
              <v-select
                v-model="genders"
                :items="genderChoices"
                label="Genders"
                @change="setGenders"
                multiple
                chips
                hint="Pick as many as you like"
                persistent-hint
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-select
              v-model="relationshipTypes"
              :items="relationshipTypeChoices"
              label="Relationship Types"
              @change="setRelationshipTypes"
              multiple
              chips
              hint="Pick as many as you like"
              persistent-hint
            ></v-select>

            <v-select
              v-model="relationshipStatus"
              :items="relationshipStatusChoices"
              label="Relationship Status"
              @change="setRelationshipStatus"
            ></v-select>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="toggleEditRelationalInfo">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import Vue from "vue"
import { mapState, mapActions } from "vuex"
import _ from "underscore"

export default Vue.extend({
  name: "RightSidebar",
  computed: {
    ...mapState(["identity"]),
    relationalInfo() {
      return _.filter([
        this.identity.orientations.join(', '),
        this.identity.genders.join(' + '),
        this.identity.relationshipStatus,
        this.identity.relationshipTypes.join(' & ')
      ], a => a.length > 0).join(' | ')
    },

  },
  data() {
    return {
      overlayEditRelationalInfo: false,
      orientations: [],
      genders: [],
      relationshipTypes: [],
      relationshipStatus: "",
      orientationChoices: [
        "Gay",
        "Bisexual",
        "Queer",
        "Lesbian",
        "Straight",
        "Questioning",
        "Demisexual",
        "Asexual",
        "Reciprosexual",
        "Grayromantic",
        "Akioromantic",
        "Heteroflexible",
        "Gray-asexual",
        "Akiosexual",
        "Demiromantic",
        "Aroflux",
        "Pansexual",
        "Homoflexible",
        "Aceflux",
        "Recipromantic"
      ],
      genderChoices: [
        "Woman",
        "Man",
        "Agender",
        "Genderfluid",
        "Hijra",
        "Other",
        "Transgender",
        "Two Spirit",
        "Cis Woman",
        "Cis Man",
        "Androgynous",
        "Genderqueer",
        "Intersex",
        "Pangender",
        "Transmasculine",
        "Trans Woman",
        "Trans Man",
        "Bigender",
        "Gender Nonconforming",
        "Non-binary",
        "Transfeminine",
        "Transsexual"
      ],
      relationshipTypeChoices: [
        "Monogamous",
        "Monogamish",
        "Poly",
        "Relationship Anarchy",
        "ENM",
        "Non-monogamous",
        "Swinging",
        "Open",
        "Curious"
      ],
      relationshipStatusChoices: [
        "Single",
        "Married",
        "Betrothed",
        "Engaged",
        "Partnered",
        "It's Complicated",
        "Multi-partnered",
        "It Is A Mystery 🔮",
      ],
    }
  },
  mounted() {
    this.orientationChoices = _.shuffle(this.orientationChoices)
    this.genderChoices = _.shuffle(this.genderChoices)
    this.relationshipTypeChoices = _.shuffle(this.relationshipTypeChoices)
    this.relationshipStatusChoices = _.shuffle(this.relationshipStatusChoices)
    this.relationshipStatus = this.identity.relationshipStatus
    this.genders = this.identity.genders
    this.orientations = this.identity.orientations
    this.relationshipTypes = this.identity.relationshipTypes
  },
  methods: {
    ...mapActions([
      "updateOrientations",
      "updateGenders",
      "updateRelationshipTypes",
      "updateRelationshipStatus"
    ]),
    toggleEditRelationalInfo() {
      this.overlayEditRelationalInfo = !this.overlayEditRelationalInfo
    },
    setOrientations() {
      this.updateOrientations(this.orientations)
    },
    setGenders() {
      this.updateGenders(this.genders)
    },
    setRelationshipTypes() {
      this.updateRelationshipTypes(this.relationshipTypes)
    },
    setRelationshipStatus() {
      this.updateRelationshipStatus(this.relationshipStatus)
    }
  },
  filters: {
    metricToImperial(distanceCmString) {
      let distanceCm = parseFloat(distanceCmString)
      let distanceInches = distanceCm / 2.54
      let distanceFeet = Math.floor(distanceInches / 12)
      distanceInches = Math.round(distanceInches - 12 * distanceFeet)
      return `${distanceFeet} ft ${distanceInches} in`
    }
  }
})
</script>
