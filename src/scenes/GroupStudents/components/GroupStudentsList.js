import React from 'react';
import { Table } from 'reactstrap';

const groupstudentList = ({ groupstudentList = [] }) => {

  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {
          groupstudentList.map((groupStudents, i) =>
            <tr key={i}>
              <th scope="row">{groupStudents._id}</th>
              <th >{groupStudents.name}</th>
              <th >{groupStudents.description}</th>
            </tr>
          )
        }
      </tbody>
    </Table>
  );
}

export default groupstudentList;