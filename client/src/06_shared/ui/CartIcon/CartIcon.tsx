import Cart from '06_shared/assets/icons/cart.svg'
import { classNames } from '06_shared/lib/classNames/classNames'
import { Icon } from '06_shared/ui/Icon/Icon'
import type { IconTheme } from '06_shared/ui/Icon/model/icon'
import { TextSize, TextTheme } from '06_shared/ui/Text/model/text'
import { Text } from '06_shared/ui/Text/Text'
import { memo } from 'react'
import cls from './CartIcon.module.css'


interface CartIconProps {
  className?: string
  theme?: IconTheme
  size?: number
  goodsQty?: number
}

export const CartIcon = memo((props: CartIconProps) => {
  const {
    className,
    theme,
    size,
    goodsQty = 0
  } = props
  return (
    <div className={cls.cart}>
      <Icon
        Svg={Cart}
        theme={theme}
        size={size}
        className={classNames('', [className])}
      />
      {goodsQty ? <Text
        className={cls.qty}
        text={String(goodsQty)}
        theme={TextTheme.INVERTED_BG_ALL}
        size={TextSize.S}
      />: null}
    </div>
  )
})
