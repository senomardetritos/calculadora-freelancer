'use client'
import React from 'react'
import { Card } from '@/components/Card/Card';
import { redirect, useRouter } from 'next/navigation';
import styles from './editprofile.module.css'
import Form from 'next/form';
import { useActionState, useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { editProfile } from './actions';
import { UserInterface } from '@/interfaces/user-interface';
import eventAuth from '@/helpers/auth-event';

export default function EditProfile() {

    const [state, formAction, isPending] = useActionState(editProfile, { success: false });
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [pending, setPending] = useState(true)
    const router = useRouter()

    async function fetchProfile() {
        const response = await fetch(`/api/my-profile`)
        const data = await response.json() as UserInterface
        setEmail(data.email)
        setName(data.name)
        setPending(false)
    }

    useEffect(() => {
        if (state.success) {
            eventAuth.emit('authChange', { state })
            redirect('/dashboard')
        }
    }, [state])

    useEffect(() => { fetchProfile() }, [])

    return (
        <section className="page">
            <div className={styles.profileContent}>
                <Card>
                    <header className={styles.header}>
                        <h2>Editar Perfil</h2>
                    </header>
                    <div className='divider'></div>
                    <div className={styles.body}>
                        <Form action={formAction}>
                            {!pending && <ul>
                                <li>
                                    <h3>Email</h3>
                                    <div>
                                        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {(state.errors && state.errors.email) && (
                                        <span className="form-error">{state.errors.email}</span>
                                    )}
                                </li>
                                <li>
                                    <h3>Name</h3>
                                    <div>
                                        <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    {(state.errors && state.errors.name) && (
                                        <span className="form-error">{state.errors.name}</span>
                                    )}
                                </li>
                            </ul>}
                            {pending && <Loader />}
                            <div className='divider'></div>
                            <ul>
                                <li>
                                    <footer>
                                        <button type='button' className='secondary' onClick={() => router.push('/dashboard')}>
                                            Voltar
                                        </button>
                                        <button type='submit' className='primary' disabled={isPending}>
                                            Salvar Perfil
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