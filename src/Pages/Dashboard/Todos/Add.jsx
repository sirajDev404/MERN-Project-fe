import { Button, DatePicker, Form, Input, Select, Typography } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/Auth"
import axios from "axios"

const { Title, } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", dueDate: "", description: "", priority: "" }

const Add = () => {

    const { user } = useAuth()

    const [state, setState] = useState(initialState)
    const [image, setImage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {


        let { title, dueDate, description, priority } = state

        title = title.trim()

        if (title.length < 3) { return window.toastify("Please enter valid title", "error") }

        const todo = { title, dueDate, description, priority }

        const formData = new FormData()
        for (const key in todo) { formData.append(key, todo[key]) }
        if (image) { formData.append("image", image) }

        console.log("formData : ", formData)

        setIsProcessing(true)

        const token = localStorage.getItem("jwt")
        axios.post("http://localhost:8000/todos/create", formData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    console.log("todo", data.todo)
                    window.toastify("A new todo has been successful created", "success")
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
                {/* Yahan row aur col ka use kiya gaya hai taake size control ho */}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card p-3 p-4 mx-auto w-100">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <Title level={2} className="mb-0">Add Todo</Title>
                                <Button type="primary" onClick={() => { navigate("/dashboard/todos") }}>Todos</Button>
                            </div>
                            <Form layout="vertical">
                                <Item label="Title" required>
                                    <Input type="text" size="large" placeholder="Enter title" name="title" onChange={handleChange} />
                                </Item>
                                <Item label="Due Date">
                                    <DatePicker size="large" placeholder="Enter due date " className="w-100" onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
                                </Item>
                                <Item label="Description">
                                    <Input.TextArea placeholder="Enter description" name="description" onChange={handleChange} style={{ height: 100, resize: "none" }} />
                                </Item>
                                <Item label="Priority">
                                    <Select size="large" placeholder="Please select priority" onChange={priority => { setState(s => ({ ...s, priority })) }}>
                                        <Option value="low">Low</Option>
                                        <Option value="medium">Medium</Option>
                                        <Option value="high">High</Option>
                                    </Select>
                                </Item>
                                <Item label="image">
                                    <input type="file" accept="image/*" className="form-control" onChange={e => setImage(e.target.files[0])} />
                                </Item>
                                <Button type="primary" size="large" block htmlType="submit" loading={isProcessing} onClick={handleSubmit}>Add Todo</Button>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Add