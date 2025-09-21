import React from 'react'
import { Modal } from "@/components/Modal/Modal"
import Form from "next/form"
import { ExpenseInterface } from "@/interfaces/expense-interface"
import { forwardRef, useActionState, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Loader } from "@/components/Loader/Loader"
import { editExpenses } from "./actions"
import { TypeExpenseEnum } from "@/enums/type-expense"

interface DeleteExpenseModalProps {
    editItem: ExpenseInterface | undefined,
    onSuccess: () => void
}

interface DialogRef {
    showModal: () => void;
}

const EditExpenseModal = forwardRef<DialogRef, DeleteExpenseModalProps>(({ editItem, onSuccess }, ref) => {

    const [state, formAction, isPending] = useActionState(editExpenses, { success: false });
    const modalRef = useRef<HTMLDialogElement>(null)

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('month')
    const [value, setValue] = useState(0)
    const [defaultError, setDefaultError] = useState('')

    const typeEnum = TypeExpenseEnum;

    function showModal() {
        if (!editItem) editItem = {} as ExpenseInterface
        setId(editItem.id)
        setName(editItem.name)
        setType(editItem.type)
        setValue(editItem.value)
        setDefaultError('')
        state.errors = {}
        modalRef.current?.showModal()
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <Modal ref={modalRef} onClose={closeModal}>
            <h2>{id ? 'Editar' : 'Nova'} Despesa</h2>
            <div className='divider'></div>
            <Form action={formAction}>
                <div>
                    <input
                        name="id"
                        type="hidden"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <ul>
                        <li>
                            <h4>Despesa</h4>
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {(state.errors && state.errors.name) && (
                                <span className="form-error">{state.errors.name}</span>
                            )}
                        </li>
                        <li>
                            <h4>Tipo</h4>
                            <select
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                {Object.keys(typeEnum).map((statusValue) => (
                                    <option key={statusValue} value={statusValue}>
                                        {typeEnum[statusValue as keyof typeof TypeExpenseEnum]}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <h4>Valor</h4>
                            <input
                                name="value"
                                type="number"
                                step="0.01"
                                value={value}
                                onChange={(e) => setValue(parseFloat(e.target.value))}
                            />
                            {(state.errors && state.errors.value) && (
                                <span className="form-error">{state.errors.value}</span>
                            )}
                        </li>
                    </ul>
                    <div className='divider'></div>
                    {defaultError && (
                        <>
                            <div className='form-error'>
                                {defaultError}
                            </div>
                            <div className='divider'></div>
                        </>
                    )}
                    <footer>
                        <button type='button' className='danger' onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type='submit' className='primary' disabled={isPending}>
                            {id ? 'Editar' : 'Cadastrar'} Despesa
                            {isPending && <Loader />}
                        </button>
                    </footer>
                </div>
            </Form>
        </Modal>
    )
})

EditExpenseModal.displayName = 'EditExpenseModal'

export default EditExpenseModal