import { Fragment } from 'react' // using Fragment component here because I need to pass a key to <>

function daysInCurrentMonth() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDayOfMonth = new Date(year, month+1, 0); // get 0-th day of next month == last day of this month
    return lastDayOfMonth.getDate();
}

export default function Calendar({ data, setData }) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // The goal is to generate an accurate calendar of the current month.
    const currYear = new Date().getFullYear(); // what you expect , 2026
    const currMonth = new Date().getMonth(); // 0-indexed  (0-11)
    const firstDay = new Date(currYear, currMonth, 1); // what i want to use is firstDay.getDay() for index of day of week
    const firstDayIndex = firstDay.getDay(); // 0-6


    function handleEdit(dayId, entryId) {
        const listItem = document.querySelector(`#filled-${dayId}-${entryId}`);
        const textbox = document.createElement("input");
        textbox.setAttribute("type", "text")
        textbox.setAttribute("value", listItem.innerText);
        textbox.setAttribute("required", true)
        textbox.setAttribute("autoFocus", true);
        textbox.addEventListener("input", (e) => {
            textbox.value = e.target.value;
        })
        listItem.replaceWith(textbox);

        const editButton = document.querySelector(`#edit-${dayId}-${entryId}`);
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.setAttribute("class", "edit-save-delete");
        saveButton.addEventListener("click", () => { 
            // This doesn't replace the entry. It modifies an existing one, so use map()! map() doesn't mutate, but creates a new copy
            const newData = data.map((entry) => {
                if (entry.id === entryId) {
                    // Need to change the text of the day's description field
                    return {
                        id: entry.id,
                        date: entry.date,
                        description: textbox.value
                    }
                } else {
                    return entry;
                }
            });
            setData(newData);

            // Change the textbox back into list item and the save button back into edit button
            textbox.replaceWith(listItem);
            saveButton.replaceWith(editButton);
        });

        editButton.replaceWith(saveButton);
    }

    function handleDelete(specificEntryId) {
        setData(data.filter(entry => entry.id != specificEntryId));
    }

    const table = [];
    let dayId = 1;
    for (let weekId = 1; weekId <= 5; weekId++) {
        if (dayId > daysInCurrentMonth()) {
            break;
        }

        if (weekId == 1) {
            table.push(
                <tr key={weekId}>
                    {[0,1,2,3,4,5,6].map(col => {
                        if (col < firstDayIndex) {
                            return <td key={`empty-${weekId}-${col}`}></td>;
                        } else {
                            let dateStr = `${currYear}-${currMonth+1}-${dayId}`;
                            return (
                                <td
                                  key={dayId}>
                                #{dayId++}
                                    <ul>
                                        {
                                            data.filter(day => day.date === dateStr).map((entry) => {
                                                let thisDay = dayId - 1;
                                                return (
                                                    <Fragment
                                                        key={`filled-${dayId-1}-${entry.id}`}
                                                    >
                                                        <li id={`filled-${dayId-1}-${entry.id}`}>{entry.description}</li>
                                                        <button 
                                                            className="edit-save-delete"
                                                            id={`edit-${dayId-1}-${entry.id}`}
                                                            onClick={() => handleEdit(thisDay, entry.id)}>Edit</button>
                                                        <button 
                                                            className="edit-save-delete"
                                                            onClick={() => {handleDelete(entry.id)}}>Delete</button>
                                                    </Fragment>
                                                );
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
                                            data.filter(day => day.date === dateStr).map((entry) => {
                                                let thisDay = dayId - 1;
                                                return (
                                                    <Fragment
                                                        key={`filled-${dayId-1}-${entry.id}`}
                                                    >
                                                        <li id={`filled-${dayId-1}-${entry.id}`}>{entry.description}</li>
                                                        <button 
                                                            className="edit-save-delete"
                                                            id={`edit-${dayId-1}-${entry.id}`}
                                                            onClick={() => handleEdit(thisDay, entry.id)}>Edit</button>
                                                        <button 
                                                            className="edit-save-delete"
                                                            onClick={() => {handleDelete(entry.id)}}>Delete</button>
                                                    </Fragment>
                                                );
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