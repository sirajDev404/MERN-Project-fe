import { Button, Space } from "antd"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/Auth"

const Navbar = () => {

    const { isAuth, handleLogout } = useAuth()

    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">Todos</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li>

                    </ul>
                    <div className="d-flex">
                        <Space>
                            {isAuth
                                ? <>
                                    <Button type="primary" size="large" className="bg-success" onClick={() => { navigate("/dashboard") }}>Dashboard</Button>
                                    <Button type="primary" size="large" danger onClick={handleLogout}>Logout</Button>
                                </>

                                : <>
                                    <Button type="primary" size="large" className="bg-success" onClick={() => { navigate("/auth/login") }}>Login</Button>
                                    <Button type="primary" size="large" className="bg-info" onClick={() => { navigate("/auth/register") }}>Register</Button>
                                </>
                            }


                        </Space>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar