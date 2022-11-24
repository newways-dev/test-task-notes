import { List } from 'antd'
import { useContext } from 'react'
import clsx from 'clsx'
import styles from './Sidebar.module.css'
import { NoteType } from '../../types/note'
import { AppContext } from '../../context/context'

interface SidebarProps {
  notes: NoteType[]
}

export const Sidebar = ({ notes }: SidebarProps) => {
  let data = notes.map((note) => ({ ...note }))
  const context = useContext(AppContext)
  const activeNote = context?.activeNote

  const handleClick = (note: NoteType) => {
    context?.setActiveNote(note)
  }

  return (
    <div className={styles.sidebar}>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            className={clsx(styles.item, {
              [styles.active]: activeNote?.id === item.id,
            })}
            onClick={() => handleClick(item)}
          >
            <List.Item.Meta title={item.title} description={item.createdAt} />
          </List.Item>
        )}
      />
    </div>
  )
}
