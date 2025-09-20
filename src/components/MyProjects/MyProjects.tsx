'use client'
import React from 'react'
import { useEffect, useState } from "react"
import { Card } from "../Card/Card"
import styles from './myprojects.module.css'
import { Loader } from "../Loader/Loader"
import { ProjectInterface } from "@/interfaces/project-interface"
import { useRouter } from "next/navigation"
import { currencyBRL } from "@/helpers/number-format"

export const MyProjects = () => {
    const [projects, setProjects] = useState<ProjectInterface[]>([])
    const [total, setTotal] = useState(0)
    const [pending, setPending] = useState(true);
    const router = useRouter()

    async function fetchProjects() {
        const response = await fetch(`/api/my-projects`)
        const data = await response.json() as ProjectInterface[]
        setProjects(data)
        setPending(false)
        setTotal(data.reduce((acc, item) => {
            return acc + (item.months < 1 ? item.value : item.value / item.months)
        }, 0))
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <Card>
            <header className={styles.header}>
                <h2>Meus Projetos</h2>
                <button className="secondary sm" onClick={() => router.push('/edit-projects')}>
                    Editar
                </button>
            </header>
            <div className="divider"></div>
            <div className={styles.body}>
                {pending && <Loader />}
                <ul >
                    {!pending && projects.length > 0 && projects.map(item => (
                        <li key={item.id}>
                            <h4>{item.name}</h4>
                            <h3 className="text-primary">{item.months < 1 ? currencyBRL(item.value) : currencyBRL(item.value / item.months)}</h3>
                        </li>
                    ))}
                    {!pending && projects.length == 0 && (
                        <li>
                            <h5 className="text-secondary">Você ainda não tem projetos cadastrados</h5>
                        </li>
                    )}
                </ul>
                <div className="divider"></div>
                <ul>
                    <li>
                        <h3>TOTAL</h3>
                        <h3 className="text-primary">{currencyBRL(total)}</h3>
                    </li>
                </ul>
            </div>

        </Card>
    )
}