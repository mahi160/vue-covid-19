<template>
  <div class="home">
    <div></div>
    <b-container>
      <b-row class="justify-content-center my-2">
        <h1>Planet Earth</h1>
        <img src="../assets/un.png" alt="flag" class="flag" />
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
      <list-table></list-table>
    </b-container>
  </div>
</template>

<script>
import ViewCard from "@/components/ViewCard";
import ListTable from "@/components/ListTable";

export default {
  name: "Home",
  components: {
    ViewCard,
    ListTable
  },
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
      ]
    };
  },

  created() {
    const urlTotal = `https://api.covid19api.com/summary`;
    fetch(urlTotal)
      .then(res => {
        return res.json();
      })
      .then(dataCon => {
        const x = dataCon.Global;
        this.cases[0].numberTotal = x.TotalConfirmed;
        this.cases[0].numberToday = x.NewConfirmed;
        this.cases[1].numberTotal = x.TotalRecovered;
        this.cases[1].numberToday = x.NewRecovered;
        this.cases[2].numberTotal = x.TotalDeaths;
        this.cases[2].numberToday = x.NewDeaths;
      });
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
  height: 18px;
  border-radius: 20%;
}
</style>
