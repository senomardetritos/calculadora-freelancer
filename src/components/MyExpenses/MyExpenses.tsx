'use client'
import React from 'react'
import { useEffect, useState } from "react"
import { Card } from "../Card/Card"
import styles from './myexpenses.module.css'
import { ExpenseInterface } from "@/interfaces/expense-interface"
import { Loader } from "../Loader/Loader"
import { useRouter } from "next/navigation"
import { currencyBRL } from "@/helpers/number-format"

export const MyExpenses = () => {
    const [expenses, setExpenses] = useState<ExpenseInterface[]>([])
    const [total, setTotal] = useState(0)
    const [pending, setPending] = useState(true);

    const router = useRouter()

    async function fetchExpenses() {
        const response = await fetch(`/api/my-expenses`)
        const data = await response.json() as ExpenseInterface[]
        setExpenses(data)
        setPending(false)
        setTotal(data.reduce((acc, item) => {
            return acc + (item.type == 'month' ? item.value : item.value / 12)
        }, 0))
    }

    useEffect(() => {
        fetchExpenses()
    }, [])

    return (
        <Card>
            <header className={styles.header}>
                <h2>Minhas Despesas Mensais</h2>
                <button className="secondary sm" onClick={() => router.push('/edit-expenses')}>
                    Editar
                </button>
            </header>
            <div className="divider"></div>
            <div className={styles.body}>
                {pending && <Loader />}
                <ul >
                    {!pending && expenses.length > 0 && expenses.map(item => (
                        <li key={item.id}>
                            <h4>{item.name}</h4>
                            <h3 className="text-danger">{item.type == 'month' ? currencyBRL(item.value) : currencyBRL(item.value / 12)}</h3>
                        </li>
                    ))}
                    {!pending && expenses.length == 0 && (
                        <li>
                            <h5 className="text-secondary">Você ainda não tem desepesas cadastradas</h5>
                        </li>
                    )}
                </ul>
                <div className="divider"></div>
                <ul>
                    <li>
                        <h3>TOTAL</h3>
                        <h3 className="text-danger">{currencyBRL(total)}</h3>
                    </li>
                </ul>
            </div>

        </Card>
    )
}