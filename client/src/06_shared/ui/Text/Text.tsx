import { classNames } from '06_shared/lib/classNames/classNames'
import { memo } from 'react'
import { TextTheme } from './model/text'
import { TextAlign, TextSize } from './model/text'
import cls from './Text.module.css'


interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
  align?: TextAlign
  size?: TextSize
  overflow?: boolean
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.CENTER,
    size = TextSize.M,
    overflow = false
  } = props
  return (
    <div className={classNames(
      '',
      [
        className,
        cls[theme],
        cls[align],
        cls[size]
      ]
    )}>
      {title && <p className={classNames(cls.title, [], { [cls.ellipsis]: overflow })}>{title}</p>}
      {text && <p className={classNames(cls.text, [], { [cls.ellipsis]: overflow })}>{text}</p>}
    </div>
  )
})
