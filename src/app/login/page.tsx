'use client'
import React from 'react'
import Form from 'next/form'
import { login } from './actions'
import styles from './login.module.css'
import { useActionState, useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { redirect, useRouter } from 'next/navigation';
import eventAuth from '@/helpers/auth-event';

export default function Login() {

  const router = useRouter()

  const [state, formAction, isPending] = useActionState(login, { success: false });
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (state.fields) {
      setEmail(state.fields.get('email') as string)
    }
    if (state.success) {
      eventAuth.emit('authChange')
      redirect('/dashboard')
    }
  }, [state])

  return (
    <section className="page">
      <div className={styles.loginContent}>
        <h1>Entrar</h1>
        <Form action={formAction}>
          <input name="email" type="email" placeholder="seunome@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          {(state.errors && state.errors.email) && (
            <span className="form-error">{state.errors.email}</span>
          )}
          <input name="password" type="password" placeholder="Digite sua senha" />
          {(state.errors && state.errors.password) && (
            <span className="form-error">{state.errors.password}</span>
          )}
          <button type="submit" className="primary" disabled={isPending}>
            Entrar
            {isPending && <Loader />}
          </button>
          <button type="button" className="secondary" onClick={() => router.push('/register')}>
            Criar nova conta
          </button>
        </Form>
      </div>
    </section>
  )
}