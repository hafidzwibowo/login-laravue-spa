<template>
    <div class="admin">
        <h1>Dashboard Page</h1>
        <b-button to="/" variant="success">Back to Home</b-button>
        <b-button @click="logout">Logout</b-button>
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
    .admin {
        margin-left: 320px;
        padding: 1rem;
    }
</style>