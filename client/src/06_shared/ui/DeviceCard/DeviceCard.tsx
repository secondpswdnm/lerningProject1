import type { IDevice } from '05_entities/Device/model/types/device'
import { RoutePath } from '06_shared/config/routeConfig/routeConfig'
import { classNames } from '06_shared/lib/classNames/classNames'
import { AppLink } from '06_shared/ui/AppLink/AppLink'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { Icon } from '06_shared/ui/Icon/Icon'
import { TextTheme } from '06_shared/ui/Text/model/text'
import { Text } from '06_shared/ui/Text/Text'
import { memo } from 'react'
import cls from './DeviceCard.module.css'
import StarIcon from '06_shared/assets/icons/star.svg'


interface DeviceCardProps {
  className?: string
  device: IDevice

}

export const DeviceCard = memo((props: DeviceCardProps) => {
  const {
    className,
    device
  } = props
  return (
    <li className={classNames(cls.card, [className])}>
      <div className={cls.cardTop}>
        <AppLink
          className={cls.cardImg}
          to={`${RoutePath.device_details}${device.id}`}
        >
          <img loading={'lazy'} src={device.img} alt={`${device.name} picture`} />
        </AppLink>
      </div>
      <div className={cls.cardBottom}>
        <div className={cls.info}>
          <AppLink
            className={cls.title}
            to={`${RoutePath.device_details}${device.id}`}
          >
            <Text className={cls.text} theme={TextTheme.INVERTED_BG_ALL} title={device.name} />

          </AppLink>
          <div className={cls.description}>
            <Text
              className={cls.price}
              theme={TextTheme.INVERTED_BG_ALL}
              text={`${device.price}$`}
            />
            <div className={cls.rating}>
              {device.rating}
              <Icon className={cls.star} Svg={StarIcon} size={12} />
            </div>
          </div>
        </div>

        <Button theme={ButtonTheme.OUTLINE_BG_INVERTED}>Add to cart</Button>
      </div>
    </li>
  )
})
