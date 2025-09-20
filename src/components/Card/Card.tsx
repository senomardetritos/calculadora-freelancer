import React from 'react'
import styles from './card.module.css'

interface CardProps {
    children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
    return (
        <div className={styles.cardContent}>
            {children}
        </div>
    )
}