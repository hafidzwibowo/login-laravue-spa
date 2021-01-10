<template>
    <div>
        <router-view name="PublicHeader"/>
        <router-view name="AdminSidebar"/>
        <router-view />
        <router-view name="PublicFooter"/>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('checkLogin')
    }
}
</script>