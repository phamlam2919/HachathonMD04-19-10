import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    id: number;
    name: string;
    status: string;
}
type Props = {};

const TodoList = (props: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    const listUsers = () => {
        axios
            .get(`http://localhost:3000/api/v1/users/todo`)
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => console.log(err));
    };

    const [newTodo, setNewTodo] = useState<string>("");
    const addTodo = async () => {
        try {
            const response = await axios.post<User>(
                "http://localhost:3000/api/v1/users/todo",
                {
                    name: newTodo,
                    status: "0",
                }
            );
            setUsers([...users, response.data]);
            setNewTodo("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = (id: number) => {
        axios
            .put(`http://localhost:3000/api/v1/users/todo/${id}`)
            .then(() => listUsers())
            .catch((err) => console.log(err));
    };

    const deleteTodo = (id: any) => {
        axios
            .delete(`http://localhost:3000/api/v1/users/todo/${id}`)
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== id)
                );
                listUsers();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        listUsers();
    }, [newTodo]);
    return (
        <div className="mt-10">
            <div
                style={{ margin: "0 auto" }}
                className="bg-white p-4 rounded-lg shadow-md w-2/5"
            >
                <h1 className="text-2xl font-semibold mb-4">Todo List</h1>

                <div className="mb-4 flex">
                    <input
                        type="text"
                        className="w-full px-2 py-1 border rounded-md"
                        placeholder="Add a new task"
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button
                        onClick={addTodo}
                        className="bg-blue-500 text-white px-4 py-1 ml-2 rounded-md"
                    >
                        Add
                    </button>
                </div>

                <div className="list-disc ml-2">
                    {users.length > 0 &&
                        users.map((e: any, i: any) => (
                            <div className="flex justify-between" key={i}>
                                <span
                                    className={
                                        e.status === 1 ? "line-through" : ""
                                    }
                                >
                                    {e.name}
                                </span>
                                <span className="flex gap-5 items-center">
                                    <button>
                                        <input
                                            checked={e.status == 1}
                                            onClick={() =>
                                                handleUpdate(e.todo_id)
                                            }
                                            className="w-4 h-4 mt-2"
                                            type="checkbox"
                                        />
                                    </button>
                                    <button>
                                        <i
                                            onClick={() =>
                                                deleteTodo(e.todo_id)
                                            }
                                            className="fa-solid fa-trash"
                                        ></i>
                                    </button>
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default TodoList;
