import { useEffect, useState } from 'react'
import { Button, Dropdown, Image, Table, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text } = Typography

const All = () => {

    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        const token = localStorage.getItem("jwt")
        axios.get("http://localhost:8000/todos/all", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const { todos } = data
                    console.log("todos", todos)
                    setTodos(todos.map(todo => ({ ...todo, key: todo.id })))
                }
            })
            .catch((error) => {
                console.error(error)
                window.toastify("Something went wrong while getting todos", "error")
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [])

    const handleDelete = todo => {

        const token = localStorage.getItem("jwt")
        axios.delete(`http://localhost:8000/todos/single/${todo.id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status } = res
                if (status === 200) {
                    const filteredTodos = todos.filter(item => item.id !== todo.id)

                    setTodos(filteredTodos)

                    window.toastify("Todo Delete Successful", "success")
                }
            })
            .catch((error) => {
                console.error(error)
                window.toastify("Something went wrong while getting todo", "error")
            })

    }

    const columns = [
        { title: 'image', dataIndex: "imageURL", render: imageURL => imageURL ? <Image src={imageURL} className='rounded-circle' width={64} height={64} /> : <></> },
        { title: 'Title', dataIndex: 'title' },
        { title: 'Due Date', dataIndex: 'dueDate' },
        { title: 'Description', dataIndex: 'description' },
        { title: 'Priority', dataIndex: 'priority', render: text => <Text className='text-capitalize'>{text}</Text> },
        { title: 'Date Created', dataIndex: 'createdAt', render: text => <Text className='text-capitalize'>{dayjs(text).format("dddd-D-MMM-YY ,hh:mm:ss A")}</Text> },
        {
            title: 'Action',
            render: (_, record) => (
                <Dropdown menu={{
                    items: [
                        { label: "Edit", key: "edit ", icon: <EditOutlined />, onClick: () => { navigate("/dashboard/todos/edit/" + record.id) } },
                        { label: "Delete", key: "delete", icon: <DeleteOutlined />, onClick: () => { handleDelete(record) } }
                    ]
                }} trigger={["click"]}>
                    <Button className='border-0' icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];
    return (
        <main className='py-5'>
            <div className="container">
                {/* Fixed layout: flex-row ensures Title is left and Button is right even on smallest screens */}
                <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                    <Title level={2} className="mb-0" style={{ fontSize: 'calc(1.3rem + 0.6vw)' }}>Todos</Title>
                    <Button type="primary" onClick={() => { navigate("/dashboard/todos/add") }}> Add Todos</Button>
                </div>

                {/* Table Layout: Injected global style to keep all headings in one single row line and forced internal x-axis scroll */}
                <div className="table-responsive-premium">
                    <style>{`
                        .table-responsive-premium .ant-table-cell {
                            white-space: nowrap !important;
                        }
                    `}</style>
                    <Table
                        columns={columns}
                        dataSource={todos}
                        loading={isLoading}
                        scroll={{ x: 'max-content' }}
                        pagination={{ placement: ['bottomRight'] }}
                    />
                </div>
            </div>
        </main>
    )
}

export default All