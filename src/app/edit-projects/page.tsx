'use client'
import React from 'react'
import { Card } from '@/components/Card/Card';
import { useRouter } from 'next/navigation';
import styles from './editprojects.module.css'
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { ProjectInterface } from '@/interfaces/project-interface';
import DeleteProjectModal from './DeleteProjectModal';
import EditProjectModal from './EditProjectModal';
import { currencyBRL } from '@/helpers/number-format';

export default function EditProjects() {

    const [projects, setProjects] = useState<ProjectInterface[]>([])
    const [pending, setPending] = useState(true)

    const [editItem, setEditItem] = useState<ProjectInterface>()
    const [deleteItem, setDeleteItem] = useState<ProjectInterface>()

    const [months, setMonths] = useState(0)
    const [monthsValue, setMonthsValue] = useState(0)
    const [totalValue, setTotalValue] = useState(0)

    const router = useRouter()
    const modalEditRef = useRef<HTMLDialogElement>(null)
    const modalDeleteRef = useRef<HTMLDialogElement>(null)

    function showDeleteModal(data: ProjectInterface) {
        setDeleteItem(data)
        modalDeleteRef.current?.showModal()
    }

    async function showEditProjects(data: ProjectInterface) {
        await setEditItem(data)
        modalEditRef.current?.showModal()
    }

    async function showNewProjects() {
        await setEditItem({ id: '', name: '', months: 0, value: 0 })
        modalEditRef.current?.showModal()
    }

    async function fetchProjects() {
        setPending(true)
        const response = await fetch(`/api/my-projects`)
        const data = await response.json() as ProjectInterface[]
        setMonths(data.reduce((acc, item) => { return acc + item.months }, 0))
        setMonthsValue(data.reduce((acc, item) => {
            return acc + (item.months >= 1 ? (item.value / item.months) : item.value)
        }, 0))
        setTotalValue(data.reduce((acc, item) => { return acc + item.value }, 0))
        setProjects(data)
        setPending(false)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <section className="page">
            <div className={styles.projectsContent}>
                <Card>
                    <header className={styles.header}>
                        <h2>Meus Projetos</h2>
                        <button type='button' className='secondary sm' onClick={() => router.push('/dashboard')}>
                            Dashboard
                        </button>
                    </header>
                    <div className='divider'></div>
                    <div className={styles.body}>
                        {!pending && <table cellPadding={0} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Despesa</th>
                                    <th>Meses</th>
                                    <th className={styles.thNumbers}>Mensal</th>
                                    <th className={styles.thNumbers}>Total</th>
                                    <th className={styles.tableButtons}>Editar</th>
                                    <th className={styles.tableButtons}>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 && projects.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.months}</td>
                                        <td className={styles.tdNumbers}>{item.months >= 1 ? currencyBRL(item.value / item.months) : currencyBRL(item.value)}</td>
                                        <td className={styles.tdNumbers}>{currencyBRL(item.value)}</td>
                                        <td className={styles.tableButtons}>
                                            <button type='button' className='secondary sm' onClick={() => showEditProjects(item)}>
                                                Editar
                                            </button>
                                        </td>
                                        <td className={styles.tableButtons}>
                                            <button type='button' className='danger sm' onClick={() => showDeleteModal(item)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {!pending && projects.length == 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-secondary">Você ainda não tem projetos cadastrados</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>TOTAL</th>
                                    <th>{months.toFixed(2)}</th>
                                    <th>{currencyBRL(monthsValue)}</th>
                                    <th>{currencyBRL(totalValue)}</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>}
                        {pending && <Loader />}
                        <div className='divider'></div>
                        <ul>
                            <li>
                                <footer>
                                    <button type='button' className='secondary' onClick={() => router.push('/dashboard')}>
                                        Voltar para Dashboard
                                    </button>
                                    <button type='button' className='primary' onClick={() => showNewProjects()}>
                                        Adicionar Novo Projeto
                                    </button>
                                </footer>
                            </li>
                        </ul>
                    </div>
                </Card>
                <EditProjectModal editItem={editItem} ref={modalEditRef} onSuccess={fetchProjects} />
                <DeleteProjectModal ref={modalDeleteRef} deleteItem={deleteItem} onSuccess={fetchProjects} />
            </div>
        </section>
    )
}