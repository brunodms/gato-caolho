async function getFormaPagamento(){
    const response = await fetch('http://localhost:8080/forma_pagamento', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors[0]);
    }
    return await response.json();
}

export default getFormaPagamento;