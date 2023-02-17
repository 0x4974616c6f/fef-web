import React from 'react'
import styles from './styles.module.scss'
import { GiCancel } from 'react-icons/gi'

interface ModalProps {
    isOpen: boolean
    handleCloseModal: () => void
    children: React.ReactNode
}

function Modal({ handleCloseModal, children, isOpen }: ModalProps) {
    return (
        <>
            {isOpen &&
                <div className={styles.modal_overlay} >
                    <div className={styles.modal}>
                        <GiCancel style={{ cursor: "pointer" }} onClick={handleCloseModal} className={styles.closeModal} color='red' size={24} />
                        <div className={styles.modal_content}>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal