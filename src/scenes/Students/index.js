import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Container, Row, Col } from 'reactstrap';
import { Email, Edit } from '@material-ui/icons';
import ModalMessage from '../../container/modalMessage'
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import './style.css';

const config = require('../../config/config');

class Students extends Component {

    columns = [{
        dataField: 'id',
        text: 'ID',
        sort: true
    }, {
        dataField: 'fullname',
        text: 'Name',
        sort: true,
        align: 'left',
    }, {
        dataField: 'email',
        text: 'Email',
        sort: true,
        align: 'left',
    }, {
        dataField: 'phone',
        text: 'Phone',
        sort: true
    }, {

        // Column 'Actions' - where the buttons are located.
        text: '',
        align: 'center',

        // Apply event to the column
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                this.openModalMessage(row);
            },
        },

        // Column 'Actions'
        formatter: (cellContent, row) => {
            return (
                <div>
                    <Tooltip title="Edit">
                        <Edit style={{ cursor: 'pointer' }} />
                    </Tooltip>
                    &emsp;
                    <Tooltip title="Send notification">
                        <Email style={{ cursor: 'pointer' }} />
                    </Tooltip>
                </div>
            );
        }

    },

    ];

    /*
     Constructor 
    */
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            studentList: [],
            studentSelected: ''
        };


        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // List students
        axios.get(config.backend.students)
            .then(result => this.setState({
                studentList: result.data
            }))
            .catch(error => this.setState({
                error,
            }));
    }

    // Open Modal Message
    openModalMessage = (studentSelected) => {
        this.setState({
            studentSelected: studentSelected,
            modalOpen: true
        });
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        const studentList = this.state.studentList;
        const defaultSorted = [{
            dataField: 'name',
            order: 'desc'
        }];


        const MySearch = (props) => {
            let input;
            const handleClick = () => {
                props.onSearch(input.value);
            };
            return (
                <Row>
                    <Col>
                        <input
                            className="form-control"
                            ref={n => input = n}
                            type="text"
                        />
                    </Col>
                    <Col>
                        <button className="btn btn-info" onClick={handleClick}>Search</button>
                    </Col>
                </Row>
            );
        };

        return (

            <Container>

                <ModalMessage isOpen={this.state.modalOpen} to={this.state.studentSelected} />
                <Row>
                    <Col><h1>Students</h1></Col>
                </Row>

                <ToolkitProvider
                    keyField="id"
                    data={studentList}
                    columns={this.columns}
                    search>
                    {
                        props => (
                            <div>
                                <MySearch {...props.searchProps} placeholder="Search students" />
                                <Row style={{ marginTop: 1 + 'em' }} >
                                    <Col>
                                        <BootstrapTable
                                            {...props.baseProps}
                                            striped
                                            hover
                                            condensed
                                            bootstrap4
                                            noDataIndication="Table is Empty"
                                            defaultSorted={defaultSorted}
                                           
                                        />
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                </ToolkitProvider>
            </Container>
        );
    }
}

export default Students;