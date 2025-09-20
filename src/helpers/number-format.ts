
export const currencyBRL = (value: number | undefined) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value ?? 0);
}

export const percentNumber = (value: number | undefined) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
    }).format(value ?? 0);
}
