import { FC } from 'react'
import { Button, Input } from 'antd'
import { ReactSVG } from 'react-svg'
import styles from './Toolbar.module.css'

import edit from '../../assets/icons/edit.svg'
import remove from '../../assets/icons/remove.svg'

export const Toolbar: FC = () => {
  const { Search } = Input
  const onSearch = (value: string) => console.log(value)

  return (
    <div className={styles.toolbar}>
      <div className={styles.buttons}>
        <Button icon={<ReactSVG src={edit} />} />
        <Button icon={<ReactSVG src={remove} />} />
      </div>
      <Search
        placeholder='input search text'
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </div>
  )
}
