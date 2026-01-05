import Calendar from "./Calendar.js";
import { initialData } from "./data.js";
import { useState } from "react";
import UploadData from "./UploadData.js";

let nextId = 3;
const today = "2026-1-4";

export default function App() {
  const [data, setData] = useState(initialData);
  const [summarySetting, setSummarySetting] = useState('Today');

  function handleUpload(newDayDesc) {
    setData([
      ...data,
      {
        id: nextId++,
        date: today,
        description: newDayDesc
      }
    ]);
  }
  
  return (
    <>
      <h1>Unload Your Thoughts</h1>
      <div className="center-container">
        <UploadData
          className="center-container"
          onUpload={handleUpload} />
      </div>
      <br /><br /><br />
      <Calendar data={data}/>
      <br /><br /><br />
      <div className="center-container">
        <button>Wrap It Up!</button>
        <select 
          value={summarySetting}
          onChange={(e) => setSummarySetting(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>      
    </>
  );
}
