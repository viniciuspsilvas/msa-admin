import MobileUser from './MobileUser';
import React from 'react';
import { Table } from 'reactstrap';

const MobileUserList = ({ mobileUserList = [] }) => {

  return (

    <Table>
      <thead>
        <tr>
          <th scope="col">User</th>
          <th scope="col">Token</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tbody>

        {mobileUserList.map((mobileUser, i) =>
          <MobileUser key={i} username={mobileUser.username}
            id={mobileUser.id}
            token={mobileUser.token} dateCreated={mobileUser.dateCreated} />
        )
        }

      </tbody>
    </Table>
  );
}

export default MobileUserList;