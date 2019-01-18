<template>
    <div>
        <button class="button is-large p-sign-in-with-google" @click="signInWithGoogle">
            <img src="/images/icons/google.svg" />
            Sign in with Google
        </button>
    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.getters.users
            }
        },
        watch: {
            user(value) {
                if(value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },
        methods: {
            signInWithGoogle() {
                this.$store.dispatch('signInWithGoogle')
            }
        }
    }
</script>

