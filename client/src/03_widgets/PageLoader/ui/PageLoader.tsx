import { Loader } from '06_shared/ui/Loader/Loader'
import cls from './PageLoader.module.css'

export const PageLoader = () => {
  return <div className={cls.wrapper}>
    <Loader/>
  </div>
}
