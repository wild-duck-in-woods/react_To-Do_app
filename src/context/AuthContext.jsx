import {
    createContext,
    useState,
    useEffect
} from "react"

export const AuthContext =
    createContext()

export const AuthProvider = ({
    children
}) => {

    const [token, setToken] =
        useState(null)

    const [user, setUser] =
        useState(null)

    useEffect(() => {

        const savedToken =
            localStorage.getItem("token")

        const savedUser =
            localStorage.getItem("user")

        if (savedToken && savedUser) {

            setToken(savedToken)

            setUser(JSON.parse(savedUser))
        }

    }, [])

    const login = (token, user) => {

        localStorage.setItem(
            "token",
            token
        )

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        )
        console.log("token: ", token)
        console.log("user", user)
        setToken(token)

        setUser(user)
    }

    const logout = () => {

        localStorage.removeItem("token")

        localStorage.removeItem("user")

        setToken(null)

        setUser(null)
        
        window.location.reload();

    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}