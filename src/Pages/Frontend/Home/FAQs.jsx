import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const FAQs = () => {
    return (
        <div className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title className='text-center'>FAQs</Title>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default FAQs