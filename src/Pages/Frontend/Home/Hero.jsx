import { Col, Row, Typography } from 'antd'
import { useAuth } from '../../../context/Auth'

const { Title } = Typography

const Hero = () => {
    const { user } = useAuth()
    return (
        <div className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1} className='text-center'>Home-Hero</Title>
                        <Title level={1} className='text-center'>UID.{user.uid}</Title>
                        <Title level={1} className='text-center'>Name.{user.fullName}</Title>
                        <Title level={1} className='text-center'>Email.{user.email}</Title>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero