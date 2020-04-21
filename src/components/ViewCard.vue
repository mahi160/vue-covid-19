<template>
  <div class="view-card">
    <!--View Card-->
    <b-col class="card-custom">
      <div class="card_image">
        <img :src="imgUrl" />
      </div>
      <div class="card_heading" :style="{ color: headingColor }">
        {{ title }}
      </div>
      <div class="card-number">
        <div class="card-total">
          <div class="title">Total Cases</div>
          <div class="number">{{ numberTotal }}</div>
        </div>
        <div class="card-today">
          <div class="title">Cases Today</div>
          <div class="number">
            {{ numberToday }}
          </div>
        </div>
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: String,
    numberTotal: Number,
    numberToday: Number,
    imgUrl: String,
    headingColor: String,
    change: Number
  }
};
</script>

<style lang="scss">
.card-custom {
  display: inline-block;
  margin: 20px 20px;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  transition: 0.4s;

  .title {
    text-align: center;
    color: #57606f;
    position: relative;
    z-index: 2;
  }
  .number {
    text-align: center;
    font-size: 42px;
    font-weight: 700;
    position: relative;
    z-index: 2;
    color: #2f3542;
  }

  .card_image {
    width: inherit;
    height: inherit;
    border-radius: 20px;
    position: relative;
    right: 15px;
    img {
      width: inherit;
      height: inherit;
      border-radius: 20px;
      object-fit: cover;
      opacity: 0.3;
      position: relative;
      z-index: 0;
    }
  }
  .card_heading {
    text-align: center;
    border-radius: 0px 0px 40px 40px;
    font-weight: 600;
    font-size: 32px;
    margin-top: -280px;
    height: 60px;
    position: relative;
    z-index: 2;
  }
  &:hover {
    transform: scale(1.02, 1.02);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .arrow {
    position: relative;
    bottom: 45px;
    left: 212px;

    #up {
      color: red;
      .b-icon {
        color: red;
      }
    }
    #down {
      color: green;
    }
    .b-icon {
      color: green;
    }
  }
}
</style>
