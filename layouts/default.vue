<template>
    <v-app dark>
        <v-navigation-drawer v-model="drawer" fixed app>
            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    router
                    exact
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

            <v-toolbar-title v-text="title" />
            <v-spacer />
            {{ this.$store.state.loggedInUser.firstName }}
            {{ this.$store.state.loggedInUser.lastName }}
            <v-avatar color="primary" size="35" style="margin-left: 10px">
                <v-icon> mdi-account-circle</v-icon>
            </v-avatar>
        </v-app-bar>
        <v-main>
            <v-container>
                <nuxt />
            </v-container>
        </v-main>
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
        <v-snackbar
            v-model="snackbar.show"
            top
            style="opacity: 0.75"
            :timeout="1000"
            >{{ snackbar.text }}
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Home',
                    to: '/',
                },
            ],
            right: true,
            rightDrawer: false,
            title: 'Chat app',
            snackbar: {
                show: true,
                text: '',
            },
        }
    },
    created() {
        this.$nuxt.$on('snackbar', ({ show, text }) => {
            this.snackbar = {
                show,
                text,
            }
        })
    },
    beforeDestroy() {
        this.$nuxt.$off('snackbar')
    },
}
</script>
