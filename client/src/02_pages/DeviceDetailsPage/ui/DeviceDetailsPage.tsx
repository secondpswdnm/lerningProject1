import { DeviceDetails } from '05_entities/Device/ui/DeviceDetails/DeviceDetails'
import { classNames } from '06_shared/lib/classNames/classNames'
import cls from './DeviceDetailsPage.module.css'


interface DeviceDetailsPageProps {
  className?: string

}


export const DeviceDetailsPage = (props: DeviceDetailsPageProps) => {
  const {
    className
  } = props
  return (
    <div>
      <DeviceDetails />
    </div>
  )
}
