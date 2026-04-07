import styles from './Toast.module.scss'
type Props = {
    message: string
    type: 'success' | 'error'
}

const Toast = ({message, type}: Props) => {
    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            {message}
        </div>
    )
}

export default Toast