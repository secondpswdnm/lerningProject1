import { DeviceTypeItem } from '05_entities/Device/ui/DeviceTypeItem/DeviceTypeItem'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Mode, useResizeScroll } from '06_shared/lib/hooks/useResizeScroll'
import { getDeviceTypes } from '../../model/selectors/deviceSelectors'
import cls from './DeviceTypesList.module.css'


interface DeviceTypesListProps {
  className?: string
}

export const DeviceTypesList = (props: DeviceTypesListProps) => {
  const {
    className
  } = props
  const types = useAppSelector(getDeviceTypes)
  const { listRef, hasScroll } = useResizeScroll(Mode.VERT)

  return (
    <div className={cls.wrapper}>
      <ul ref={listRef}
        className={classNames(cls.DeviceTypesList, [className], { [cls.scrollable]: hasScroll })}>
        {types?.map(type => (
          <li key={type.id}>
            <DeviceTypeItem type={type} className={cls.type} />
          </li>
        ))}
      </ul>
    </div>
  )
}
