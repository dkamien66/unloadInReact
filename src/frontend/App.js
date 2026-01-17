import Calendar from "./Calendar.js";
import { initialData } from "../placeholder_data/data.js";
import { useState } from "react";
import UploadData from "./UploadData.js";
import {getAIResponse} from "../api/getAIResponse.js"
import VoiceToTextButton from "./VoiceToTextButton.js"

const today = new Date();
const currYear = today.getFullYear();
const currMonth = today.getMonth();
const currDay = today.getDate();
const todayStr = `${currYear}-${currMonth+1}-${currDay}`;

let nextId = initialData.length;

export default function App() {
  const [data, setData] = useState(initialData);
  const [timeSetting, setTimeSetting] = useState('Today');
  const [reframeSetting, setReframeSetting] = useState('Cognitive Reframing');
  const [inquireReframe, setInquireReframe] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleUpload(text) {
    setData([
      ...data,
      {
        id : nextId++,
        date: todayStr,
        description: text
      }
    ]);
  }

  async function handleWrap() {
    setIsLoading(true);
    setAiResponse(null);

    
    let request;
    reframeSetting === 'Cognitive Reframing' ? request = 'Please give me a cognitive reframe of my reflection of my emotions and their causes. ' : request = 'Please give me a positive reframe of my reflection of my emotions and their causes. ';
    
    // These conditions follow this algorithm:
      // Find the relevant entries
      // Construct text
      // Send to backend to get AI reflection
      // Display
    if (timeSetting === 'Today') {
      const todayEntries = data.filter(day => day.date === todayStr);

      request += "Today I felt this way: ";
      for (const entry of todayEntries) {
        request += entry.description + " ";
      }

      const response = await getAIResponse(request);
      setAiResponse(response);
      setIsLoading(false);
    } else if (timeSetting == 'Past Week') {
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
      request += "The following is how I felt the past week: ";
      for (const entry of relevantEntries) {
        request += entry.description + " ";
      }
      // get AI response
      const response = await getAIResponse(request);
      setAiResponse(response);
      setIsLoading(false);
      } else if (timeSetting == 'Past Month') {
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

        const relevantEntries = data.filter(day => arrayOfDateStr.includes(day.date));
        request += "The following is how I felt the past month: ";
        for (const entry of relevantEntries) {
          request += entry.description + " ";
        }
        const response = await getAIResponse(request);
        setAiResponse(response);
        setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Unload Your Thoughts</h1>
      <div className="center-container">
        <VoiceToTextButton 
          onUpload={handleUpload} />
      </div>
      <br />
      <div className="center-container">
      or
      </div>
      <br />
      <div className="center-container">
        <UploadData
          className="center-container"
          onUpload={handleUpload} />
      </div>
      <br /><br /><br />
      <Calendar data={data} setData={setData}/>
      <br /><br />
      <div className="center-container">
        <button 
          className="wrap-button"
          onClick={() => handleWrap(timeSetting)}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Wrap It Up!'}
        </button>
        <select 
          className="select"
          value={timeSetting}
          onChange={(e) => setTimeSetting(e.target.value)}
        >
          <option value="Today">Today</option>
          <option value="Past Week">Past Week</option>
          <option value="Past Month">Past Month</option>
        </select>
        <select
          className="select"
          value={reframeSetting}
          onChange={(e) => setReframeSetting(e.target.value)}
        >
          <option value="Cognitive Reframing">Cognitive Reframing</option>
          <option value="Positive Reframing">Positive Reframing</option>
        </select>
        <button
          onClick={() => {
            setInquireReframe(true);
          }}>?</button>
      </div>

      {aiResponse && (
        <div className="response-card-overlay" onClick={() => setAiResponse(null)}>
          <div className="response-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setAiResponse(null)}>×</button>
            <h2 className="response-title">Your Reflection</h2>
            <div className="response-content">{aiResponse}</div>
          </div>
        </div>
      )}

      {inquireReframe && (
        <div className="response-card-overlay" onClick={() => setInquireReframe(false)}>
        <div className="response-card" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={() => setInquireReframe(false)}>×</button>
          <h2 className="response-title">What is Cognitive Reframing?</h2>
          <div className="response-content">
            Cognitive Reframing - pay attention to your thoughts and question them. Identify your emotions. It can be helpful to pay attention closely to what you are saying. Here's an alternative way of what you are saying.
          </div>
          <br />
          <h2 className="response-title">What is Positive Reframing?</h2>
          <div className="response-content">
            Positive Reframing is changing your negativity into something positive.
          </div>
        </div>
      </div>
      )}

      {/* <ul>
        {data.map(data => <li key={data.id}>{data.description}</li>)}
      </ul> */}
    </>
  );
}
