'use client'
import React from 'react'
import { Card } from '../Card/Card';
import styles from './modal.module.css'
import { forwardRef, useImperativeHandle, useRef } from "react"

interface DialogProps {
    children: React.ReactNode;
    size?: string;
    onClose: () => void;
}

interface DialogRef {
    showModal: () => void;
    close: () => void;
}

const ModalComponent = forwardRef<DialogRef, DialogProps>(({ children, size, onClose }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const closeModal = () => {
        dialogRef.current?.close();
    }
    const openModal = () => {
        dialogRef.current?.showModal();
    }
    useImperativeHandle(ref, () => {
        return {
            close: closeModal,
            showModal: openModal
        }
    })
    return (
        <dialog className={`${styles.dialog} ${styles[size as keyof object]}`} ref={dialogRef} onClose={onClose}>
            <Card>
                <button className={styles.buttonClose} type="button" onClick={closeModal}>X</button>
                {children}
            </Card>
        </dialog>
    )
})

ModalComponent.displayName = 'Modal'

export const Modal = ModalComponent