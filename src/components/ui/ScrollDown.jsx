import React from 'react';
import styled from 'styled-components';

const ScrollDown = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} className="btn cursor-pointer">
        <div className="scroll"> </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
    width: 30px;
    height: 50px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    outline: 2px solid rgba(139, 94, 52, 0.8);
    box-shadow: 0px 0px 10px rgba(139, 94, 52, 0.8);
    position: relative;
  }

  .scroll {
    width: 5px;
    height: 10px;
    border-radius: 10px;
    background-color: rgba(139, 94, 52, 0.8);
    box-shadow: 0px 0px 10px rgba(139, 94, 52, 0.8);
    animation: scroll_4013 2s linear infinite;
    transform: translateY(40%);
  }

  .btn:after {
    position: absolute;
    top: 140%;
    color: whitesmoke;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  @keyframes scroll_4013 {
    0% {
      transform: translateY(40%);
    }

    50% {
      transform: translateY(90%);
    }
  };`;

export default ScrollDown;
