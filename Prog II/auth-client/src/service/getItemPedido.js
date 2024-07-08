async function getItemPedido(){
    const response = await fetch('http://localhost:8080/item_pedido', {
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

export default getItemPedido;