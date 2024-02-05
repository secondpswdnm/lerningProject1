import { DeviceBrandsList, DevicesList, DeviceTypesList, ResetDeviceFilterButton } from '05_entities/Device'
import cls from './ShopPage.module.css'


export const ShopPage = () => {


  return (
    <div className={cls.wrapper}>
      <DeviceTypesList className={cls.types} />
      <DeviceBrandsList className={cls.brandsWrapper} />
      <ResetDeviceFilterButton className={cls.allTypes} />
      <DevicesList className={cls.content} />
    </div>
  )
}
