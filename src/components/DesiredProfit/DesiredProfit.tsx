'use client'
import React from 'react'
import { useEffect, useState } from "react"
import { Card } from "../Card/Card"
import styles from './desiredprofit.module.css'
import { Loader } from "../Loader/Loader"
import { useRouter } from "next/navigation"
import { currencyBRL, percentNumber } from "@/helpers/number-format"
import { DesiredProfitInterface } from "@/interfaces/desired-profit-interface"

export const DesiredProfit = () => {
    const [profit, setProfit] = useState(0)
    const [percent, setPercent] = useState('')
    const [total, setTotal] = useState(0)
    const [pending, setPending] = useState(true)

    const router = useRouter()

    async function fetchProfit() {
        const response = await fetch(`/api/desired-profit`)
        const data = await response.json() as DesiredProfitInterface
        setProfit(data.profit)
        setPending(false)
        setTotal(data.profit + data.expenses)
        if (data.expenses == 0) {
            setPercent('0')
        } else {
            setPercent((data.profit * 100 / data.expenses / 100).toString())
        }
    }

    useEffect(() => {
        fetchProfit()
    }, [])

    return (
        <Card>
            <header className={styles.header}>
                <h2>Lucro Desejado</h2>
                <button className="secondary sm" onClick={() => router.push('edit-profit')}>
                    Editar
                </button>
            </header>
            <div className="divider"></div>
            <div className={styles.body}>
                {pending && <Loader />}
                {!pending && (
                    <ul >
                        <li aria-label='percent'>
                            <h4>Percentual das Despesas</h4>
                            <h4 className="text-secondary">{percentNumber(parseFloat(percent))}</h4>
                        </li>
                        <li aria-label='profit'>
                            <h4>Lucro desejado</h4>
                            <h4 className="text-primary">{currencyBRL(profit)}</h4>
                        </li>
                    </ul>
                )}
                <div className="divider"></div>
                <ul>
                    <li aria-label='total'>
                        <h3>Receber por Mês</h3>
                        <h3 className="text-primary">{currencyBRL(total)}</h3>
                    </li>
                </ul>
            </div>
        </Card>
    )
}