<template>
    <div >
        <div class="col-md-12 control-section">
            <div class="content-wrapper">
                <ejs-schedule id='Schedule' height="650px" 
                    :selectedDate='selectedDate' :currentView='currentView' 
                    :eventSettings='eventSettings'
                    :group='group' :eventRendered="oneventRendered"
                    :eventClick="onEventClick" :popupOpen="onPopupOpen">
                    <e-views>
                        <e-view option="TimelineDay"></e-view>
                        <e-view option="TimelineMonth"></e-view>
                        <e-view option="Agenda"></e-view>
                    </e-views>
                    <e-resources>
                        <e-resource 
                        field='TaskId' 
                        title='Employee' 
                        name='Employees' 
                        :dataSource='users' 
                        :allowMultiple='allowMultiple'
                        textField='firstName' 
                        idField='id' 
                        colorField='color'>
                        </e-resource>
                    </e-resources>    
                </ejs-schedule>
            </div>
        </div>
    </div>
</template>
<style>
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-buttons/styles/material.css';
@import '@syncfusion/ej2-calendars/styles/material.css';
@import '@syncfusion/ej2-dropdowns/styles/material.css';
@import '@syncfusion/ej2-inputs/styles/material.css';
@import '@syncfusion/ej2-navigations/styles/material.css';
@import '@syncfusion/ej2-popups/styles/material.css';
@import '@syncfusion/ej2-vue-schedule/styles/material.css';
</style>

<script>
    import Vue from "vue"
    import { extend } from '@syncfusion/ej2-base'
    import { SchedulePlugin, Agenda, TimelineViews, TimelineMonth} from "@syncfusion/ej2-vue-schedule"
    import { functions } from "firebase";
    // import { SchedulePlugin, Agenda, TimelineViews, TimelineMonth, Resize, DragAndDrop } from "@syncfusion/ej2-vue-schedule"
    Vue.use(SchedulePlugin)

    export default Vue.extend({
        data: function () {
            return {
                eventSettings: {
                    dataSource: this.generateData(),
                },
                readonly: true,
                selectedDate: new Date(),
                currentView: 'TimelineMonth',
                allowMultiple : true,
                group: {
                    resources: ['Employees']
                },
                // readonly: this.editHolidays(),

            }
        },
        provide: {
            schedule: [Agenda, TimelineViews, TimelineMonth]
            // schedule: [Agenda, TimelineViews, TimelineMonth, Resize, DragAndDrop]

        },
        methods: {
            generateData: function () {
                return this.$store.getters.loadedHolidays
            },
            isReadOnly: function (dataObj) {
                let data = dataObj;
                return data.ReadOnly || (data.StartTime < new Date());
            },
            onEventClick: function (args) {
                if ((args.element).classList.contains('e-read-only')) {
                    args.cancel = true;
                }
            },
            onPopupOpen: function (args) {
                if (args.type === 'Editor' && this.isReadOnly(args.data)) {
                    args.cancel = true;
                }
            },
            oneventRendered: function (args) {
                if (this.isReadOnly(args.data)) {
                    args.element.setAttribute('aria-readonly', 'true');
                    args.element.classList.add('e-read-only');
                }
            }
        },
        computed: {
            users(){
                console.log(this.$store.getters.loadedEmployees)
                return this.$store.getters.loadedEmployees 
            },
            holidays(){
                return this.$store.getters.loadedHolidays 
            }
      
    },
    })
</script>