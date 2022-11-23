import { FC, useState } from 'react'
import { Button, Input, Modal } from 'antd'
import { ReactSVG } from 'react-svg'
import styles from './Toolbar.module.css'

import edit from '../../assets/icons/edit.svg'
import remove from '../../assets/icons/remove.svg'

export const Toolbar: FC = () => {
  const { Search } = Input
  const onSearch = (value: string) => console.log(value)

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [modalText, setModalText] = useState('Content of the modal')

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.buttons}>
        <Button icon={<ReactSVG src={edit} />} />
        <Button onClick={showModal} icon={<ReactSVG src={remove} />} />
        <Modal
          title='Delete note?'
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </div>
      <Search
        placeholder='input search text'
        onSearch={onSearch}
        style={{ width: 250 }}
      />
    </div>
  )
}
