import { List } from 'antd'
import { useState } from 'react'

const data = [
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
  const [active, setActive] = useState<number>(1)

  console.log(active)

  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item) => (
        <List.Item onClick={() => setActive(item.id)}>
          <List.Item.Meta
            title={<a href='https://ant.design'>{item.title}</a>}
            description='12: 34 Ant Design desc'
          />
        </List.Item>
      )}
    />
  )
}
