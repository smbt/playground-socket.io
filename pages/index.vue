<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <div class="text-center"></div>
            <v-card>
                <v-card-title class="headline"> Card Title</v-card-title>
                <v-card-text> Card Text</v-card-text>
                <v-card-actions>
                    <v-btn color="primary" nuxt to="/inspire">
                        Card Action
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    components: {},
}
</script>
