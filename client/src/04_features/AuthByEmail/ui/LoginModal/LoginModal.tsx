import { LoginFormAsync } from '04_features/AuthByEmail/ui/LoginForm/LoginForm.async'
import { classNames } from '06_shared/lib/classNames/classNames'
import { Modal } from '06_shared/ui/Modal/Modal'
import { memo } from 'react'


interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void

}

export const LoginModal = memo((props: LoginModalProps) => {
  const { className, isOpen, onClose } = props
  return (
    <Modal
      className={classNames('', [className])}
      onClose={onClose}
      isOpen={isOpen}
      lazy
    >
      <LoginFormAsync onSuccess={onClose} />

    </Modal>
  )
})
