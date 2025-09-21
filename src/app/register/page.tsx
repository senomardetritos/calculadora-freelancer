'use client'
import React from 'react'
import Form from 'next/form'
import styles from './register.module.css'
import { useActionState, useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { redirect, useRouter } from 'next/navigation';
import { register } from './actions';
import eventAuth from '@/helpers/auth-event';
import AccountTest from '@/components/AccountTest/AccountTest';

export default function Register() {

    const router = useRouter()

    const [state, formAction, isPending] = useActionState(register, { success: false });
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        if (state.fields) {
            setEmail(state.fields.get('email') as string)
            setName(state.fields.get('name') as string)
        }
        if (state.success) {
            eventAuth.emit('authChange')
            redirect('/dashboard')
        }
    }, [state])

    return (
        <section className="page">
            <div className={styles.registerContent}>
                <h1>Criar Conta</h1>
                <Form action={formAction}>
                    <input name="email" type="email" placeholder="seunome@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    {(state.errors && state.errors.email) && (
                        <span className="form-error">{state.errors.email}</span>
                    )}
                    <input name="name" type="text" placeholder="Seu Nome" value={name} onChange={e => setName(e.target.value)} />
                    {(state.errors && state.errors.name) && (
                        <span className="form-error">{state.errors.name}</span>
                    )}
                    <input name="password" type="password" placeholder="Digite uma senha forte" />
                    {(state.errors && state.errors.password) && (
                        <span className="form-error">{state.errors.password}</span>
                    )}
                    <input name="repassword" type="password" placeholder="Repita a senha" />
                    {(state.errors && state.errors.repassword) && (
                        <span className="form-error">{state.errors.repassword}</span>
                    )}
                    <button type="submit" className="primary" disabled={isPending}>
                        Criar Conta
                        {isPending && <Loader />}
                    </button>
                    <button type="button" className="secondary" onClick={() => router.push('/login')}>
                        Já tenho uma conta
                    </button>
                </Form>
                <div className='line-or'>
                    <span>OU</span>
                </div>
                <AccountTest />
            </div>
        </section>
    )
}