import React, { useState } from 'react'
import { Modal } from "@/components/Modal/Modal"
import Form from "next/form"
import styles from './editprojects.module.css'
import { forwardRef, useActionState, useEffect, useImperativeHandle, useRef } from "react"
import { Loader } from "@/components/Loader/Loader"
import { deleteProjects } from "./actions"
import { ProjectInterface } from "@/interfaces/project-interface"
import { currencyBRL } from "@/helpers/number-format"

interface DeleteProjectModalProps {
    deleteItem: ProjectInterface | undefined,
    onSuccess: () => void
}

interface DialogRef {
    showModal: () => void;
}

const DeleteProjectModal = forwardRef<DialogRef, DeleteProjectModalProps>(({ deleteItem, onSuccess }, ref) => {

    const [state, formAction, isPending] = useActionState(deleteProjects, { success: false });
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
            <h2>Excluir Projeto</h2>
            <div className='divider'></div>
            <h4 className={styles.deleteText}>
                Deseja realmente excluir o projeto
                <span className='text-secondary'> {deleteItem?.name} </span>
                de {deleteItem?.months} meses por
                <span className='text-primary'> {currencyBRL(deleteItem?.value)} </span>
                ?
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
                        Excluir Projeto
                        {isPending && <Loader />}
                    </button>
                </footer>
            </Form>
        </Modal>
    )
})

DeleteProjectModal.displayName = 'DeleteProjectModal'

export default DeleteProjectModal