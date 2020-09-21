<template>
    <div>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8">
                <v-card>
                    <v-card-title>Messages in room</v-card-title>
                    <v-card-text></v-card-text>
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
import { io } from 'socket.io'

export default {
    data() {
        return {
            message: '',
            messageRules: [
                (v) =>
                    v.length <= 150 || 'Name must be less than 150 characters',
            ],
        }
    },
    methods: {
        submit() {
            console.log('submitted')
        },
    },
    created() {
        this.$nuxt.$emit('snackbar', {
            show: true,
            text: 'Logged in',
        })

        const socket = io('http://localhost:6001')
        console.log(socket)

        socket.on('chat-message', (data) => {
            socket.emit()
        })
    },
}
</script>
