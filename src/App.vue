<template>
  <div id="app">
    <login-page @submit="submit" :homeLand=homeLand v-show="showLogin"></login-page>
    <div id="nav">
      <div style="width:204px"></div>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/world">World</router-link> |
        <router-link to="/about">About</router-link> |
        <a>
          <b-icon-geo-alt @click="getCC()"></b-icon-geo-alt>
          {{ countryCode }}</a
        >
      </div>
      <div style="width:204px"></div>
    </div>
    <div id="nav-logo">Covid-19</div>
    
    <vue-page-transition :name="transitionName">
      <router-view />
    </vue-page-transition>
  </div>
</template>

<script>
import DataSummary from "@/mixins/DataSummary";
import LoginPage from "@/components/LoginPage"
export default {
  mixins: [DataSummary],
  components: {
    LoginPage
  },
  data() {
    return {
      showLogin: true,
      homeLand: "",
      countryCode: "",
      transitionName: "fade-in-up"
    };
  },

  methods: {
    getCC() {
      const i = this.countriesData
        .map(e => {
          return e.Country;
        })
        .indexOf(this.homeLand);
      this.countryCode = this.countriesData[i].CountryCode;
      this.showLogin = false
    },
    submit() {
      this.getCC()
    },
    
  }
  /* watch: {
    $route(to, from) {
      console.log(to, from);

      if (
        (from.name == "Home" && to.name == "World") ||
        (from.name == "World" && to.name == "About")
      ) {
        this.transitionName = "fade-in-down";
      } else {
        this.transitionName = "fade-in-right";
      }
    },
  },*/
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
</style>
