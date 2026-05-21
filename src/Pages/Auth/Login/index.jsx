import { Button, Form, Input, Typography } from "antd"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../../context/Auth"
import axios from "axios"


const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = { email: "", Password: "" }

const Login = () => {

    const { readProfile } = useAuth()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleLogin = () => {

        let { email, password } = state

        const userData = { email, password }

        setIsProcessing(true)

        axios.post("http://localhost:8000/auth/login", userData)
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    console.log("data", data)
                    localStorage.setItem("jwt", data.token)
                    readProfile(data.token)
                    window.toastify("Login successful", "success")
                } else {
                    window.toastify(data.message, "error")
                }
            })
            .catch(error => {
                console.error(error)
                window.toastify(error?.response?.data?.message || "something went wrong, Internal server error", "error")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }

    return (
        <main className="auth flex-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                        <div className="card p-3 p-md-4">
                            <Title level={1} className="text-center">Login</Title>
                            <Paragraph className="text-center">Don't have an account? <Link to="/auth/register">Create Account</Link></Paragraph>
                            <Paragraph className="text-center mb-4">Forgot Password? <Link to="/auth/forgot-password">Reset Password</Link></Paragraph>

                            <Form layout="vertical">
                                <Item label="Email" required>
                                    <Input type="email" size="large" placeholder="Enter your email" name="email" onChange={handleChange} />
                                </Item>
                                <Item label="Password" required>
                                    <Input.Password type="password" size="large" placeholder="Enter your Password" name="password" onChange={handleChange} />
                                </Item>
                                <Button type="primary" size="large" block htmlType="submit" loading={isProcessing} onClick={handleLogin}>Login</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login