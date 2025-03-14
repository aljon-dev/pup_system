<script lang="ts">
    import { onMount } from 'svelte';
    import { Calendar } from '@fullcalendar/core'; // Import FullCalendar
    import dayGridPlugin from '@fullcalendar/daygrid'; // Import the day grid plugin
    import timeGridPlugin from '@fullcalendar/timegrid'; // Import the time grid plugin
    import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin

    let { data } = $props();

    let calendar: Calendar;
    let calendarEl: HTMLElement;

    onMount(() => {
       
        calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Add plugins
            initialView: 'dayGridMonth', // Set the initial view
            events: data.formattedData, // Pass events from props
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
            editable: true, // Allow events to be editable
            selectable: true, // Allow date selection
            dateClick: (info) => {
                alert(`Date clicked:, ${info.dateStr}`);
            },
            eventClick: (info) => {
                alert(`Event clicked:, ${info.event.title}`);
            },
            eventTimeFormat: {
                hour:'numeric',
                minute:'2-digit',
                meridiem:'short'
            },

        });

        calendar.render();

        
        return () => {
            calendar.destroy();
        };
    });
</script>

<style>
    #calendar {
        width: 100%;
        height: 600px;
        margin: 0 auto;
    }
</style>

<div id="calendar" bind:this={calendarEl}></div>