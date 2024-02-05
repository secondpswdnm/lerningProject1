import { NotFoundPage } from '02_pages/NotFoundPage'
import { getDevices } from '05_entities/Device/model/selectors/deviceSelectors'
import StarIcon from '06_shared/assets/icons/star.svg'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Icon } from '06_shared/ui/Icon/Icon'
import { TextSize } from '06_shared/ui/Text/model/text'
import { Text } from '06_shared/ui/Text/Text'
import { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import cls from './DeviceDetails.module.css'


interface DeviceDetailsProps {
  className?: string;
}

export const DeviceDetails = memo((props: DeviceDetailsProps) => {
  const {
    className
  } = props

  const { id } = useParams()
  const devices = useAppSelector(getDevices)

  const pickedDevice = useMemo(() => {
    return devices?.find((device) => device.id === Number(id))
  }, [devices, id])


  return (
    <div className={classNames(cls.DeviceDetails, [className])}>
      {pickedDevice
        ? <>
          <img
            src={pickedDevice.img}
            alt={`${pickedDevice.name} picture`}
            className={cls.img}
          />

          <div className={cls.shortInfo}>
            <Text title={pickedDevice.name} />
            <Icon className={cls.star} Svg={StarIcon} size={'50%'}/>

            

          </div>

        </>

        : <NotFoundPage />
      }
    </div>
  )
})
