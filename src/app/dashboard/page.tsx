'use client'
import React from 'react'
import { Card } from '@/components/Card/Card'
import styles from './dashboard.module.css'
import { MyExpenses } from '@/components/MyExpenses/MyExpenses'
import { HoursWorked } from '@/components/HoursWorked/HoursWorked'
import { DesiredProfit } from '@/components/DesiredProfit/DesiredProfit'
import { MyProjects } from '@/components/MyProjects/MyProjects'
import { useEffect, useState } from 'react'
import { DashBoardValuesInterface } from '@/interfaces/dashboard-values-interface'
import { Loader } from '@/components/Loader/Loader'
import { currencyBRL } from '@/helpers/number-format'

export default function DashBoard() {
    const [pending, setPending] = useState(true)
    const [dashBoardValues, setDashBoardValues] = useState<DashBoardValuesInterface>()

    async function fetchDashBoardValues() {
        setPending(true)
        const response = await fetch(`/api/dashboard-values`)
        const data = await response.json() as DashBoardValuesInterface
        setDashBoardValues(data)
        setPending(false)
    }

    useEffect(() => {
        fetchDashBoardValues()
    }, [])

    return (
        <section className="page">
            <div className={styles.dashBoardContent}>
                <aside>
                    <Card>
                        <h2>Você Precisa Cobrar</h2>
                        <div className="divider"></div>
                        <h1 className="text-primary">
                            {pending && <Loader />}
                            {!pending && (
                                <span>{currencyBRL(dashBoardValues?.should_charge)} / Hora</span>
                            )}
                        </h1>
                    </Card>
                    <HoursWorked />
                    <MyExpenses />
                </aside>
                <aside>
                    <Card>
                        <h2>Você Está Recebendo</h2>
                        <div className="divider"></div>
                        <h1 className="text-primary">
                            {pending && <Loader />}
                            {!pending && (
                                <span>{currencyBRL(dashBoardValues?.is_charging)} / Hora</span>
                            )}
                        </h1>
                    </Card>
                    <DesiredProfit />
                    <MyProjects />
                </aside>
            </div>
        </section>
    )
}