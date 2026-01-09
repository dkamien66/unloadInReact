function daysInCurrentMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDayOfMonth = new Date(year, month+1, 0); // get 0-th day of next month == last day of this month
    return lastDayOfMonth.getDate();
}

export default function Calendar({ data }) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // The goal is to generate an accurate calendar of the current month.
    const currYear = new Date().getFullYear(); // what you expect , 2026
    const currMonth = new Date().getMonth(); // 0-indexed  (0-11)
    const firstDay = new Date(currYear, currMonth, 1); // what i want to use is firstDay.getDay() for index of day of week
    const firstDayIndex = firstDay.getDay(); // 0-6

    const table = [];
    let dayId = 1;
    for (let weekId = 0; weekId <= 4; weekId++) {
        if (dayId > daysInCurrentMonth()) {
            break;
        }

        if (weekId == 0) {
            table.push(
                <tr key={weekId}>
                    {[0,1,2,3,4,5,6].map(col => {
                        if (col < firstDayIndex) {
                            return <td></td>;
                        } else {
                            let dateStr = `${currYear}-${currMonth+1}-${dayId}`;
                            return (
                                <td
                                  key={dayId}>
                                #{dayId++}
                                    <ul>
                                        {
                                            data.filter(day => day.date === dateStr).map(day => {
                                                return <li key={day.id}>{day.description}</li>
                                            })
                                        }
                                    </ul>
                                </td>
                            );
                        }
                    })}
                </tr>
            )
        } else {
            table.push(
                <tr key={weekId}>
                    {[0,1,2,3,4,5,6].map(col => {
                        if (dayId > daysInCurrentMonth()) {
                            return;
                        } else {
                            let dateStr = `${currYear}-${currMonth + 1}-${dayId}`;
                            return (
                                <td
                                  key={dayId}>
                                #{dayId++}
                                    <ul>
                                        {
                                            data.filter(day => day.date === dateStr).map(day => {
                                                return <li key={day.id}>{day.description}</li>
                                            })
                                        }
                                    </ul>
                                </td>
                            );
                        }
                    })}
                </tr>
            );
        }
    }

    return (
        <table>
                <thead>
                    <tr>
                        <th colSpan="7">
                        {months[currMonth] + " " + currYear}
                        </th>
                    </tr>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
      </table>
    );
}