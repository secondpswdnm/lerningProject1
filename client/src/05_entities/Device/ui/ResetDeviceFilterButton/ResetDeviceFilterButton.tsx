import { deviceActions } from '../../model/slice/deviceSlice'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppDispatch } from '06_shared/lib/hooks/StoreHooks'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import cls from './ResetDeviceFilterButton.module.css'
import { memo, useCallback } from 'react'


interface ResetDeviceFilterButtonProps {
  className?: string

}

export const ResetDeviceFilterButton = memo((props: ResetDeviceFilterButtonProps) => {
  const {
    className
  } = props

  const dispatch = useAppDispatch()

  const onResetFilters = useCallback(() => {
    dispatch(deviceActions.setSelectedBrand(undefined))
    dispatch(deviceActions.setSelectedType(undefined))
  },[dispatch])

  return (
    <div className={classNames('', [className])}>
      <Button
        onClick={onResetFilters}
        className={cls.allTypesBtn}
        theme={ButtonTheme.OUTLINE_BG_INVERTED}
      >
          Reset filters
      </Button>
    </div>
  )
})
