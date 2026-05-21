import { Route, Routes } from 'react-router-dom'
import Home from '../Dashboard/Home'
import About from '../Dashboard/About'
import Contact from '../Dashboard/Contact'
import Todos from './Todos'


const Dashboard = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<Contact />} />
                <Route path='todos/*' element={<Todos />} />
            </Routes>

        </>
    )
}

export default Dashboard