import React from 'react';
import styled from 'styled-components';

const ShowDetails = ({text,onClick}) => {
    return (
        <StyledWrapper>
            <button onClick={onClick}> {text}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
   border: none;
   color: black;
background-image: linear-gradient(30deg, #e6d9c7, #e7d4b5);
   border-radius: 20px;
   background-size: 100% auto;
   font-family: inherit;
   font-size: 17px;
   padding: 0.6em 1.5em;
  }

  button:hover {
   background-position: right center;
   background-size: 200% auto;
   -webkit-animation: pulse 2s infinite;
   animation: pulse512 1.5s infinite;
  }

  @keyframes pulse512 {
   0% {
    box-shadow: 0 0 0 0 #8a6f4d;
   }

   70% {
    box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
   }

   100% {
    box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
   }
  }`;

export default ShowDetails;
