<template>
    <v-row>
        <v-col>
            <div class="message" :class="{ myMessage: isMyMessage }">
                {{ isMyMessage ? 'You' : entry.userName }}
                {{ entry.type === 'join' ? 'joined' : 'left' }}.
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
