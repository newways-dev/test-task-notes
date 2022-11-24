import { useState, useContext, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { Marked } from '../Marked'
import SimpleMDE from 'react-simplemde-editor'
import { AppContext } from '../../context/context'
import styles from './Workspace.module.css'
import 'easymde/dist/easymde.min.css'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from '../../firebase'

export const Workspace = () => {
  const [updatedMarkup, setUpdatedMarkup] = useState<string>('Новый текст')
  const context = useContext(AppContext)
  const markup = context?.activeNote?.markup
  const id = context?.activeNote?.id

  const updateMarkup = debounce((mrk: string) => {
    setUpdatedMarkup(mrk)
  }, 1000)

  const onChange = useCallback(
    (value: string) => {
      updateMarkup(value)
    },
    [updateMarkup]
  )

  useEffect(() => {
    const saveNote = async () => {
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
    }
    saveNote()
  }, [updatedMarkup, id])

  return (
    <div className={styles.workspace}>
      {context?.edit && (
        <SimpleMDE
          className={styles.editor}
          value={updatedMarkup}
          defaultValue={markup}
          onChange={onChange}
        />
      )}
      {!context?.edit && markup && <Marked markup={markup} />}
    </div>
  )
}
