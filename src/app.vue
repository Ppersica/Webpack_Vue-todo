<template>
  <div id="app">
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
<script>
import "./assets/styles/test.css";
import Header from "./container/header.vue";
import Footer from "./container/footer.vue";
import Todo from "./container/todo.vue";
export default {
  components: {
    Header,
    Footer,
    Todo,
  },
};
</script>
<style>
#app{
    opacity: 0.8;
}
</style>

