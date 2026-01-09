import Calendar from "./Calendar.js";
import { initialData } from "../placeholder_data/data.js";
import { useState } from "react";
import UploadData from "./UploadData.js";
import {getAIResponse} from "../api/getAIResponse.js"

const today = new Date();
const currYear = today.getFullYear();
const currMonth = today.getMonth();
const currDay = today.getDate();
const todayStr = `${currYear}-${currMonth+1}-${currDay}`;

export default function App() {
  const [data, setData] = useState(initialData);
  const [summarySetting, setSummarySetting] = useState('Today');


  function handleUpload(newEntry) {
    setData([...data, newEntry]);
  }

  const handleWrap = async (setting) => {
    if (setting === 'Today') {
      const todayEntries = data.filter(day => day.date === todayStr);

      let todayText = "Hi gemma3. Today I felt this way: ";
      for (const entry of todayEntries) {
        todayText += entry.description + " ";
      }
      todayText += "Please give me a quick review of the emotions I felt in 3 sentences at most."

      const response = await getAIResponse(todayText);
      alert(response);
    }
  }
  
  return (
    <>
      <h1>Unload Your Thoughts</h1>
      <div className="center-container">
        <UploadData
          className="center-container"
          onUpload={handleUpload} 
          todayStr={todayStr} />
      </div>
      <br /><br /><br />
      <Calendar data={data}/>
      <br /><br />
      <div className="center-container">
        <button onClick={() => handleWrap(summarySetting)}>Wrap It Up!</button>
        <select 
          value={summarySetting}
          onChange={(e) => setSummarySetting(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>      


      {/* <ul>
        {data.map(data => <li key={data.id}>{data.description}</li>)}
      </ul> */}
    </>
  );
}
