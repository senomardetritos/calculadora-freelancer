import React, { useState } from 'react'
import { Modal } from "@/components/Modal/Modal"
import Form from "next/form"
import styles from './editexpenses.module.css'
import { ExpenseInterface } from "@/interfaces/expense-interface"
import { forwardRef, useActionState, useEffect, useImperativeHandle, useRef } from "react"
import { Loader } from "@/components/Loader/Loader"
import { deleteExpenses } from "./actions"
import { currencyBRL } from "@/helpers/number-format"

interface DeleteExpenseModalProps {
    deleteItem: ExpenseInterface | undefined,
    onSuccess: () => void
}

interface DialogRef {
    showModal: () => void;
}

const DeleteExpenseModal = forwardRef<DialogRef, DeleteExpenseModalProps>(({ deleteItem, onSuccess }, ref) => {

    const [state, formAction, isPending] = useActionState(deleteExpenses, { success: false });
    const modalRef = useRef<HTMLDialogElement>(null)
    const inputRef = useRef(null);
    const [defaultError, setDefaultError] = useState('')

    function showModal() {
        modalRef.current?.showModal()
        setDefaultError('')
    }
    useImperativeHandle(ref, () => {
        return {
            showModal: showModal
        }
    })

    function closeModal() {
        modalRef.current?.close()
    }

    useEffect(() => {
        if (state.success) {
            onSuccess()
            closeModal()
        } else {
            setDefaultError(state.errors?.default || '')
        }
    }, [state, onSuccess])

    return (
        <Modal ref={modalRef} size='sm' onClose={closeModal}>
            <h2>Excluir Despesa</h2>
            <div className='divider'></div>
            <h4 className={styles.deleteText}>
                Deseja realmente excluir a despesa
                <span className='text-secondary'> {deleteItem?.name} </span>
                de
                <span className='text-primary'> {currencyBRL(deleteItem?.value)} </span>
                por {deleteItem?.type == 'month' ? 'Mês' : 'Ano'} ?
            </h4>
            {state.errors && state.errors.error && (
                <div className="form-error">{state.errors.error}</div>
            )}
            <div className='divider'></div>
            {defaultError && (
                <>
                    <div className='form-error'>
                        {defaultError}
                    </div>
                    <div className='divider'></div>
                </>
            )}
            <Form action={formAction}>
                <input
                    name="id"
                    type="hidden"
                    defaultValue={deleteItem?.id}
                    ref={inputRef}
                />
                <footer>
                    <button type='button' className='danger' onClick={closeModal}>
                        Cancelar
                    </button>
                    <button type='submit' className='primary' disabled={isPending}>
                        Excluir Despesa
                        {isPending && <Loader />}
                    </button>
                </footer>
            </Form>
        </Modal>
    )
})

DeleteExpenseModal.displayName = 'DeleteExpenseModal';

export default DeleteExpenseModal;