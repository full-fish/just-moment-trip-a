import React, { useState } from 'react';
import styled from 'styled-components';

const SlideTrack = styled.div`
  -webkit-animation: scroll 15s linear infinite;
  animation: scroll 15s linear infinite;

  :hover {
    animation-play-state: paused;
  }

  display: flex;
  width: calc(960px * 14);
`;

const CardDiv = styled.div`
  background-color: white;
  text-align: center;
  border-radius: 50px;
  width: 300px;
  margin: 30px;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: 1em;
  font-family: IMHyeminFont;
  font-weight: bold;

  > img {
    width: 100%;
    height: 70%;
    border-radius: inherit;
    margin-bottom: 30px;
  }

  > a {
    text-decoration: none;
  }
`;
function InfoCard({ picture, name, gitId, link, position }) {
  return (
    <SlideTrack>
      <CardDiv>
        <img src={picture} />
        <div>{name}</div>
        <a href={link}>{gitId}</a>
        <div>{position}</div>
      </CardDiv>
    </SlideTrack>
  );
}

export default InfoCard;
