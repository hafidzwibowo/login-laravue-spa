<template>
<div >
   <b-navbar toggleable="lg" type="light" variant="warning" bg-info class="header">
    <b-button  aria-modal="false" v-b-toggle.sidebar-1 variant="outline 0">
<b-icon icon ="caret-right-fill"  variant="outline 0"></b-icon>
    </b-button>
    <b-navbar-brand href="#">Login System</b-navbar-brand>
    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <b-icon icon ="person"  variant="outline 0"></b-icon>
          </template>
          <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
          <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> 
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
      methods: {
        logout() {
            axios.post('/logout').then(resp => {
                this.$store.dispatch('setLogin', { status: false, data: {} })
                this.$router.push({ name: 'Login' })
            })
        }
    }  
}
</script>
<style>
    .header {
        /* height: 100px; */
        display: flex;
        /* align-items: center;
        justify-content: center; */
    }
</style>