const BASE_URL = "http://localhost:5000"

export const getTasks =
    async (token) => {

        const response =
            await fetch(
                `${BASE_URL}/tasks`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )
        return response.json()
    }


export const createTask =
    async (newTask, token) => {

        const response =
            await fetch(`${BASE_URL}/tasks`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify(newTask),
                });

        return response.json();
    }

       
export const deleteTask =
    async (id, token) => {

        const response =
            await fetch(`${BASE_URL}/tasks/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },

                });

        return response.json();
    }

export const updateTask =
    async (updatedTask, token) => {

        const response =
            await fetch(`${BASE_URL}/tasks/${updatedTask._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify(updatedTask),


                });

        return response.json();
    }


export default {
    getTasks,
    createTask,
    deleteTask,
    updateTask
}