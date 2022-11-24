import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { Sidebar, Toolbar, Workspace } from './components'
import { NoteType } from './types/note'
import { database } from './firebase'
import { AppContext } from './context/context'
const { Header, Sider, Content } = Layout

function App() {
  const [notes, setNotes] = useState<NoteType[]>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [activeNote, setActiveNote] = useState<NoteType>(notes[0])

  useEffect(() => {
    if (notes.length > 0) {
      setActiveNote(notes[0])
    }
  }, [notes])

  useEffect(() => {
    const notesRef = collection(database, 'notes')
    const unsubscribe = onSnapshot(notesRef, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as NoteType))
      )
    })

    return unsubscribe
  }, [])

  return (
    <div className='app'>
      <AppContext.Provider value={{ edit, setEdit, activeNote, setActiveNote }}>
        <Layout style={{ background: '#fff', height: '100%' }}>
          <Header style={{ background: '#fff', paddingInline: '0' }}>
            <Toolbar />
          </Header>
          <Layout>
            <Sider style={{ background: '#fff', height: '100%' }}>
              <Sidebar notes={notes} />
            </Sider>
            <Content style={{ background: '#fff' }}>
              <Workspace />
            </Content>
          </Layout>
        </Layout>
      </AppContext.Provider>
    </div>
  )
}

export default App
