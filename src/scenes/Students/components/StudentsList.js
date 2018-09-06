import Student from './Student';
import React from 'react';
import { Table } from 'reactstrap';

const studentList = ({ studentList = [] }) => {

  return (

    <Table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">name</th>
          <th scope="col">email</th>
          <th scope="col">phone</th>
          <th scope="col">token</th>
          <th scope="col">isAppActive</th>
        </tr>
      </thead>
      <tbody>

        {
          studentList.map((students, i) =>
          
          <Student key={i}
            id={students._id}
            name={students.name}
            email={students.email}
            phone={students.phone}
            token={students.token}
            isAppActive={students.isAppActive}

          />
        )
        }

      </tbody>
    </Table>
  );
}

export default studentList;