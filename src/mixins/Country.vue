<script>
export default {
  name: "Country",
  data() {
    return {
      countries: [{}]
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
    fetch("https://api.covid19api.com/countries")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.countries = data.sort(this.dynamicSort("Country"));
      });
  }
};
</script>
