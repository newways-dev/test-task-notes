import { List } from 'antd'
import { useState } from 'react'
import clsx from 'clsx'
import styles from './Sidebar.module.css'

const data = [
  {
    id: 0,
    title: 'Новая заметка',
  },
  {
    id: 1,
    title: 'Ant Design Title 1',
  },
  {
    id: 2,
    title: 'Ant Design Title 2',
  },
  {
    id: 3,
    title: 'Ant Design Title 3',
  },
  {
    id: 4,
    title: 'Ant Design Title 4',
  },
]

export const Sidebar = () => {
  const [active, setActive] = useState<number>(0)

  return (
    <div className={styles.sidebar}>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            className={clsx(styles.item, {
              [styles.active]: active === item.id,
            })}
            onClick={() => setActive(item.id)}
          >
            <List.Item.Meta
              title={item.title}
              description='12: 34 Ant Design desc'
            />
          </List.Item>
        )}
      />
    </div>
  )
}
