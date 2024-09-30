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

  return (
    <div className="app-container">
      <form
        className='note-form'
      >
        <input
          placeholder='Title'
          required
        />
        <textarea
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
