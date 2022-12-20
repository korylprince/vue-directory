<template>
    <div data-vuetify>
        <v-app>
            <v-container>
                <v-data-iterator
                    :items="filtered"
                    :search="search"
                    :loading="loading"
                    :items-per-page.sync="itemCount"
                >
                    <template #header>
                        <v-text-field
                            v-model="search"
                            clearable
                            flat
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            label="Search"
                            @keydown.esc="search = ''"
                        />
                    </template>

                    <template #default="props">
                        <div v-for="(item, idx) in props.items" :key="idx" class="directory-item">
                            <img v-if="item.photo_url" class="directory-photo" :src="item.photo_url">

                            <v-avatar v-else size="96" class="directory-photo" color="primary">
                                <v-icon dark size="90">
                                    mdi-account-circle
                                </v-icon>
                            </v-avatar>

                            <div class="directory-info">
                                <div class="directory-row-1">
                                    <div class="directory-name">
                                        <a :href="`mailto:${item.email}`">
                                            <v-icon color="primary">mdi-email</v-icon>
                                        </a>
                                        {{ item.first_name }} {{ item.last_name }}
                                    </div>
                                </div>
                                <div class="directory-row-2">
                                    <span class="directory-title">
                                        {{ item.title }}
                                    </span>
                                    <span v-if="item.grade || item.subjects.length > 0"> - </span>
                                    <span class="directory-grade">
                                        {{ item.grade }}
                                    </span>
                                    <span class="directory-subjects">
                                        {{ item.subjects.join(", ") }}
                                    </span>
                                </div>
                                <div class="directory-row-3">
                                    <span class="directory-buildings">
                                        <v-icon>
                                            mdi-domain
                                        </v-icon>
                                        {{ item.buildings.join(", ") }}
                                    </span>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </template>
                </v-data-iterator>
            </v-container>
        </v-app>
    </div>
</template>
<script>
export default {
    props: {
        directoryUrl: {
            type: String,
            required: true,
        },
        filterBuilding: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            loading: true,
            itemCount: 5,
            search: "",
            directory: [],
        }
    },
    computed: {
        building() {
            if (this.filterBuilding != null && this.filterBuilding !== "") {
                return this.filterBuilding
            }
            if (this.query_building != null && this.query_building !== "") {
                return this.query_building
            }
            return null
        },
        query_building() {
            return (new URLSearchParams(window.location.search)).get("building")
        },
        filtered() {
            if (this.building == null) {
                return this.directory
            }
            const items = []
            for (const item of this.directory) {
                for (const building of item.buildings) {
                    if (building === this.building) {
                        items.push(item)
                        break
                    }
                }
            }
            return items
        },
    },
    async created() {
        try {
            const resp = await fetch(this.directoryUrl)
            this.directory = (await resp.json()).directory
            for (const item of this.directory) {
                item.full_name = `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`
            }
        } catch (e) {
            console.error("could not fetch directory:", e)
        } finally {
            this.loading = false
        }
    },
}
</script>
<style lang="sass">
div[data-vuetify]
    display: flex
    overflow-x: inherit
    overflow-y: inherit
    input
        border-style: none !important
        box-shadow: none !important
    .v-application
        width: 100%
        max-width: 800px
        margin: auto
    .container
        padding: 0
    .directory-item
        display: grid
        grid-template-columns: max-content 1fr
        a
            text-decoration: none
        hr
            grid-column: 1 / 3
            margin: 0 15px
            background-color: #aaa
            color: #aaa
            border-color: #aaa
            border: 0
            height: 1px
        img.directory-photo
            width: 96px
            clip-path: circle()
            margin-top: -10px
            margin-bottom: -10px
        .directory-photo
            grid-column: 1
            grid-row: 1
            margin: 5px
            margin-right: 10px
        .directory-info
            grid-column: 2
            grid-row: 1
            display: flex
            flex-direction: column
            justify-content: center
            .directory-row-1, .directory-row-2, .directory-row-3
                display: flex
            .directory-row-1
                font-weight: bold
                font-size: 1.2em
                .v-icon
                    margin-bottom: 2px !important
            .directory-row-2
                display: inline
                font-weight: 600
                color: #666
                margin-left: 28px
                .directory-title, .directory-grade, .directory-subjects, span
                    padding-right: 3px

            .directory-row-3 .v-icon
                margin-bottom: 6px !important
</style>
