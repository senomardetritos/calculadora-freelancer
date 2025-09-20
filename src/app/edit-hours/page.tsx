'use client'
import React from 'react'
import { Card } from '@/components/Card/Card';
import { redirect, useRouter } from 'next/navigation';
import styles from './edithours.module.css'
import Form from 'next/form';
import { useActionState, useEffect, useState } from 'react';
import { editHours } from './actions';
import { HourWorkedInterface } from '@/interfaces/hour-worked-interface';
import { Loader } from '@/components/Loader/Loader';

export default function EditHours() {

    const [state, formAction, isPending] = useActionState(editHours, { success: false });
    const [hourPerDay, setHourPerDay] = useState('1')
    const [daysPerWeek, setDaysPerWeek] = useState('1')
    const [pending, setPending] = useState(true)
    const router = useRouter()

    async function fetchHours() {
        const response = await fetch(`/api/hours-worked`)
        const data = await response.json() as HourWorkedInterface
        setHourPerDay(data.hours_per_day ? data.hours_per_day.toString() : '0')
        setDaysPerWeek(data.days_per_week ? data.days_per_week.toString() : '0')
        setPending(false)
    }

    useEffect(() => {
        if (state.success) {
            redirect('/dashboard')
        }
    }, [state])

    useEffect(() => { fetchHours() }, [])

    return (
        <section className="page">
            <div className={styles.hoursContent}>
                <Card>
                    <header className={styles.header}>
                        <h2>Horas Trabalhadas</h2>
                    </header>
                    <div className='divider'></div>
                    <div className={styles.body}>
                        <Form action={formAction}>
                            {!pending && <ul>
                                <li>
                                    <h3>Horas por Dia</h3>
                                    <div>
                                        <input
                                            name="hours_per_day"
                                            type="range"
                                            min="1"
                                            max="24"
                                            value={hourPerDay}
                                            onChange={(e) => setHourPerDay(e.target.value)}
                                        />
                                        <span>{hourPerDay}</span>
                                    </div>
                                </li>
                                <li>
                                    <h3>Dias por Semana</h3>
                                    <div>
                                        <input
                                            name="days_per_week"
                                            type="range"
                                            min="1"
                                            max="7"
                                            value={daysPerWeek}
                                            onChange={(e) => setDaysPerWeek(e.target.value)}
                                        />
                                        <span>{daysPerWeek}</span>
                                    </div>
                                </li>
                            </ul>}
                            {pending && <Loader />}
                            <div className='divider'></div>
                            <ul>
                                <li>
                                    <footer>
                                        <h3>Horas Total por Mês</h3>
                                        {!pending && <h3>{parseInt(hourPerDay) * parseInt(daysPerWeek) * 4}</h3>}
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
                                            Salvar Horas
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