<template>
    <v-row>
        <v-col>
            <div class="message" :class="{ myMessage: isMyMessage }">
                <small>
                    <b> {{ isMyMessage ? 'You' : entry.userName }} </b>
                </small>
                <br />
                {{ entry.message }}
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        entry: Object,
    },
    computed: {
        isMyMessage() {
            const myUserName =
                this.$store.state.loggedInUser.firstName +
                ' ' +
                this.$store.state.loggedInUser.lastName
            return this.entry.userName === myUserName
        },
    },
}
</script>
