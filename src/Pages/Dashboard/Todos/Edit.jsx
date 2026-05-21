import { Button, DatePicker, Form, Input, Select, Typography } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import axios from "axios"

const { Title, } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", dueDate: "", description: "", priority: "" }

const Edit = () => {



    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    useEffect(() => {
        const { id } = params

        const token = localStorage.getItem("jwt")
        axios.get(`http://localhost:8000/todos/single/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const { todo } = data
                    console.log("todo", todo)
                    setState(todo)
                }
            })
            .catch((error) => {
                console.error(error)
                window.toastify("Something went wrong while getting todo", "error")
            })

    }, [params])

    const handleSubmit = () => {


        let { id, title, dueDate, description, priority, status, isCompleted } = state

        title = title.trim()

        if (title.length < 3) { return window.toastify("Please enter valid title", "error") }

        const todo = { id, title, dueDate, description, priority, status, isCompleted }

        setIsProcessing(true)

        const token = localStorage.getItem("jwt")
        axios.patch("http://localhost:8000/todos/update", todo, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const { todo } = data
                    console.log("todo", todo)
                    window.toastify("A new todo has been successful updated", "success")
                    navigate("/dashboard/todos")
                }
            })
            .catch((error) => {
                console.error(error)
                window.toastify("Something went wrong while creating a new todo", "error")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }

    return (

        <main className="auth flex-center">
            <div className="container">
                {/* Row aur Col add kiya gaya hai size control karne ke liye */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card p-3 p-4 mx-auto w-100">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <Title level={2} className="mb-0">Update Todo</Title>
                                <Button type="primary" onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
                            </div>
                            <Form layout="vertical">
                                <Item label="Title" required>
                                    <Input type="text" size="large" placeholder="Enter title" value={state.title} name="title" onChange={handleChange} />
                                </Item>
                                <Item label={`Due Date: ${state.dueDate || ""}`}>
                                    <DatePicker size="large" placeholder="Enter due date " className="w-100" onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
                                </Item>
                                <Item label="Description">
                                    <Input.TextArea placeholder="Enter description" value={state.description} name="description" onChange={handleChange} style={{ height: 100, resize: "none" }} />
                                </Item>
                                <Item label="Priority">
                                    <Select size="large" placeholder="Please select priority" value={state.priority} onChange={priority => { setState(s => ({ ...s, priority })) }}>
                                        <Option value="low">Low</Option>
                                        <Option value="medium">Medium</Option>
                                        <Option value="high">High</Option>
                                    </Select>
                                </Item>
                                <Button type="primary" size="large" block htmlType="submit" loading={isProcessing} onClick={handleSubmit}>Update Todo</Button>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Edit