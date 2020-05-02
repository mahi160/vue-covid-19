<template>
  <div class="list-table">
    <b-table
      hover
      no-border-collapse="true"
      head-variant="light"
      sticky-header="700px"
      :items="countriesData"
      :fields="fields"
      :tbody-tr-class="rowClass"
      sort-by="TotalConfirmed"
      sort-direction="desc"
      sort-desc="true"
      style="width: 85%; margin: auto;"
    >
      <template v-slot:cell(pos)="data">
        <span v-if="data.index + 1 < 10">0</span>{{ data.index + 1 }}
      </template>
    </b-table>
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
        { key: "pos", name: "pos", variant: "warning" },
        {
          key: "Country",
          sortable: true,
        },
        {
          key: "TotalConfirmed",
          sortable: true,
          variant: "primary",
        },
        {
          key: "NewConfirmed",
          sortable: true,
          variant: "primary",
        },
        {
          key: "TotalRecovered",
          sortable: true,

          variant: "success",
        },
        {
          key: "NewRecovered",
          sortable: true,
          variant: "success",
        },
        {
          key: "TotalDeaths",
          sortable: true,
          variant: "danger",
        },
        {
          key: "NewDeaths",
          sortable: true,

          variant: "danger",
        },
      ],
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.Country === localStorage.getItem("home")) return "table-warning";
    },
  },
};
</script>

<style lang="scss">
td {
  vertical-align: middle !important;
}
th {
  vertical-align: middle !important;
}
</style>
