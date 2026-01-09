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
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleUpload(newEntry) {
    setData([...data, newEntry]);
  }

  const handleWrap = async (setting) => {
    setIsLoading(true);
    setAiResponse(null);
    
    // These conditions follow this algorithm:
      // Find the relevant entries
      // Construct text
      // Send to backend to get AI reflection
      // Display
    if (setting === 'Today') {
      const todayEntries = data.filter(day => day.date === todayStr);

      let todayText = "Hi gemma3. Today I felt this way: ";
      for (const entry of todayEntries) {
        todayText += entry.description + " ";
      }
      todayText += "Please give me a quick review of the emotions I felt in 3 sentences at most."

      const response = await getAIResponse(todayText);
      setAiResponse(response);
      setIsLoading(false);
    } else if (setting == 'Past Week') {
      // find all entries of the last 7 days (including today)
      const arrayOfDateStr = [];
      let timeDiff = 518400000 // first, set to 6 days before today (in ms)
      for (let i = 6; i >= 1; i--) {
        const newDate = new Date(today.getTime() - timeDiff);
        const newDateStr = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
        arrayOfDateStr.push(newDateStr);
        timeDiff -= 86400000; // ms in a day
      }
      arrayOfDateStr.push(todayStr);

      // Now that I have the relevant dates in correct format, filter
      const relevantEntries = data.filter(day => arrayOfDateStr.includes(day.date));
      // create text
      let weekText = "Hi gemma3. Please give me a clear, concise review of my top 3 emotions and their causes in the following format (fill in the blanks based on the data I give you only): '#1 _____ because of ____, #2 _____ because of ______, #3 ____ because of ______. Here is the data: ";
      for (const entry of relevantEntries) {
        weekText += entry.description + " ";
      }
      // get AI response
      const response = await getAIResponse(weekText);
      setAiResponse(response);
      setIsLoading(false);
      } else if (setting == 'Past Month') {
        // find all entries of the past 31 days
        const arrayOfDateStr = [];
        let timeDiff = 2592000000; // set to 30 days before today
        for (let i = 30; i >= 1; i--) {
          const newDate = new Date(today.getTime() - timeDiff);
          const newDateStr = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
          arrayOfDateStr.push(newDateStr);
          timeDiff -= 86400000;
        }
        arrayOfDateStr.push(todayStr);
        console.log(arrayOfDateStr);

        const relevantEntries = data.filter(day => arrayOfDateStr.includes(day.date));
        let monthText = "Hi gemma3. Please give me a clear, concise review of my top 3 emotions and their causes in the following format (fill in the blanks based on the data I give you only): '#1 _____ because of ____, #2 _____ because of ______, #3 ____ because of ______. Here is the data: ";
        for (const entry of relevantEntries) {
          monthText += entry.description + " ";
        }
        const response = await getAIResponse(monthText);
        setAiResponse(response);
        setIsLoading(false);
    }
  }

  const closeResponseCard = () => {
    setAiResponse(null);
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
        <button 
          className="wrap-button"
          onClick={() => handleWrap(summarySetting)}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Wrap It Up!'}
        </button>
        <select 
          className="time-select"
          value={summarySetting}
          onChange={(e) => setSummarySetting(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="Past Week">Past Week</option>
          <option value="Past Month">Past Month</option>
        </select>
      </div>

      {aiResponse && (
        <div className="response-card-overlay" onClick={closeResponseCard}>
          <div className="response-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeResponseCard}>×</button>
            <h2 className="response-title">Your Reflection</h2>
            <div className="response-content">{aiResponse}</div>
          </div>
        </div>
      )}

      {/* <ul>
        {data.map(data => <li key={data.id}>{data.description}</li>)}
      </ul> */}
    </>
  );
}
