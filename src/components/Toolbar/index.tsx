import { ReactSVG } from 'react-svg'
import { Button, Input, Modal } from 'antd'
import { FC, useContext, useState } from 'react'
import { AppContext } from '../../context/context'
import { getCurrentDate } from '../../helpers/currentDate'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import styles from './Toolbar.module.css'

import add from '../../assets/icons/add.svg'
import remove from '../../assets/icons/remove.svg'
import editIcon from '../../assets/icons/edit.svg'
import { database } from '../../firebase'

export const Toolbar: FC = () => {
  const { Search } = Input
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [updatedSearch, setUpdatedSearch] = useState<string>('')
  const context = useContext(AppContext)
  const activeNote = context?.activeNote
  const edit = context?.edit

  const onSearch = (value: string) => {
    setUpdatedSearch(value)
    context?.setSearchValue(updatedSearch)
  }

  const showModal = () => {
    if (activeNote !== null) {
      setOpen(true)
    }
  }

  const handleOk = () => {
    if (activeNote) {
      deleteNote(activeNote.id)
      setConfirmLoading(true)
      setOpen(false)
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const deleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(database, 'notes', id))
      context?.setActiveNote(null)
    } catch (error) {
      console.log(error)
    }
  }

  const addNewNote = async () => {
    try {
      await addDoc(collection(database, 'notes'), {
        title: 'Новая заметка',
        markup: 'Текст новой заметки',
        createdAt: getCurrentDate(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.buttons}>
        <Button onClick={() => addNewNote()} icon={<ReactSVG src={add} />} />
        <Button
          onClick={() => context?.setEdit(!edit)}
          icon={<ReactSVG src={editIcon} />}
        />
        <Button onClick={showModal} icon={<ReactSVG src={remove} />} />
        <Modal
          title='Delete note?'
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        />
      </div>
      <Search
        placeholder='Find note'
        onSearch={onSearch}
        style={{ width: 250 }}
      />
    </div>
  )
}
