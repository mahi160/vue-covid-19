<script>
export default {
  name: "DataSummary",
  data() {
    return {
      countriesData: [{}],
      globalData: {},
      dateData: "",
      homeLand: ""
    };
  },
  methods: {
    // sorting object by vaule of certain key
    dynamicSort(property) {
      let sortOrder = 1;

      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }

      return function(a, b) {
        if (sortOrder == -1) {
          return b[property].localeCompare(a[property]);
        } else {
          return a[property].localeCompare(b[property]);
        }
      };
    }
  },
  created() {
    const request = async () => {
      const res = await fetch("https://api.covid19api.com/summary");
      const data = await res.json();
      this.globalData = data.Global;
      this.countriesData = data.Countries.sort(this.dynamicSort("Country"));
      this.dateData = data.Date;
    };
    request();
  }
};
</script>
