import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import AccountInfo from '../components/Info/AccountInfo';
import DiaryInfo from '../components/Info/DiaryInfo';
import GraphInfo from '../components/Info/GraphInfo';
import TripInfo from '../components/Info/TripInfo';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Conatainer = styled.div`
  overflow: hidden;
`;

const Box = styled.div`
  height: 100vh;
  width: 100vw;
`;

function Info() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Conatainer>
      <Navbar />
      <Box data-aos="fade-up">
        <TripInfo />
      </Box>
      <Box data-aos="slide-right">
        <DiaryInfo />
      </Box>
      <Box data-aos="slide-left">
        <AccountInfo />
      </Box>
      <Box data-aos="fade-up">
        <GraphInfo />
      </Box>
    </Conatainer>
  );
}

export default Info;
