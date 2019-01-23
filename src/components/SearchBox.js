import React from 'react';
import { Row, Col } from 'reactstrap';

// Search field localized on top
const SearchBox = (props) => {
  let input;
  const handleClick = () => {
    props.onSearch(input.value);
  };
  return (
    <Row>
      <Col >
        <input
          className="form-control"
          ref={n => input = n}
          type="text"
        />
      </Col>
      <Col sm="2">
        <button className="btn btn-info" onClick={handleClick}>Search</button>
      </Col>
    </Row>
  );
};
export default SearchBox;