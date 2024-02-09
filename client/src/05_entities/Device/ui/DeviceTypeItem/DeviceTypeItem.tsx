import { getSelectedDeviceType } from '05_entities/Device/model/selectors/deviceSelectors'
import { deviceActions } from '05_entities/Device/model/slice/deviceSlice'
import type { DeviceType } from '05_entities/Device/model/types/device'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppDispatch, useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { memo, useCallback } from 'react'
import cls from './DeviceTypeItem.module.css'


interface DeviceTypeItemProps {
  className?: string
  type: DeviceType

}

export const DeviceTypeItem = memo((props: DeviceTypeItemProps) => {
  const {
    className,
    type
  } = props

  const selectedType = useAppSelector(getSelectedDeviceType)
  const dispatch = useAppDispatch()
  const selectTypeHandler = useCallback((type: DeviceType) => {
    if(type.id === selectedType?.id) {
      return dispatch(deviceActions.setSelectedType(undefined))
    }
    dispatch(deviceActions.setSelectedType(type))
  }, [dispatch, selectedType?.id])

  const isSelected = (type: DeviceType) => {
    return type.id === selectedType?.id
  }
  return (
    <Button
      onClick={() => selectTypeHandler(type)}
      className={classNames(className, [], { [cls.selected]: isSelected(type) })}
      theme={ButtonTheme.OUTLINE_BG_INVERTED}
    >{type.name}
    </Button>
  )
})
