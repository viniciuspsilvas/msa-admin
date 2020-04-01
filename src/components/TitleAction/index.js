import React from 'react';

import './style.css';
import { Col, Row } from 'reactstrap';

export default function TitleAction({ title, children }) {

    return (
        <Row class="row" style={{marginBottom: "30px"}}>
            <Col xs="2"  >
                <h2>{title} </h2>
            </Col>

            <Col class="col-md-4">
                <div style={{ textAlign: 'right' }} >
                    {children}
                </div>
            </Col>
        </Row>
    );
}
