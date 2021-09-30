import React, { useReducer, useEffect, useState } from 'react';
import '../homestyle.scss';
import { Button } from 'react-bootstrap';

function Addeditems({ id, name, deleteurl }) {
  return (
    <div className="urllist">
      <table>
        <tr>
          <td>-- {name}</td>
          <td>
            <Button variant="warning" onClick={() => deleteurl(id)}>
              Delete
            </Button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Addeditems;
