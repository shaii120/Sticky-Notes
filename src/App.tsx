import './App.css';
import { useState } from 'react'

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

  function createNote(note: Note) {
    return (
      <div className='note-item'>
        <div className='notes-header'>
          <button>x</button>
        </div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    )
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


  return (
    <div className="app-container">
      <form
        className='note-form'
        onSubmit={(event) => handleAddNote(event)}
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
        <button type='submit'>
          Add Note
        </button>
      </form>
      <div className='notes-grid'>
        {notes.map(createNote)}
      </div>
    </div>
  );
}

export default App;
