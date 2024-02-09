import { classNames } from '06_shared/lib/classNames/classNames'
import { LoaderSize } from '06_shared/ui/Loader/model/loader'
import cls from './Loader.module.css'
import { memo } from 'react'




interface LoaderProps {
  className?: string
  size?: LoaderSize
}

export const Loader = memo((props: LoaderProps) => {
  const {
    className,
    size = LoaderSize.S
  } = props
  return (
    <div className={classNames( cls.Loader, [className, cls[size]] )}>
      <div className={cls.spinner}>

      </div>
    </div>
  )
})
