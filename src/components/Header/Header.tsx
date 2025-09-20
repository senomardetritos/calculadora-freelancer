'use client'
import { useActionState, useCallback, useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo'
import styles from './header.module.css'
import { doLogout } from '@/app/auth';
import Form from 'next/form';
import { UserInterface } from '@/interfaces/user-interface';
import { Loader } from '../Loader/Loader';
import Link from 'next/link';
import eventAuth from '@/helpers/auth-event';
import { redirect } from "next/navigation";

export const Header = () => {
    const [state, formAction, isPending] = useActionState(doLogout, { success: false });
    const [logged, setLogged] = useState(false)
    const [pending, setPending] = useState(true)
    const [name, setName] = useState('')
    const [theme, setTheme] = useState('dark')

    async function fetchProfife() {
        setPending(true)
        const response = await fetch(`/api/my-profile`)
        const data = await response.json() as UserInterface
        if (data && data.name) {
            setName(data.name)
            setLogged(true)
        }
        setPending(false)
    }

    function toggleTheme() {
        const root = document.documentElement;
        if (theme == 'light') {
            root.style.setProperty('--foreground', 'var(--light)');
            root.style.setProperty('--foreground-1', 'var(--light-1)');
            root.style.setProperty('--background', 'var(--dark)');
            root.style.setProperty('--background-1', 'var(--dark-1)');
            setTheme('dark')
        } else {
            root.style.setProperty('--foreground', 'var(--dark)');
            root.style.setProperty('--foreground-1', 'var(--dark-1)');
            root.style.setProperty('--background', 'var(--light)');
            root.style.setProperty('--background-1', 'var(--light-1)');
            setTheme('light')
        }
    }

    const authChange = useCallback(() => { fetchProfife() }, []);

    useEffect(() => {
        if (state.success) {
            redirect('/')
        }
    }, [state])

    useEffect(() => {
        fetchProfife()
        eventAuth.on('authChange', authChange)
        return () => {
            eventAuth.removeListener('authChange', authChange);
        };
    }, [authChange])

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                {logged && (
                    <Form action={formAction}>
                        <div className={styles.data}>
                            {pending && <Loader />}
                            {!pending && <Link href="/edit-profile">{name}</Link>}
                            <span>|</span>
                            <button type="button" onClick={toggleTheme}>
                                {theme == 'dark' ? 'Tema Claro' : 'Tema Escuro'}
                            </button>
                            <span>|</span>
                            <button>
                                {!isPending && 'Sair'}
                                {isPending && <Loader />}
                            </button>
                        </div>
                    </Form>
                )}
            </div>
        </header>
    )
}