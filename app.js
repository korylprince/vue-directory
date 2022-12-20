import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"
import Vue from "vue"
import Vuetify from "vuetify/lib/framework"
import colors from "vuetify/lib/util/colors"

import App from "./app.vue"

Vue.use(Vuetify)

export default function directory_init(selector, url, building) {
    new Vue({
        vuetify: new Vuetify({
            theme: {
                themes: {
                    light: {
                        primary: "#003595",
                        secondary: "#cf102d",
                        accent: "#5d83d6",
                        anchor: "#5d83d6",
                    },
                },
            },
        }),
        render: h => h(App, {props: {directoryUrl: url, filterBuilding: building}}),
    }).$mount(selector)
}

if (process.env.NODE_ENV === "development") {
    directory_init("#app", "/directory/directory.json")
}
