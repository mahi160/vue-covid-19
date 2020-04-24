<template>
  <div class="countries">
    <div></div>
    <b-container>
      <b-row>
        <b-col justify-content-center>
          <autocomplete
            :search="search"
            placeholder="Search for a country"
            aria-label="Search for a country"
            @submit="submit"
          ></autocomplete>
        </b-col>
      </b-row>
      <b-row class="justify-content-center mt-4 mb-2" v-show="selectedCountry">
        <h1>{{ selectedCountry | capitalize }}</h1>
        <img :src="flagUrl" alt="flag" class="flag" />
      </b-row>
      <b-row class="justify-content-center" v-show="selectedCountry">
        <view-card
          v-for="x in cases"
          :key="x.id"
          :imgUrl="x.img"
          :title="x.title"
          :numberToday="x.numberToday"
          :numberTotal="x.numberTotal"
          :headingColor="x.color"
          :change="x.change"
        ></view-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ViewCard from "@/components/ViewCard";
import DataSummary from "@/mixins/DataSummary";

export default {
  name: "Countries",
  components: {
    ViewCard
  },
  mixins: [DataSummary],
  data() {
    return {
      cases: [
        // IMAGE: https://www.boredpanda.com/i-discovered-digital-art-and-revived-the-artist-in-me/?utm_source=duckduckgo&utm_medium=referral&utm_campaign=organic
        {
          id: 1,
          title: "Confirmed",
          numberToday: 0,
          numberTotal: 0,
          img: require("../assets/bear.jpg"),
          color: "#e58e26",
          change: 2
        },
        {
          id: 2,
          title: "Recovered",
          numberToday: 0,
          numberTotal: 0,
          img: require("../assets/horse.jpg"),
          color: "#079992"
        },
        {
          id: 3,
          title: "Deaths",
          numberToday: 0,
          numberTotal: 0,
          img: require("../assets/wolf.jpg"),
          color: "#b71540"
        }
      ],
      selectedCountry: "",
      flagUrl: ""
    };
  },

  methods: {
    getCountryData(x) {
      this.selectedCountry = x;
      const i = this.countriesData
        .map(e => {
          return e.Country;
        })
        .indexOf(this.selectedCountry);

      this.flagUrl = `https://www.countryflags.io/${this.countriesData[i].CountryCode}/shiny/64.png`;
      const urlTotal = `https://api.covid19api.com/total/country/${this.countriesData[i].Slug}`;
      fetch(urlTotal)
        .then(res => {
          return res.json();
        })
        .then(dataCon => {
          const x = dataCon.length - 1;
          this.cases[0].numberTotal = dataCon[x].Confirmed;
          this.cases[0].numberToday =
            dataCon[x].Confirmed - dataCon[x - 1].Confirmed;
          this.cases[1].numberTotal = dataCon[x].Recovered;
          this.cases[1].numberToday =
            dataCon[x].Recovered - dataCon[x - 1].Recovered;
          this.cases[2].numberTotal = dataCon[x].Deaths;
          this.cases[2].numberToday = dataCon[x].Deaths - dataCon[x - 1].Deaths;
        });
    },

    // searching in search box
    search(input) {
      const country = [];
      for (let i = 0; i < this.countriesData.length; i++) {
        country.push(this.countriesData[i].Country);
      }

      if (input.length < 1) {
        return [];
      }
      return country.filter(country => {
        return country.toLowerCase().startsWith(input.toLowerCase());
      });
    },

    // submitting country from search
    submit(x) {
      this.getCountryData(x);
    }
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-style: italic;
  text-decoration: underline;
  margin-right: 10px;
}
.flag {
  width: 22px;
  height: 22px;
  border-radius: 45%;
}
</style>
