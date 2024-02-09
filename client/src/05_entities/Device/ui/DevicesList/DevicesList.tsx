import { Mode, useResizeScroll } from '06_shared/lib/hooks/useResizeScroll'
import { getDevices } from '../../model/selectors/deviceSelectors'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { DeviceCard } from '06_shared/ui/DeviceCard/DeviceCard'
import cls from './DevicesList.module.css'
import { memo, useLayoutEffect, useRef, useState } from 'react'


interface DevicesListProps {
  className?: string

}

export const DevicesList = memo((props: DevicesListProps) => {
  const {
    className
  } = props
  const devices = useAppSelector(getDevices)
  const { listRef, hasScroll } = useResizeScroll(Mode.VERT)
  return (
    <div className={classNames('', [className])}>
      <ul ref={listRef} className={classNames(cls.cards, [], { [cls.scrollable]: hasScroll })}>
        {devices?.map(device => (
          <DeviceCard className={cls.card} key={device.id} device={device} />
        ))}
      </ul>
    </div>
  )
})
