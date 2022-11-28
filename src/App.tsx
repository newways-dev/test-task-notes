import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { Sidebar, Toolbar, Workspace } from './components'
import { NoteType } from './types/note'
import { database } from './firebase'
import { AppContext } from './context/context'
const { Header, Sider, Content } = Layout

function App() {
  const [notes, setNotes] = useState<NoteType[]>([])
  const [filteredNotes, setFilteredNotes] = useState<NoteType[]>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [activeNote, setActiveNote] = useState<NoteType | null>(notes[0])
  const [currentNote, setCurrentNote] = useState<NoteType | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const data = searchValue ? filteredNotes : notes

  useEffect(() => {
    if (searchValue === '') {
      const notesRef = collection(database, 'notes')
      const unsubscribe = onSnapshot(notesRef, (snapshot) => {
        setNotes(
          snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as NoteType)
          )
        )
      })
      return unsubscribe
    }
  }, [searchValue])

  useEffect(() => {
    if (searchValue) {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredNotes(filtered)
    }
  }, [searchValue, notes])

  useEffect(() => {
    if (activeNote?.id) {
      try {
        const fetchNote = async () => {
          const docRef = doc(database, 'notes', activeNote.id)
          const snapshot = await getDoc(docRef)
          setCurrentNote({ ...(snapshot.data() as NoteType) })
        }
        fetchNote()
      } catch (error) {
        console.log(error)
      }
    }
  }, [activeNote, notes])

  return (
    <div className='app'>
      <AppContext.Provider
        value={{
          edit,
          setEdit,
          activeNote,
          setActiveNote,
          searchValue,
          setSearchValue,
        }}
      >
        <Layout style={{ background: '#fff', height: '100%' }}>
          <Header style={{ background: '#fff', paddingInline: '0' }}>
            <Toolbar />
          </Header>
          <Layout>
            <Sider style={{ background: '#fff', height: '100%' }}>
              <Sidebar notes={data} />
            </Sider>
            <Content style={{ background: '#fff' }}>
              {currentNote && (
                <Workspace
                  title={currentNote.title}
                  markup={currentNote.markup}
                />
              )}
            </Content>
          </Layout>
        </Layout>
      </AppContext.Provider>
    </div>
  )
}

export default App
