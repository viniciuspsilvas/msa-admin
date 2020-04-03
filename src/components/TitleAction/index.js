import React from 'react';

import './style.css';
import { Col, Row } from 'reactstrap';

export default function TitleAction({ title, children }) {

    return (
        <Row className="row" style={{marginBottom: "30px"}}>
            <Col md="8"  >
                <h2>{title} </h2>
            </Col>

            <Col md="4">
                <div style={{ textAlign: 'right' }} >
                    {children}
                </div>
            </Col>
        </Row>
    );
}
