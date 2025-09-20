'use client'
import React from 'react'
import { Card } from '@/components/Card/Card';
import { useRouter } from 'next/navigation';
import styles from './editexpenses.module.css'
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { ExpenseInterface } from '@/interfaces/expense-interface';
import { TypeExpenseEnum } from '@/enums/type-expense';
import DeleteExpenseModal from './DeleteExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import { currencyBRL } from '@/helpers/number-format';

export default function EditExpenses() {

    const [expenses, setExpenses] = useState<ExpenseInterface[]>([])
    const [pending, setPending] = useState(true)

    const [editItem, setEditItem] = useState<ExpenseInterface>()
    const [deleteItem, setDeleteItem] = useState<ExpenseInterface>()

    const [totalMonth, setTotalMonth] = useState(0)
    const [totalYear, setTotalYear] = useState(0)

    const router = useRouter()
    const typeEnum = TypeExpenseEnum;
    const modalEditRef = useRef<HTMLDialogElement>(null)
    const modalDeleteRef = useRef<HTMLDialogElement>(null)

    function showDeleteModal(data: ExpenseInterface) {
        setDeleteItem(data)
        modalDeleteRef.current?.showModal()
    }

    async function showEditExpenses(data: ExpenseInterface) {
        await setEditItem(data)
        modalEditRef.current?.showModal()
    }

    async function showNewExpenses() {
        await setEditItem({ id: '', name: '', type: '', value: 0 })
        modalEditRef.current?.showModal()
    }

    async function fetchExpenses() {
        setPending(true)
        const response = await fetch(`/api/my-expenses`)
        const data = await response.json() as ExpenseInterface[]
        const total_month = data.reduce((acc, item) => {
            return acc + (item.type == 'month' ? item.value : (item.value / 12))
        }, 0)
        setTotalMonth(total_month)
        const total_year = data.reduce((acc, item) => {
            return acc + (item.type == 'year' ? item.value : (item.value * 12))
        }, 0)
        setTotalYear(total_year)
        setExpenses(data)
        setPending(false)
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <section className="page">
            <div className={styles.expensesContent}>
                <Card>
                    <header className={styles.header}>
                        <h2>Minhas Despesas</h2>
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
                                    <th>Tipo</th>
                                    <th className={styles.thNumbers}>Mensal</th>
                                    <th className={styles.thNumbers}>Anual</th>
                                    <th className={styles.tableButtons}>Editar</th>
                                    <th className={styles.tableButtons}>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.length > 0 && expenses.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.type == 'month' ? typeEnum.month : typeEnum.year}</td>
                                        <td className={styles.tdNumbers}>{item.type == 'month' ? currencyBRL(item.value) : currencyBRL(item.value / 12)}</td>
                                        <td className={styles.tdNumbers}>{item.type == 'year' ? currencyBRL(item.value) : currencyBRL(item.value * 12)}</td>
                                        <td className={styles.tableButtons}>
                                            <button type='button' className='secondary sm' onClick={() => showEditExpenses(item)}>
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
                                {expenses.length == 0 && (
                                    <tr>
                                        <td colSpan={6} className='text-secondary'>Você ainda não tem desepesas cadastradas</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>TOTAL</th>
                                    <th></th>
                                    <th>{currencyBRL(totalMonth)}</th>
                                    <th>{currencyBRL(totalYear)}</th>
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
                                    <button type='button' className='primary' onClick={() => showNewExpenses()}>
                                        Adicionar Nova Despesa
                                    </button>
                                </footer>
                            </li>
                        </ul>
                    </div>
                </Card>
                <EditExpenseModal editItem={editItem} ref={modalEditRef} onSuccess={fetchExpenses} />
                <DeleteExpenseModal deleteItem={deleteItem} ref={modalDeleteRef} onSuccess={fetchExpenses} />
            </div>
        </section>
    )
}