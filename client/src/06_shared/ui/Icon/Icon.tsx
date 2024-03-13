import { classNames } from '06_shared/lib/classNames/classNames'
import { IconTheme } from '06_shared/ui/Icon/model/icon'
import type { CSSProperties, FC, SVGProps } from 'react'
import { useMemo } from 'react'
import cls from './Icon.module.css'


interface IconProps {
  className?: string
  theme?: IconTheme
  size?: number | string
  Svg: FC<SVGProps<SVGSVGElement>>

}

export const Icon =(props: IconProps) => {
  const {
    className,
    theme = IconTheme.PRIMARY,
    size,
    Svg,
  } = props

  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size || 30,
      height: size || 30
    }
  }, [size])



  return (
    <Svg
      style={styles}
      className={classNames('', [className, cls[theme]])}
    />
  )
}
