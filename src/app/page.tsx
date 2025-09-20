'use client'
import React from 'react'
import { Logo } from "@/components/Logo/Logo";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <section className="page">
      <div className={styles.homeContent}>
        <aside>
          <div className={styles.logo}><Logo /></div>
          <p>
            Muitos freelancers, especialmente iniciantes, subestimam seus custos (impostos, luz, internet, software)
            e acabam cobrando um valor por hora que, no final, não é lucrativo.
            Esta ferramenta ajuda a calcular o valor mínimo que eles precisam cobrar
            por hora para cobrir seus custos e ter o lucro desejado.
          </p>
        </aside>
        <aside>
          <h2>App Calculadora de Custo Real por Hora para Freelancers</h2>
          <div className={styles.buttons}>
            <button className="primary" onClick={() => router.push('/register')}>
              Comece Agora
            </button>
            <button className="secondary" onClick={() => router.push('/login')}>
              Já tenho uma conta
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
