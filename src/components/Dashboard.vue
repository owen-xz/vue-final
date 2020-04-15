<template>
  <div>
    <Navbar/>
    <Alert></Alert>
    <Sidebar :activeLink="route"></Sidebar>
    <div class="container-fluid">
      <div class="row">
        <main role="main" class=" ml-lg-auto col-lg-10 px-4">
          <router-view @sendRoute="setRoute"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './DashboardSidebar';
import Alert from './AlertMessage'
export default {
  components:{
    Navbar,
    Sidebar,
    Alert
  },
  data () {
    return {
      route: ''
    }
  },
  methods: {
    setRoute(route){
      this.route = route;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>