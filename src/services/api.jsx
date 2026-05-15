//const BASE_URL = "http://localhost:5000"
const BASE_URL =
    "https://todo-backend-w4ml.onrender.com"
const getAuthHeaders =
    (token) => {

        return {
            "Content-Type":
                "application/json",

            Authorization:
                `Bearer ${token}`
        }
    }
export const signUp = async (email, password) => {
    try {
        const res = await fetch(
            `${BASE_URL}/signup`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );
        const data = await res.json();



        return data;



    } catch (err) {
        console.log(err);
    }
}
export const logIn = async (email, password) => {
    try {
        const res = await fetch(
            `${BASE_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );
        const data = await res.json();


        return data


    } catch (err) {
        console.log(err);
    }
}

export const getTasks =
    async (token) => {

        const response =
            await fetch(
                `${BASE_URL}/tasks`,
                {
                    headers: getAuthHeaders(token),
                }
            )
        if (!response.ok) {
            throw new Error(
                "Failed to fetch tasks"
            )
        }
        return response.json()
    }


export const createTask =
    async (newTask, token) => {

        const response =
            await fetch(`${BASE_URL}/tasks`,
                {
                    method: "POST",

                    headers: getAuthHeaders(token),

                    body: JSON.stringify(newTask),
                });
        if (!response.ok) {

            throw new Error(
                "Failed to fetch tasks"
            )
        }
        return response.json();
    }


export const deleteTask =
    async (id, token) => {

        const response =
            await fetch(`${BASE_URL}/tasks/${id}`,
                {
                    method: "DELETE",

                    headers: getAuthHeaders(token)


                });
        if (!response.ok) {

            throw new Error(
                "Failed to fetch tasks"
            )
        }
        return response.json();
    }

export const updateTask =
    async (updatedTask, token) => {

        const response =
            await fetch(`${BASE_URL}/tasks/${updatedTask._id}`,
                {
                    method: "PUT",

                    headers: getAuthHeaders(token),

                    body: JSON.stringify(updatedTask),


                });
        if (!response.ok) {

            throw new Error(
                "Failed to fetch tasks"
            )
        }
        return response.json();
    }


export default {
    getTasks,
    createTask,
    deleteTask,
    updateTask,
    logIn,
    signUp
}