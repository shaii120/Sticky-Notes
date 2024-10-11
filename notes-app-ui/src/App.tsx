import './App.css';
import React, { useState, useEffect } from 'react'

type Note = {
  id: number,
  title: string,
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const apiURI = "http://localhost:5000/api"

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch(`${apiURI}/notes`)
        const notes: Note[] = await response.json()

        setNotes(notes)
      }
      catch (error) {
        console.log(error)
      }
    }

    fetchNotes()
  }, [])

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  function handleNoteClick(note: Note) {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  async function handleAddNote(event: React.FormEvent) {
    event.preventDefault()

    try {
      const response = await fetch(`${apiURI}/notes`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      })
      const newNote: Note = await response.json()

      setNotes([newNote, ...notes])
      setTitle("")
      setContent("")
    }
    catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveNote(event: React.FormEvent, noteToRemove: Note) {
    event.stopPropagation()

    try {
      await fetch(`${apiURI}/notes/${noteToRemove.id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: noteToRemove.id })
      })
    }
    catch (error) {
      console.log(error)
    }

    const updatedNotesList: Note[] = notes.filter((note) => note.id !== noteToRemove.id)
    setNotes(updatedNotesList)
  }

  function createNote(note: Note) {
    return (
      <div className='note-item'
        onClick={() => handleNoteClick(note)}>
        <div className='notes-header'>
          <button onClick={(event) => handleRemoveNote(event, note)}>x</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    )
  }

  async function handleUpdateNote(event: React.FormEvent) {
    event.preventDefault()

    if (!selectedNote) {
      return
    }

    try {
      const response = await fetch(`${apiURI}/notes/${selectedNote.id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      })
      const updatedNote: Note = await response.json()


      const updatedNoteList = notes.map((note) => note.id === updatedNote.id ? updatedNote : note)

      setNotes(updatedNoteList)
      setTitle("")
      setContent("")
      setSelectedNote(null)
    }
    catch (error) {
      console.log(error)
    }
  }

  function handleCancel() {
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  return (
    <div className="app-container">
      <form
        className='note-form'
        onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder='Title'
          required
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder='Content'
          rows={10}
          required
        />
        {selectedNote ? (
          <div className='edit-buttons'>
            <button type='submit'>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type='submit'>
            Add Note
          </button>
        )}
      </form>
      <div className='notes-grid'>
        {notes.map(createNote)}
      </div>
    </div>
  );
}

export default App;
