import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const Map = () => {
    return (
        <div className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title className='text-center'>Map</Title>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Map