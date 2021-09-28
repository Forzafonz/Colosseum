import React, { useReducer, useEffect, useState } from 'react';
import '../homestyle.scss';

function Addeditems({ id, name, deleteurl }) {
  return (
    <div className = "urllist">
      <table >
        <tr>
          <td>{name}</td>
          <td>
            <button onClick={() => deleteurl(id)}>Delete</button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Addeditems;
