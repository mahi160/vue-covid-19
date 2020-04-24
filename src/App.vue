<template>
  <div id="app">
    <div id="title-bar">
      <div id="title-bar-btns">
        <b-icon-x id="close-btn" @click="closeW()"></b-icon-x>
      </div>
    </div>
    <login-page @get-cc="getHome()" v-if="!noLogin"></login-page>
    <div id="nav">
      <div style="width:204px"></div>
      <div>
        <router-link to="/countries"
          ><span @click="show()">Countries</span></router-link
        >
        |
        <router-link to="/world"
          ><span @click="show()">World</span></router-link
        >
        <!--| <router-link to="/about"
          ><span @click="show()">About</span></router-link
        >-->
        |
        <router-link to="/">
          <span @click="getHome()">
            <b-icon-geo-alt></b-icon-geo-alt> {{ countryCode }}</span
          >
        </router-link>
      </div>
      <div style="width:204px" v-if="!noLogin"></div>
      <div style="width:204px" v-if="noLogin">
        <small>Last update: {{ dateData | timeAgo }}</small>
      </div>
    </div>
    <div id="nav-logo">Covid-19</div>

    <!--HOMELAND-->
    <vue-page-transition name="fade-in-up" v-if="showCards">
      <b-container>
        <b-row class="justify-content-center mt-1 mb-2">
          <h1>{{ homeLand | capitalize }}</h1>
          <img :src="flagUrl" alt="flag" class="flag" />
        </b-row>
        <b-row class="justify-content-center">
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
    </vue-page-transition>

    <vue-page-transition :name="transitionName" v-if="showRoutes">
      <router-view />
    </vue-page-transition>
  </div>
</template>

<script>
import DataSummary from "@/mixins/DataSummary";
import LoginPage from "@/components/LoginPage";
import ViewCard from "@/components/ViewCard";

import { remote } from "electron";

export default {
  name: "App",
  mixins: [DataSummary],
  components: {
    ViewCard,
    LoginPage,
  },
  data() {
    return {
      noLogin: localStorage.getItem("showLogin"),
      showRoutes: localStorage.getItem("showLogin"),
      showCards: localStorage.getItem("showCards"),
      homeLand: localStorage.getItem("home"),
      countryCode: localStorage.getItem("cc"),
      transitionName: "fade-in-up",
      cases: [
        // IMAGE: https://www.boredpanda.com/i-discovered-digital-art-and-revived-the-artist-in-me/?utm_source=duckduckgo&utm_medium=referral&utm_campaign=organic
        {
          id: 1,
          title: "Confirmed",
          numberToday: localStorage.getItem("numberTodayC"),
          numberTotal: localStorage.getItem("numberTotalC"),
          img: require("./assets/bear.jpg"),
          color: "#e58e26",
          change: 2,
        },
        {
          id: 2,
          title: "Recovered",
          numberToday: localStorage.getItem("numberTodayR"),
          numberTotal: localStorage.getItem("numberTotalR"),
          img: require("./assets/horse.jpg"),
          color: "#079992",
        },
        {
          id: 3,
          title: "Deaths",
          numberToday: localStorage.getItem("numberTodayD"),
          numberTotal: localStorage.getItem("numberTotalD"),
          img: require("./assets/wolf.jpg"),
          color: "#b71540",
        },
      ],
      flagUrl: localStorage.getItem("flag"),
    };
  },

  methods: {
    getHome() {
      const x = localStorage.getItem("home");
      this.homeLand = x;
      const i = this.countriesData
        .map((e) => {
          return e.Country;
        })
        .indexOf(x);

      this.countryCode = this.countriesData[i].CountryCode;
      localStorage.setItem("cc", this.countriesData[i].CountryCode);

      this.flagUrl = `https://www.countryflags.io/${this.countriesData[i].CountryCode}/shiny/64.png`;
      localStorage.setItem("flag", this.flagUrl);
      const urlTotal = `https://api.covid19api.com/total/country/${this.countriesData[i].Slug}`;
      fetch(urlTotal)
        .then((res) => {
          return res.json();
        })
        .then((dataCon) => {
          const x = dataCon.length - 1;
          this.cases[0].numberTotal = dataCon[x].Confirmed;
          localStorage.setItem("numberTotalC", this.cases[0].numberTotal);

          this.cases[0].numberToday =
            dataCon[x].Confirmed - dataCon[x - 1].Confirmed;
          localStorage.setItem("numberTodayC", this.cases[0].numberToday);

          this.cases[1].numberTotal = dataCon[x].Recovered;
          localStorage.setItem("numberTotalR", this.cases[1].numberTotal);

          this.cases[1].numberToday =
            dataCon[x].Recovered - dataCon[x - 1].Recovered;
          localStorage.setItem("numberTodayR", this.cases[1].numberToday);

          this.cases[2].numberTotal = dataCon[x].Deaths;
          localStorage.setItem("numberTotalD", this.cases[2].numberTotal);

          this.cases[2].numberToday = dataCon[x].Deaths - dataCon[x - 1].Deaths;
          localStorage.setItem("numberTodayD", this.cases[2].numberToday);
        });
      this.noLogin = true;
      this.showRoutes = false;
      this.showCards = true;
    },
    show() {
      this.showCards = false;
      this.showRoutes = true;
    },
    closeW() {
      const win = remote.getCurrentWindow();
      win.close();
    },
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lemonada|Poppins&display=swap");

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Poppins, serif;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-image: linear-gradient(
      45deg,
      transparent 0%,
      transparent 55%,
      rgba(64, 64, 64, 0.04) 55%,
      rgba(64, 64, 64, 0.04) 76%,
      transparent 76%,
      transparent 100%
    ),
    linear-gradient(
      135deg,
      transparent 0%,
      transparent 14%,
      rgba(64, 64, 64, 0.04) 14%,
      rgba(64, 64, 64, 0.04) 41%,
      transparent 41%,
      transparent 100%
    ),
    linear-gradient(
      45deg,
      transparent 0%,
      transparent 2%,
      rgba(64, 64, 64, 0.04) 2%,
      rgba(64, 64, 64, 0.04) 18%,
      transparent 18%,
      transparent 100%
    ),
    linear-gradient(
      135deg,
      transparent 0%,
      transparent 61%,
      rgba(64, 64, 64, 0.04) 61%,
      rgba(64, 64, 64, 0.04) 71%,
      transparent 71%,
      transparent 100%
    ),
    linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255));
}

#nav-logo {
  min-width: 60px;
  font-size: 42px;
  opacity: 0.7;
  font-family: Lemonada, serif;
  position: absolute;
  top: 20px;
  left: 20px;
}

#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  position: relative;
  top: -32px;

  a {
    font-weight: bold;
    font-size: 20px;
    color: #95a5a6;
    margin: 0px 10px;
    text-decoration: none;
    transition: 300ms;

    &.router-link-exact-active {
      color: #341f97;
    }

    &:hover {
      padding: 5px;
      text-decoration: underline;
    }
  }
}

.flag {
  width: 22px;
  height: 22px;
  border-radius: 45%;
}

#title-bar {
  -webkit-app-region: drag;
  height: 40px;
}

#title-bar-btns {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 5px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
  z-index: 999;
}
</style>
