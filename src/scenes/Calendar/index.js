import React, { Component } from 'react';

import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { connect } from "react-redux";

import "react-big-calendar/lib/css/react-big-calendar.css"


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const myEventsList = [{
    title: "Holiday",
    start: Date.now(),
    end: Date.now(),
    allDay: true

}];


const MyCalendar = props => (
    <div>
        <BigCalendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2019, 2, 1)}
        />
    </div>
)

class CalendarContainer extends Component {

    /*
     Constructor 
    */
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {

        return (
            <div style={{ margin: 50 }}>
                <MyCalendar />
            </div>
        );
    }
}

//Redux configuration
function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(CalendarContainer);