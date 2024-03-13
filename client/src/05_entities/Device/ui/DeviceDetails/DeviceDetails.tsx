import { NotFoundPage } from '02_pages/NotFoundPage'
import { getDevices } from '05_entities/Device/model/selectors/deviceSelectors'
import StarIcon from '06_shared/assets/icons/star.svg'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { Icon } from '06_shared/ui/Icon/Icon'
import { TextSize, TextTheme } from '06_shared/ui/Text/model/text'
import { Text } from '06_shared/ui/Text/Text'
import { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import cls from './DeviceDetails.module.css'


interface DeviceDetailsProps {
  className?: string
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
    <>
      {pickedDevice
        ?
        <>
          <div className={classNames(cls.DeviceDetails, [className])}>
            <img
              src={pickedDevice.img}
              alt={`${pickedDevice.name} picture`}
              className={cls.img}
            />
            <div className={cls.shortInfo}>
              <Text title={pickedDevice.name} />
              <div className={cls.star}>
                <Text
                  className={cls.rating}
                  title={String(pickedDevice.rating)}
                  theme={TextTheme.BG_ALL}
                />
                <Icon Svg={StarIcon} size={'60%'} />
              </div>
              <div className={cls.price}>
                <Text title={`${pickedDevice.price} $`} />
                <Button theme={ButtonTheme.OUTLINE_BG_INVERTED}>Add to cart</Button>
              </div>
            </div>
          </div>
          {pickedDevice.info &&
            <Text title='Description' size={TextSize.L} theme={TextTheme.INVERTED_BG_ALL} />}
          {
            pickedDevice.info?.map((field) => (
              <div className={cls.info}>
                <Text title={field.title} />
                <Text text={field.description} />
              </div>
            ))
          }
        </>
        : <NotFoundPage />}
    </>
  )
})
