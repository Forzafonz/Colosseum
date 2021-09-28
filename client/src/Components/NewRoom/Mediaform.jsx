import React, { useReducer, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Mediaform() {
  const params = useParams();
  return (<div>{params.id}</div>);
}

export default Mediaform;
