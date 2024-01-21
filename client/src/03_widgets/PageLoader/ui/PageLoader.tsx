import { CircularProgress } from '@mui/material'
import cls from './PageLoader.module.css'



export const PageLoader = () => {
  return (
    <div className={cls.wrapper}>
      <CircularProgress size={150} color={'primary'} />
    </div>
  ) 
}
