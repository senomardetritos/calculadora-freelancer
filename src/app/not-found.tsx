import React from 'react'
import Link from "next/link";

export default function Custom404() {
    return (
        <section className="page">
            <div>
                <h1>404 - Página não encontrada</h1>
                <br />
                <Link href="/">Voltar para página inicial</Link>
            </div>
        </section>
    )
}