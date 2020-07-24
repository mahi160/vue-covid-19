<template>
  <div class="details">
    <small
      >Change today: <b-icon-arrow-down></b-icon-arrow-down
      >{{ confirmChange }}</small
    >
    <small>% in World Total: {{ worldPercent }} %</small>
    <small>Rate: {{ rate }}</small>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: {
    rate: Number
  }
};
</script>

<style></style>
