async function getUsuarioById(id) {
    const response = await fetch(`http://localhost:8080/usuario/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return await response.json();
}

export default getUsuarioById;
