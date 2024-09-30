import './App.css';
import React, { useState } from 'react'

type Note = {
  id: number,
  title: string,
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'note title 1',
      content: 'note content 1'
    },
    {
      id: 2,
      title: 'note title 2',
      content: 'note content 2'
    },
    {
      id: 3,
      title: 'note title 3',
      content: 'note content 3'
    }
  ])

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  function handleNoteClick(note: Note) {
    setSelectedNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  function handleAddNote(event: React.FormEvent) {
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    event.preventDefault()
    setNotes([newNote, ...notes])
    setTitle("")
    setContent("")
  }

  function createNote(note: Note) {
    return (
      <div className='note-item'
        onClick={() => handleNoteClick(note)}>
        <div className='notes-header'>
          <button>x</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    )
  }

  function handleUpdateNote(event: React.FormEvent) {
    event.preventDefault()

    if (!selectedNote) {
      return
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }
    const updatedNoteList = notes.map((note) => note.id === updatedNote.id ? updatedNote : note)

    setNotes(updatedNoteList)
    setTitle("")
    setContent("")
    setSelectedNote(null)
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
