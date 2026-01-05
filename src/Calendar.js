export default function Calendar({ data }) {

    const currMonth = "January"
    const currYear = "2026"

    const table = [];
    for (let week_id = 0; week_id <= 4; week_id++) {
        (week_id) < 4 ?
        (table.push(
            <tr key={week_id}>
                {[1,2,3,4,5,6,7].map(col => {
                    let day_id = week_id*7 + col;
                    let dateStr = `${currYear}-1-${day_id}`
                    return (
                        <td
                            key={day_id}>
                            #{day_id}
                            <ul>
                                {
                                    data.filter(day => day.date === dateStr).map(day => {
                                        return <li key={day.date}>{day.description}</li>
                                    })
                                }
                            </ul>
                        </td>
                    );
                })}
            </tr>
        )) : 
        (table.push(
            <tr>
                {[1,2,3].map(col => {
                    let day_id = week_id*7 + col;
                    let dateStr = `${currYear}-1-${day_id}`
                    return (
                        <td 
                            id={day_id}
                            key={day_id}>
                            #{day_id}
                            <ul>
                                {
                                    data.filter(day => day.date === dateStr).map(day => {
                                        return <li key={day.date}>{day.description}</li>
                                    })
                                }
                            </ul>
                        </td>
                    );
                })}
            </tr>
        ))

    }

    return (
        <table>
                <thead>
                    <tr>
                        <th colSpan="7">
                        {currMonth + " " + currYear}
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