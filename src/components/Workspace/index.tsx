import { useState, useContext, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { Marked } from '../Marked'
import SimpleMDE from 'react-simplemde-editor'
import { AppContext } from '../../context/context'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from '../../firebase'
import styles from './Workspace.module.css'
import 'easymde/dist/easymde.min.css'

interface WorkspaceProps {
  markup: string | null
}

export const Workspace = ({ markup }: WorkspaceProps) => {
  const [updatedMarkup, setUpdatedMarkup] = useState<string | null>(null)
  const context = useContext(AppContext)
  const id = context?.activeNote?.id

  const saveNote = useCallback(
    async (id: string) => {
      if (id) {
        try {
          const notesDoc = doc(database, 'notes', id)
          const newMarkup = {
            markup: updatedMarkup,
          }
          await updateDoc(notesDoc, newMarkup)
        } catch (error) {
          console.log(error)
        }
      }
    },
    [updatedMarkup]
  )

  const updateMarkup = debounce((mrk: string) => {
    setUpdatedMarkup(mrk)
  }, 700)

  const onChange = useCallback(
    (value: string) => {
      updateMarkup(value)
    },
    [updateMarkup]
  )

  useEffect(() => {
    setUpdatedMarkup(null)

    if (updatedMarkup !== null && id) {
      saveNote(id)
    }
  }, [id, updatedMarkup, saveNote])

  return (
    <div className={styles.workspace}>
      {context?.edit && markup && (
        <>
          <SimpleMDE
            className={styles.editor}
            value={markup}
            onChange={onChange}
          />
        </>
      )}
      {!context?.edit && markup && <Marked markup={markup} />}
    </div>
  )
}
