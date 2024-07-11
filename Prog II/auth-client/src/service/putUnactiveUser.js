async function putUnactiveUser(data) {
    const id_usuario = localStorage.getItem('id_usuario'); 
    const token = localStorage.getItem('token'); 
    const response = await fetch(`http://localhost:8080/usuario/update_usuario/${id_usuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    
    return await response.json();
}

export default putUnactiveUser;
