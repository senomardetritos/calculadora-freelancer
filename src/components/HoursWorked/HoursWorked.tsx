'use client'
import React from 'react'
import { useEffect, useState } from "react"
import { Card } from "../Card/Card"
import styles from './hoursworked.module.css'
import { Loader } from "../Loader/Loader"
import { HourWorkedInterface } from "@/interfaces/hour-worked-interface"
import { useRouter } from "next/navigation"

export const HoursWorked = () => {
    const [hours, setHours] = useState<HourWorkedInterface>()
    const [total, setTotal] = useState(0)
    const [pending, setPending] = useState(true);
    const router = useRouter();

    async function fetchHours() {
        const response = await fetch(`/api/hours-worked`)
        const data = await response.json() as HourWorkedInterface
        setHours(data)
        setPending(false)
        setTotal(data.hours_per_day * data.days_per_week * 4)
    }

    useEffect(() => {
        fetchHours()
    }, [])

    return (
        <Card>
            <header className={styles.header}>
                <h2>Horas Trabalhadas</h2>
                <button className="secondary sm" onClick={() => router.push('edit-hours')}>
                    Editar
                </button>
            </header>
            <div className="divider"></div>
            <div className={styles.body}>
                {pending && <Loader />}
                {!pending && hours && (
                    <ul>
                        <li aria-label='hours_per_day'>
                            <h4>Horas por dia</h4>
                            <h4 className="text-secondary">{hours.hours_per_day}</h4>
                        </li>
                        <li aria-label='days_per_week'>
                            <h4>Dias por semana</h4>
                            <h4 className="text-secondary">{hours.days_per_week}</h4>
                        </li>
                    </ul>
                )}
                <div className="divider"></div>
                <ul>
                    <li aria-label='total'>
                        <h3>Horas por Mês</h3>
                        <h3 className="text-secondary">{total}</h3>
                    </li>
                </ul>
            </div>

        </Card>
    )
}