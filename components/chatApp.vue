<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8">
                <v-card>
                    <v-card-title>Messages in room</v-card-title>
                    <v-card-text>
                        <div v-if="chatHistory.length">
                            <div
                                v-for="(entry, index) in chatHistory"
                                :key="index"
                            >
                                <StatusMessage
                                    v-if="!entry.message"
                                    :entry="entry"
                                />
                                <ChatMessage v-else :entry="entry" />
                            </div>
                        </div>
                        <div v-else>No messages yet</div>
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
                            ref="messageInput"
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

import ChatMessage from '~/components/chatMessage'
import StatusMessage from '~/components/statusMessage'

export default {
    data() {
        return {
            userName:
                this.$store.state.loggedInUser.firstName +
                ' ' +
                this.$store.state.loggedInUser.lastName,
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
            const userName = this.userName
            const message = this.message

            this.socket.emit('message-from-user', userName, message)

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
        beforeUnload() {
            this.socket.emit('leave', this.userName)
        },
    },
    created() {
        this.socket.on('user-joined', (userName) => {
            this.chatHistory.push({
                userName,
                type: 'join',
            })
        })

        this.socket.on('message-from-server', (userName, message) => {
            this.chatHistory.push({
                userName,
                message,
            })
        })

        this.socket.on('user-left', (userName) => {
            this.chatHistory.push({
                userName,
                type: 'leave',
            })
        })
    },
    mounted() {
        this.socket.emit('join', this.userName)
        this.$refs.messageInput.focus()
        document.addEventListener('beforeunload', this.beforeUnload)
    },
    components: { ChatMessage, StatusMessage },
}
</script>
