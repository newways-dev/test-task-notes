import { useState, useContext, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { Marked } from '../Marked'
import SimpleMDE from 'react-simplemde-editor'
import { AppContext } from '../../context/context'
import { doc, updateDoc } from 'firebase/firestore'
import { database } from '../../firebase'
import styles from './Workspace.module.css'
import 'easymde/dist/easymde.min.css'
import { Input } from 'antd'

interface WorkspaceProps {
  markup: string | null
  title: string | null
}

export const Workspace = ({ markup, title }: WorkspaceProps) => {
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null)
  const [updatedMarkup, setUpdatedMarkup] = useState<string | null>(null)
  const context = useContext(AppContext)
  const id = context?.activeNote?.id

  const saveMarkup = useCallback(
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

  const saveTitle = useCallback(
    async (id: string) => {
      if (id) {
        try {
          const notesDoc = doc(database, 'notes', id)
          const newMarkup = {
            title: updatedTitle,
          }
          await updateDoc(notesDoc, newMarkup)
        } catch (error) {
          console.log(error)
        }
      }
    },
    [updatedTitle]
  )

  const updateTitle = debounce((title: string) => {
    setUpdatedTitle(title)
  }, 500)

  const updateMarkup = debounce((mrk: string) => {
    setUpdatedMarkup(mrk)
  }, 500)

  const onChangeTitle = (value: string) => {
    updateTitle(value)
  }

  const onChange = useCallback(
    (value: string) => {
      updateMarkup(value)
    },
    [updateMarkup]
  )

  useEffect(() => {
    setUpdatedMarkup(null)
    if (updatedMarkup !== null && id) {
      saveMarkup(id)
    }
  }, [id, updatedMarkup, saveMarkup])

  useEffect(() => {
    setUpdatedTitle(null)
    if (updatedTitle !== null && id) {
      saveTitle(id)
    }
  }, [id, updatedTitle, saveTitle])

  return (
    <div className={styles.workspace}>
      {context?.edit && (
        <>
          <Input
            onChange={(event) => onChangeTitle(event.target.value)}
            size='large'
            className={styles.heading}
            placeholder={title ? title : 'Название заметки'}
          />
          <SimpleMDE
            className={styles.editor}
            value={markup ? markup : 'Описание заметки'}
            onChange={onChange}
          />
        </>
      )}
      {!context?.edit && markup && <Marked markup={markup} />}
    </div>
  )
}
