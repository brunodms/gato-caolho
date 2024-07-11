async function getProduto(){
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/produto', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.errors[0]);
    }
    return await response.json();
}

export default getProduto;