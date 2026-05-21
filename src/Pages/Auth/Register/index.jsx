import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const { Title, Paragraph } = Typography;
const { Item } = Form;

const initialState = { name: "", email: "", Password: "", confirmPassword: "" };

const Register = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleRegister = () => {
        let { name, email, password, confirmPassword } = state

        const fullName = name.trim()
        if (name.length < 3) { return window.toastify("Please enter your full name", "error") }
        if (!window.isValidEmail(email)) { return window.toastify("Please enter your valid email", "error") }
        if (password.length < 6) { return window.toastify("password must be atleast 6 chars", "error") }
        if (confirmPassword !== password) { return window.toastify("password not match", "error") }

        const user = { fullName, email, password }

        setIsProcessing(true)

        axios.post("http://localhost:8000/auth/register", user)
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    return window.toastify(data.message, "success")
                }
            })
            .catch(error => {
                console.error(error)
                return window.toastify("Something went wrong", "error")
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
                            <Title level={1} className="text-center">Register</Title>
                            <Paragraph className="text-center mb-4">Already have an account? <Link to="/auth/login">Login</Link></Paragraph>

                            <Form layout="vertical">
                                <Item label="Full Name" required>
                                    <Input type="text" size="large" placeholder="Enter your full name " name="name" onChange={handleChange} />
                                </Item>
                                <Item label="Email" required>
                                    <Input type="email" size="large" placeholder="Enter your email" name="email" onChange={handleChange} />
                                </Item>
                                <Item label="Password" required>
                                    <Input.Password type="password" size="large" placeholder="Enter your Password" name="password" onChange={handleChange} />
                                </Item>
                                <Item label="ConfirmPassword" required>
                                    <Input.Password type="confirmPassword" size="large" placeholder="Enter your ConfirmPassword " name="confirmPassword" onChange={handleChange} />
                                </Item>
                                <Button type="primary" size="large" block htmlType="submit" loading={isProcessing} onClick={handleRegister}>Create Account</Button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register