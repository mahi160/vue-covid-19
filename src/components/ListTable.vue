<template>
  <div class="list-table">
    <b-table striped hover sticky-header="700px" :items="countriesData" :fields="fields" :tbody-tr-class="rowClass"></b-table>
  </div>
</template>

<script>
import DataSummaryVue from "@/mixins/DataSummary.vue";
export default {
  name: "list-table",
  mixins: [DataSummaryVue],
  data() {
    return {
      items: [],
      fields: [
        {
          key: "Country",
          sortable: true,
        },
        {
          key: "NewConfirmed",
          sortable: true,
          variant: 'primary'
        },
        {
          key: "TotalConfirmed",
          sortable: true,
          variant: 'primary'
        },
        {
          key: "NewRecovered",
          sortable: true,
          variant: 'success'
        },
        {
          key: "TotalRecovered",
          sortable: true,

          variant: 'success'
        },
        {
          key: "NewDeaths",
          sortable: true,

          variant: 'danger'
        },
        {
          key: "TotalDeaths",
          sortable: true,
          variant: 'danger'
        }
      ]
    };
  },
  methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.Country === localStorage.getItem('home')) return 'table-warning'
      }
    }
};
</script>

<style lang="scss"></style>
