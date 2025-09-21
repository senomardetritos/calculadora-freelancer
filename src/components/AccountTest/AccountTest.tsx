'use client'
import React from 'react'
import Form from 'next/form'
import { useActionState, useEffect, useState } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { redirect } from 'next/navigation';
import eventAuth from '@/helpers/auth-event';
import { login } from '@/app/login/actions';

export default function AccountTest() {

  const [state, formAction, isPending] = useActionState(login, { success: false });
  const [email, setEmail] = useState('teste@email.com')
  const [password, setPassword] = useState('teste123')

  useEffect(() => {
    if (state.success) {
      eventAuth.emit('authChange')
      redirect('/dashboard')
    }
  }, [state])

  return (
    <Form action={formAction}>
      <input name="email" type="hidden" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input name="password" type="hidden" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="link" disabled={isPending}>
        Entrar com Credenciais de Teste
        {isPending && <Loader />}
      </button>
    </Form>
  )
}