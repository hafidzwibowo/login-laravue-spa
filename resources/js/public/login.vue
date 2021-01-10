<template>

<div class="d-md-flex h-md-100 align-items-center">

<!-- First Half -->

    <div class="col-md-6 p-0 bg-ylw h-md-100">
        <div class="text-white d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
            <div class="logoarea pt-5 pb-5">
                <div class="content-left">
                    <img class="logo mt-2 mb-0" src='/assets/Logo_white.png'>
                    <h4 class="mb-0 mt-0">Login Page</h4>
                    <p class="mb-3 mt-0">Laravel Vue</p>
                    <p class="font-weight-light">auth with sanctum</p>
                </div>
            </div>
        </div>
    </div>

<!-- Second Half -->

    <div class="col-md-6 p-0 bg-white h-md-100 loginarea">
        <div class="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
            <div class="content-right">
                <form  class="border rounded p-5">
                    <!-- <h3 class='login-text'>Login</h3> -->

                    <b-form-group
            :state="emailState"
            :invalid-feedback="wrongEmail"
            >
                <b-form-input @input="emailInput" @keyup.enter="login" @change="emailChange" placeholder="Email address" type="email" v-model="email" :state="emailState" autofocus />
            </b-form-group>
            

            <b-form-group
            :state="passwordState"
            invalid-feedback="Please Enter Your Password"
            >
                <b-form-input @input="passwordInput" @keyup.enter="login" placeholder="Password" type="password" v-model="password" :state="passwordState" />
            </b-form-group>

            <div class="checkbox mb-3 mt-n2">
                <b-form-checkbox type="checkbox" v-model="remember"> Remember me</b-form-checkbox>
            </div>

            <b-button @click="login" v-if="emailState && passwordState" variant="primary" block size="lg" class="btn-login"><b-spinner v-if="submitting" variant="light" small/>Login</b-button>
            <b-button v-else disabled b-v-tooltip.hover title="invalid login" block size="lg">Login</b-button>
       
                    <div class="row">
                        <p class="forgot-password text-left mt-2 mb-4 col-sm">
                            <router-link to="/forgot-password">Reset Password</router-link>
                        </p>
                        <!-- <p class="forgot-password text-right mt-2 mb-4 col-sm">
                            <router-link to="/register">Register</router-link>
                        </p> -->
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</div>

    
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            remember: null,
            emailState: null,
            passwordState: null,
            wrongEmail: null,
            emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/g,
            submitting: false
        }
    },
    methods: {
        login() {
            if (!this.emailState || !this.passwordState) return
            
            this.submitting = true
            let formData = new FormData
            formData.append('email', this.email)
            formData.append('password', this.password)

            axios.get('/sanctum/csrf').then(resp => {
                axios.post('/login', formData).then(resp => {
                    console.log('login attempt',resp)
                    if ( resp.data.status) {
                        this.$store.dispatch('setLogin', { status: true, data: resp.data.result })
                        this.$router.push({ name: 'Dashboard' })
                    } else {
                        this.emailState = false
                        this.wrongEmail = resp.data.reason
                    }

                    this.submitting = false
                }).catch(err => {
                    this.submitting = false
                })
            })
        },
        emailInput() {
            if ( this.email.length > 0 ) {
                this.emailState = true
                this.wrongEmail = null
            } else {
                this.emailState = false
                this.wrongEmail = 'Please Enter Your Email'
            }
        },
        emailChange() {
            if ( this.emailReg.test(this.email) ) {
                this.emailState = true
                this.wrongEmail = null
            } else {
                this.emailState = false
                this.wrongEmail = 'Wrong Email!'
            }
        },
        passwordInput() {
            this.passwordState = this.password.length > 0
        }
    }

}
</script>

<style scoped>
    .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    }
    .form-signin .checkbox {
    font-weight: 400;
    }
    .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    }
    .form-signin .form-control:focus {
    z-index: 2;
    }
    .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    }

    .login-wrapper {
        display: flex;
        width: 100vw;
        height: 100vh;
    }
    .btn-login {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;
    }
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    @media (min-width: 768px) {
    .h-md-100 { height: 100vh; }
}
    .btn-round { border-radius: 30px; }
    .bg-ylw { background: rgb(255, 196, 0); }
    .text-cyan { color: #35bdff; }

    .logo {
        height: 25%;
        width: 25%;
    }
</style>