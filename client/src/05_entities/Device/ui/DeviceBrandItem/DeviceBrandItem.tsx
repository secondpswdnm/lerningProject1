import { getSelectedDeviceBrand } from '05_entities/Device/model/selectors/deviceSelectors'
import { deviceActions } from '05_entities/Device/model/slice/deviceSlice'
import { useAppDispatch, useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import type { DeviceBrand } from '../../model/types/device'
import { classNames } from '06_shared/lib/classNames/classNames'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import cls from './DeviceBrandItem.module.css'
import { memo, useCallback } from 'react'


interface DeviceBrandItemProps {
  className?: string
  brand: DeviceBrand

}

export const DeviceBrandItem = (props: DeviceBrandItemProps) => {
  const {
    className,
    brand
  } = props

  const selectedBrand = useAppSelector(getSelectedDeviceBrand)
  const dispatch = useAppDispatch()

  const selectBrandHandler = useCallback((brand: DeviceBrand) => {
    if(brand.id === selectedBrand?.id) {
      return dispatch(deviceActions.setSelectedBrand(undefined))
    }
    dispatch(deviceActions.setSelectedBrand(brand))
  }, [dispatch, selectedBrand?.id])

  const isSelected = brand.id === selectedBrand?.id


  return (
    <Button
      onClick={() => selectBrandHandler(brand)}
      className={classNames(className, [], { [cls.selected]: isSelected })}
      theme={ButtonTheme.OUTLINE_BG_INVERTED}>
      {brand.name}
    </Button>
  )
}
