import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import cls from './AdminPage.module.css'

export const AdminPage =() => {

  return (
    <div className={cls.wrapper}>
      <Button theme={ButtonTheme.OUTLINE_BG_INVERTED}>Add Type</Button>
      <Button theme={ButtonTheme.OUTLINE_BG_INVERTED}>Add Brand</Button>
      <Button theme={ButtonTheme.OUTLINE_BG_INVERTED}>Add Device</Button>
      <Button theme={ButtonTheme.OUTLINE_BG_INVERTED}>Get Users</Button>
    </div>
  )
}
 