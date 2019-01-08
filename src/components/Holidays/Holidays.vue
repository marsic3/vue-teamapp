<template>
    <div>
        <div class="col-md-12 control-section" style="margin:80px; margin-left:330px; padding-right:50px;  width: 1050px">
            <div class="content-wrapper">
                <ejs-schedule   id='Schedule' height="650px" :selectedDate='selectedDate' :currentView='currentView' :eventSettings='eventSettings'
                    :group='group'>
                    <e-views>
                        <e-view option="TimelineDay"></e-view>
                        <e-view option="TimelineWeek"></e-view>
                        <e-view option="TimelineWorkWeek"></e-view>
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
    import { resourceData, timelineResourceData } from './datasource'
    import { SchedulePlugin, Agenda, TimelineViews, TimelineMonth, Resize, DragAndDrop } from "@syncfusion/ej2-vue-schedule"
    Vue.use(SchedulePlugin)

    export default Vue.extend({
        data: function () {
            return {
                eventSettings: {
                    dataSource: this.generateData()
                },
                selectedDate: new Date(2018, 3, 4),
                currentView: 'TimelineWeek',
                allowMultiple : true,
                group: {
                    resources: ['Employees']
                },
                employeeDataSource: [
                    { text: 'Nancy', id: 1, color: '#df5286' },
                    { text: 'Steven', id: 2, color: '#7fa900' },
                    { text: 'Robert', id: 3, color: '#ea7a57' },
                    { text: 'Smith', id: 4, color: '#5978ee' },
                    { text: 'Micheal', id: 5 , color: '#df5286' },
                    { text: 'Root', id: 6, color: '#00bdae' }
                ],
            }
        },
        provide: {
            schedule: [Agenda, TimelineViews, TimelineMonth, Resize, DragAndDrop]
        },
        methods: {
            generateData: function () {
                var collections = []
                var dataCollections = [resourceData, timelineResourceData]
                for (var i = 0; i < dataCollections.length; i++) {
                    collections = collections.concat(dataCollections[i])
                    console.log('concat =>'+collections.length)
                }
                return collections
            },
        },
        computed: {
            users(){
                console.log(this.$store.getters.loadedEmployees)
                return this.$store.getters.loadedEmployees 
            },
      
    },
    })
</script>