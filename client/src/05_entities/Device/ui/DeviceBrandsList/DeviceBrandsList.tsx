import { DeviceBrandItem } from '05_entities/Device/ui/DeviceBrandItem/DeviceBrandItem'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Mode, useResizeScroll } from '06_shared/lib/hooks/useResizeScroll'
import { getDeviceBrands } from '../../model/selectors/deviceSelectors'
import cls from './DeviceBrandsList.module.css'


interface DeviceBrandsListProps {
  className?: string

}

export const DeviceBrandsList = (props: DeviceBrandsListProps) => {
  const {
    className
  } = props
  const brands = useAppSelector(getDeviceBrands)
  const { listRef, hasScroll } = useResizeScroll(Mode.HOR)
  return (
    <div className={classNames('', [className])}>
      <ul ref={listRef} className={classNames(cls.brands, [], {
        [cls.scrollable]: hasScroll
      })}>
        {brands?.map(brand => (
          <li key={brand.id} className={cls.brand}>
            <DeviceBrandItem className={cls.btn} brand={brand} />
          </li>
        ))}
      </ul>
    </div>
  )
}
