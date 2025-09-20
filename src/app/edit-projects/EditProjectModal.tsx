import React from 'react'
import { Modal } from "@/components/Modal/Modal"
import Form from "next/form"
import { forwardRef, useActionState, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Loader } from "@/components/Loader/Loader"
import { editProjects } from "./actions"
import { ProjectInterface } from "@/interfaces/project-interface"
import { DashBoardValuesInterface } from "@/interfaces/dashboard-values-interface"
import { currencyBRL } from "@/helpers/number-format"
import { HourWorkedInterface } from "@/interfaces/hour-worked-interface"
import styles from './editprojects.module.css'

interface DeleteProjectModalProps {
    editItem: ProjectInterface | undefined,
    onSuccess: () => void
}

interface DialogRef {
    showModal: () => void;
}

const EditProjectModal = forwardRef<DialogRef, DeleteProjectModalProps>(({ editItem, onSuccess }, ref) => {

    const [state, formAction, isPending] = useActionState(editProjects, { success: false });
    const modalRef = useRef<HTMLDialogElement>(null)

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [hours, setHours] = useState('')
    const [months, setMonths] = useState('')
    const [value, setValue] = useState('')
    const [pending, setPending] = useState(true)
    const [shouldCharge, setShouldCharge] = useState(0)
    const [monthHours, setMonthHours] = useState(0)

    function showModal() {
        if (!editItem) editItem = {} as ProjectInterface
        setId(editItem.id)
        setName(editItem.name)
        changeMonths(editItem.months.toString())
        setValue(editItem.value.toString())
        fetchValues()
        state.errors = {}
        modalRef.current?.showModal()
    }

    async function fetchValues() {
        setPending(true)
        const response = await fetch(`/api/dashboard-values`)
        const data = await response.json() as DashBoardValuesInterface
        setShouldCharge(data.should_charge)
        const response2 = await fetch(`/api/hours-worked`)
        const data2 = await response2.json() as HourWorkedInterface
        setMonthHours(data2.hours_per_day * data2.days_per_week * 4)
        setPending(false)
    }

    function changeMonths(new_value: string) {
        setMonths(new_value)
        const new_hours = parseFloat(new_value) * monthHours
        setHours(new_hours.toFixed(0))
    }

    function changeHours(new_value: string) {
        setHours(new_value)
        const new_months = parseFloat(new_value) / monthHours
        setMonths(new_months.toFixed(2))
    }

    function useTotal() {
        setValue((shouldCharge * monthHours * parseFloat(months)).toFixed(2))
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <Modal ref={modalRef} onClose={closeModal}>
            <h2>{id ? 'Editar' : 'Novo'} Projeto</h2>
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
                            <h4>Projeto</h4>
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
                    </ul>
                    <ul>
                        <li>
                            <h4>Horas</h4>
                            <input
                                name="hours"
                                type="number"
                                step="0.01"
                                value={hours}
                                onChange={(e) => changeHours(e.target.value)}
                            />
                            {(state.errors && state.errors.months) && (
                                <span className="form-error">{state.errors.months}</span>
                            )}
                        </li>
                        <li>
                            <h4>Meses</h4>
                            <input
                                name="months"
                                type="number"
                                step="0.01"
                                value={months}
                                onChange={(e) => changeMonths(e.target.value)}
                            />
                            {(state.errors && state.errors.months) && (
                                <span className="form-error">{state.errors.months}</span>
                            )}
                        </li>
                        <li className={styles.formValue}>
                            <h4>Valor</h4>
                            <input
                                name="value"
                                type="number"
                                step="0.01"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <button type="button" className="secondary sm" onClick={useTotal}>
                                Usar Total
                            </button>
                            {(state.errors && state.errors.value) && (
                                <span className="form-error">{state.errors.value}</span>
                            )}
                        </li>
                    </ul>
                    <div className="divider"></div>
                    <div className={styles.infos}>
                        <h4>Trabalhando</h4>
                        {!pending && <h4 className="text-secondary">{monthHours} Horas / Mês</h4>}
                        {pending && <Loader />}
                        <h4>pelo valor de</h4>
                        {!pending && <h4 className="text-primary">{currencyBRL(shouldCharge)} / Hora</h4>}
                        {pending && <Loader />}
                    </div>
                    <div className={styles.infos}>
                        <h4>Você deveria cobrar por</h4>
                        {!pending && <h4 className="text-secondary">{(monthHours * parseFloat(months || '0')).toFixed(0)} Horas</h4>}
                        {pending && <Loader />}
                        <h4>o valor de </h4>
                        {!pending && <h4 className="text-primary">{currencyBRL(shouldCharge * monthHours * parseFloat(months || '0'))}</h4>}
                        {pending && <Loader />}
                    </div>
                    <div className='divider'></div>
                    <footer>
                        <button type='button' className='danger' onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type='submit' className='primary' disabled={isPending}>
                            {id ? 'Editar' : 'Cadastrar'} Projeto
                            {isPending && <Loader />}
                        </button>
                    </footer>
                </div>
            </Form>
        </Modal>
    )
})

EditProjectModal.displayName = 'EditProjectModal'

export default EditProjectModal