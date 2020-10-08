import React, { useState, useEffect } from 'react'
import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function SpeachToText() {
  const [isListening, setIsListening] = useState(false)
  let [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen();
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
        console.log('Mics on')
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript);
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    console.log(document.getElementById("result").innerHTML);
    let n = note;
    note = document.getElementById("result").innerHTML + " " + n;
    console.log(note)
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <div className="container">
        <div className="box">
          <h2>speech recognition</h2>
          {isListening ? <span>🛑</span> : <span></span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Results</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  )
}

export default SpeachToText