'use client'
import React from 'react'
import { Card } from '@/components/Card/Card';
import { redirect, useRouter } from 'next/navigation';
import styles from './editprofit.module.css'
import Form from 'next/form';
import { useActionState, useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { editProfit } from './actions';
import { currencyBRL, percentNumber } from '@/helpers/number-format';
import { DesiredProfitInterface } from '@/interfaces/desired-profit-interface';

export default function EditProfit() {

    const [state, formAction, isPending] = useActionState(editProfit, { success: false });
    const [profit, setProfit] = useState('1')
    const [percent, setPercent] = useState('')
    const [expenses, setExpenses] = useState(0)
    const [pending, setPending] = useState(true)
    const router = useRouter()

    async function fetchProfit() {
        const response = await fetch(`/api/desired-profit`)
        const data = await response.json() as DesiredProfitInterface
        setProfit(data.profit.toString())
        setExpenses(data.expenses)
        if (data.expenses == 0) {
            setPercent('0')
        } else {
            setPercent((data.profit * 100 / data.expenses / 100).toString())
        }
        setPending(false)
    }

    function changeProfit(new_profit: string) {
        setProfit(new_profit)
        if (expenses == 0) {
            setPercent('0')
        } else {
            setPercent((parseFloat(new_profit) * 100 / expenses / 100).toString())
        }
    }

    useEffect(() => {
        if (state.success) {
            redirect('/dashboard')
        }
    }, [state])

    useEffect(() => { fetchProfit() }, [])

    return (
        <section className="page">
            <div className={styles.profitContent}>
                <Card>
                    <header className={styles.header}>
                        <h2>Lucro Desejado</h2>
                    </header>
                    <div className='divider'></div>
                    <div className={styles.body}>
                        <Form action={formAction}>
                            {!pending && <ul>
                                <li>
                                    <h3>Lucro em Reais</h3>
                                    <div>
                                        <input
                                            name="profit"
                                            type="range"
                                            min="100"
                                            max="30000"
                                            step="100"
                                            value={profit}
                                            onChange={(e) => changeProfit(e.target.value)}
                                        />
                                        <span>{currencyBRL(parseFloat(profit))}</span>
                                    </div>
                                </li>
                            </ul>}
                            {pending && <Loader />}
                            <div className='divider'></div>
                            <ul>
                                <li>
                                    <footer>
                                        <h4>Percentual Despesas</h4>
                                        {!pending && <h4 className='text-secondary'>{percentNumber(parseFloat(percent))} </h4>}
                                    </footer>
                                </li>
                                <li>
                                    <footer>
                                        <h4>Despesas por Mês</h4>
                                        {!pending && <h4 className='text-danger'>{currencyBRL(expenses)}</h4>}
                                    </footer>
                                </li>
                            </ul>
                            <div className='divider'></div>
                            <ul>
                                <li>
                                    <footer>
                                        <h3>Receber por Mês</h3>
                                        {!pending && <h3 className='text-primary'>{currencyBRL(parseFloat(profit) + expenses)}</h3>}
                                    </footer>
                                </li>
                            </ul>
                            <div className='divider'></div>
                            <ul>
                                <li>
                                    <footer>
                                        <button type='button' className='secondary' onClick={() => router.push('/dashboard')}>
                                            Voltar
                                        </button>
                                        <button type='submit' className='primary' disabled={isPending}>
                                            Salvar Lucro
                                            {isPending && <Loader />}
                                        </button>
                                    </footer>
                                </li>
                            </ul>
                        </Form>
                    </div>
                </Card>
            </div>
        </section>
    )
}