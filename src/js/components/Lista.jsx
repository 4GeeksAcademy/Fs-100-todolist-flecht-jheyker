import React, { useEffect, useState } from "react";


export const Lista = () => {
 
    const [lista,setLista] = useState ([])
    const [tarea, setTarea] = useState("")

    useEffect(() => {
		getUserTodos()
	}, [])


    const creacionUsuario = ()=> {
        fetch('https://playground.4geeks.com/todo/users/Jheyker', {
			method: "POST"
		})
			.then(resp => {
				if (!resp.ok) throw new Error("Error al crear usuario");
				return resp.json()
			})
			.then(() => getUserTodos())
			.catch(err => console.error(err))
    }

    const getUserTodos = () => {
        fetch('https://playground.4geeks.com/todo/users/Jheyker')
			.then(resp => {
				if (!resp.ok) throw new Error("Usuario no existe");
				return resp.json()
			})
			.then(data => setLista(data.todos))
			.catch(() =>  creacionUsuario())
    }
    const agregarTarea = (e) => {
        e.preventDefault()
        if (tarea.trim() === "") return;

        fetch('https://playground.4geeks.com/todo/todos/Jheyker', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                label: tarea,
                is_done: false
            })
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Error al agregar tarea");
            return resp.json()
        })
        .then(() => {
            setTarea("");
            getUserTodos()
        })
        .catch(err => console.error(err));
    }
    const eliminarTarea = (id) => {
        fetch('https://playground.4geeks.com/todo/todos/'+ id, {
            method: 'DELETE'
        })
            .then(() => getUserTodos())
            .catch(err => console.error(err))
    };

    return (
    <div className="container mt-3">

    <ul className="list-group mb-3">
        <li className="mb-2">
    <form onSubmit={agregarTarea}>
        <input
            type="text"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            placeholder={lista.length === 0 ? "No hay tareas" : "Añadir tarea"}
            className="lista form-control"
        />
        <input type="submit" hidden/>
    </form>
    </li>
        {lista.map(item => (
            <li key={item.id} className="tarea list-group-item d-flex justify-content-between align-items-center p-2">
                {item.label}
              <span className="iconoBasura" onClick={() => eliminarTarea(item.id)}><i className="fa-solid fa-trash"></i></span>
            </li>
        ))}
         <li className="list-group-item text-muted small">
                {lista.length} {lista.length === 1 ? "tarea pendiente" : "tareas pendientes"}
            </li>
       
        </ul>
        

        </div>
    )
    
}

