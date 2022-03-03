import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'
import styled, { keyframes } from 'styled-components';
import { Button } from 'reactstrap';

const kf = keyframes`
  100% {
    opacity: 1;
    transform: scale(1) rotateZ(0);
  }
`

const StyledDetails = styled.div`
  opacity: 0;
  transform: scale(2) rotateZ(180deg);
  animation: ${kf} 0.5s ease-in-out forwards;

  background-color: ${props => props.color ? props.color : 'lemonchiffon'};
  p {
    color: ${props => props.theme.tertiaryColor};
  }
  h2 {
    color: ${props => props.theme.primaryColor};
  }
`

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  useEffect(() => {
    axios.get(`${BASE_URL}/friends/${friendId}?api_key=${API_KEY}`)
      .then(res => { setDetails(res.data) })
      .catch(err => { debugger }) // eslint-disable-line
  }, [friendId])

  return (
    <StyledDetails className='container' color='red'>
      <h2>Details:</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {
              details.hobbies.map((like, idx) => <li key={idx}>{like}</li>)
            }
          </ul>
        </>
      }
      <Button color="success" onClick={close}>Close</Button>
    </StyledDetails>
  )
}
