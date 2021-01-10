<template>
    <div class="container">
        <!-- <h1>Welcome to Home</h1> -->

        <b-jumbotron header="HomePage" lead="Welcome to Homepage">
            <p>This is an Auth Build with Laravel Vue SPA</p>
            <p>To see Dashboard please login first</p>
            <b-button v-if="isAdmin" to="/dashboard" variant="primary">Dashboard</b-button>
            <b-button v-else to="/login" variant="success">Login</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    computed: {
        isAdmin() {
            return this.$store.state.isAdmin
        }
    }
}
</script>