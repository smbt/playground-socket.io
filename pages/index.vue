<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8">
                <v-card>
                    <v-card-title>Messages in room</v-card-title>
                    <v-card-text>
                        <ul v-if="chatHistory.length">
                            <li
                                v-for="(entry, index) in chatHistory"
                                :key="index"
                            >
                                {{ entry.userName }} - {{ entry.message }}
                            </li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8">
                <v-card>
                    <v-card-title>Start chatting</v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="message"
                            :rules="messageRules"
                            :counter="150"
                            label="Message"
                            required
                            @keyup.enter="submit"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" nuxt @click="submit">
                            Send
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import io from 'socket.io-client'

export default {
    data() {
        return {
            message: '',
            chatHistory: [],
            messageRules: [
                (v) =>
                    v.length <= 150 || 'Name must be less than 150 characters',
            ],
            socket: io('http://localhost:6001'),
        }
    },
    methods: {
        submit() {
            const userName =
                this.$store.state.loggedInUser.firstName +
                ' ' +
                this.$store.state.loggedInUser.lastName
            const message = this.message

            this.socket.emit('message-from-client', userName, message)

            this.chatHistory.push({
                userName,
                message,
            })

            this.message = ''
        },
        login() {
            this.$nuxt.$emit('snackbar', {
                show: true,
                text: 'Logged in',
            })
        },
    },
    created() {
        this.socket.on('message-from-server', (userName, message) => {
            this.chatHistory.push({
                userName,
                message,
            })
        })
    },
}
</script>