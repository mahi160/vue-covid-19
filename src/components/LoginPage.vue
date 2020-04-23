<template>
  <div class="login-page">
    <div class="image"></div>

    <div class="login-card">
      <b-card
        title="Covid -19 Statistics"
        tag="login"
        class="mb-2 align-items-center"
      >
        <b-card-text>
          <b-col class="justify-content-center mt-4 mb-1">
            <autocomplete
              :search="search"
              placeholder="Enter Your Current Location"
              aria-label="Home Country"
              @submit="submit"
            ></autocomplete>
          </b-col>
          <small style="display:inline-block;width: 365px">
            Please enter the country you're currently staying. You can only
            enter this
            <span style="color: red">ONCE</span>!
          </small>
        </b-card-text>

        <button class="btn subBtn" @click="getCC()">Submit</button>
      </b-card>
    </div>
    <quote-section class="quote"></quote-section>
  </div>
</template>

<script>
import DataSummary from "@/mixins/DataSummary";
import QuoteSection from "./QuoteSection";
export default {
  name: "login-page",
  components: {
    QuoteSection,
  },
  props: {
    homeLand: String,
  },
  mixins: [DataSummary],
  methods: {
    getCC() {
      this.$emit("get-cc");
    },
    search(input) {
      const country = [];
      for (let i = 0; i < this.countriesData.length; i++) {
        country.push(this.countriesData[i].Country);
      }

      if (input.length < 1) {
        return [];
      }
      return country.filter((country) => {
        return country.toLowerCase().startsWith(input.toLowerCase());
      });
    },
    submit(x) {
      this.homeLand = x;
      this.$emit('submit', this.homeLand)
    },
  },
};
</script>

<style lang="scss" scoped>
.login-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;

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

  filter: blur(4px);
  -webkit-filter: blur(4px);
  opacity: 0.5;
}
.card {
  width: 500px;
  height: 300px;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  transition: 0.4s;
  position: absolute;
  top: 90px;
  left: calc(50% - 250px);
  z-index: 101;
  background-image: repeating-linear-gradient(
      135deg,
      rgba(86, 86, 86, 0.02) 0px,
      rgba(86, 86, 86, 0.02) 22px,
      rgba(202, 202, 202, 0.02) 22px,
      rgba(202, 202, 202, 0.02) 67px,
      rgba(247, 247, 247, 0.02) 67px,
      rgba(247, 247, 247, 0.02) 113px,
      rgba(135, 135, 135, 0.02) 113px,
      rgba(135, 135, 135, 0.02) 132px,
      rgba(157, 157, 157, 0.02) 132px,
      rgba(157, 157, 157, 0.02) 153px,
      rgba(53, 53, 53, 0.02) 153px,
      rgba(53, 53, 53, 0.02) 171px,
      rgba(17, 17, 17, 0.02) 171px,
      rgba(17, 17, 17, 0.02) 181px,
      rgba(179, 179, 179, 0.02) 181px,
      rgba(179, 179, 179, 0.02) 220px
    ),
    repeating-linear-gradient(
      135deg,
      rgba(58, 58, 58, 0.02) 0px,
      rgba(58, 58, 58, 0.02) 41px,
      rgba(198, 198, 198, 0.02) 41px,
      rgba(198, 198, 198, 0.02) 60px,
      rgba(176, 176, 176, 0.02) 60px,
      rgba(176, 176, 176, 0.02) 99px,
      rgba(173, 173, 173, 0.02) 99px,
      rgba(173, 173, 173, 0.02) 146px,
      rgba(164, 164, 164, 0.02) 146px,
      rgba(164, 164, 164, 0.02) 167px,
      rgba(179, 179, 179, 0.02) 167px,
      rgba(179, 179, 179, 0.02) 205px,
      rgba(228, 228, 228, 0.02) 205px,
      rgba(228, 228, 228, 0.02) 230px,
      rgba(23, 23, 23, 0.02) 230px,
      rgba(23, 23, 23, 0.02) 241px
    ),
    repeating-linear-gradient(
      135deg,
      rgba(190, 190, 190, 0.02) 0px,
      rgba(190, 190, 190, 0.02) 15px,
      rgba(74, 74, 74, 0.02) 15px,
      rgba(74, 74, 74, 0.02) 45px,
      rgba(98, 98, 98, 0.02) 45px,
      rgba(98, 98, 98, 0.02) 71px,
      rgba(43, 43, 43, 0.02) 71px,
      rgba(43, 43, 43, 0.02) 95px,
      rgba(131, 131, 131, 0.02) 95px,
      rgba(131, 131, 131, 0.02) 118px,
      rgba(21, 21, 21, 0.02) 118px,
      rgba(21, 21, 21, 0.02) 130px,
      rgba(77, 77, 77, 0.02) 130px,
      rgba(77, 77, 77, 0.02) 167px,
      rgba(231, 231, 231, 0.02) 167px,
      rgba(231, 231, 231, 0.02) 189px
    ),
    linear-gradient(90deg, rgb(251, 251, 251), rgb(250, 250, 250));
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
.card-title {
  margin-top: 20px;
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-weight: 600;
  font-size: 32px;
  height: 60px;
}
.quote {
  position: relative;
  z-index: 100;
  top: 430px;
  left: unset;
}
.subBtn {
  border: 1.5px solid #c4c4c4;
  border-radius: 18px;
  margin-top: 11px;
  color: #2c3e50;
  width: 100px;
  &:hover {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.16);
  }
}
</style>
