import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'


const Auth = createContext()

const initialState = { isAuth: false, user: {} }

const AuthContext = ({ children }) => {

    const [state, setState] = useState(initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = (token) => {

        const jwt = token || localStorage.getItem("jwt")

        // if (!jwt) {
        //     setIsAppLoading(false)
        //     return
        // }

        axios.get("http://localhost:8000/auth/user", { headers: { Authorization: `Bearer ${jwt}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    setState({ isAuth: true, user: data.user })
                }
            })
            .catch(error => {
                console.error(error)
                //  if (error.response && error.response.status === 401) {
                //     handleLogout()
                // }
            })
            .finally(() => {
                setIsAppLoading(false)
            })

    }
    useEffect(() => { readProfile() }, [])

    const handleLogout = () => {
        setState(initialState)
        localStorage.removeItem("jwt")

    }

    return (
        <Auth.Provider value={{ ...state, isAppLoading, handleLogout, dispatch: setState, readProfile }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext

export const useAuth = () => useContext(Auth)