<template>
  <div class="quote-section">
    <blockquote class="mx-auto">
      <p>
        <i>{{ quote[0].name }}</i>
      </p>
    </blockquote>
    <b class="quote"
      >-- <i>{{ quote[0].auth }}</i> &nbsp; (<small
        class="ml-1"
        style="z-index:50;font-size:0.9em; font-weight: normal;"
      >
        <img
          src="https://theysaidso.com/branding/theysaidso.png"
          height="20"
          width="20"
          alt="theysaidso.com"
        />
        <a
          href="https://theysaidso.com"
          title="Powered by quotes from theysaidso.com"
          style="color: #ccc; margin-left: 4px; vertical-align: middle;"
        >
          They Said So®
        </a> </small
      >)</b
    >
  </div>
</template>

<script>
export default {
  name: "quote-section",
  data() {
    return {
      quote: []
    };
  },
  created() {
    //Run when the page is creaed.
    fetch("http://quotes.rest/qod.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.quote.push({
          name: data.contents.quotes[0].quote,
          auth: data.contents.quotes[0].author
        });
      });
  }
};
</script>

<style lang="scss" scoped>
blockquote {
  width: 700px;
  quotes: "\201C""\201D""\2018""\2019";
}
blockquote::before {
  color: #ccc;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
blockquote::after {
  color: #ccc;
  content: close-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-left: 0.25em;
  vertical-align: -0.4em;
}
blockquote p {
  font-family: "Lacquer", cursive;
  display: inline;
  color: #959699;
  font-size: 24px;
}
.quote {
  color: #c4c4c4;
  position: relative;
  top: -20px;
  left: 200px;
}
</style>
