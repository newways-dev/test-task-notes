import { useContext } from 'react'
import { List } from 'antd'
import clsx from 'clsx'
import { NoteType } from '../../types/note'
import { AppContext } from '../../context/context'
import styles from './Sidebar.module.css'

interface SidebarProps {
  notes: NoteType[]
}

export const Sidebar = ({ notes }: SidebarProps) => {
  const context = useContext(AppContext)
  const activeNote = context?.activeNote

  const handleClick = (note: NoteType) => {
    context?.setActiveNote(note)
  }

  return (
    <div className={styles.sidebar}>
      <List
        itemLayout='horizontal'
        dataSource={notes}
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
