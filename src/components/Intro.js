import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Me from '../assets/Images/profile_image1.png';

const Box = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 65vw;
  height: 55vh;
  display: flex;
  background: linear-gradient(
      to right,
      ${props => props.theme.body} 50%,
      ${props => props.theme.text} 50%
    ) bottom,
    linear-gradient(
      to right,
      ${props => props.theme.body} 50%,
      ${props => props.theme.text} 50%
    ) top;
  background-repeat: no-repeat;
  background-size: 100% 2px;
  border-left: 2px solid ${props => props.theme.body};
  border-right: 2px solid ${props => props.theme.text};
  z-index: 1;
`;

const SubBox = styled.div`
  width: 50%;
  position: relative;
  display: flex;

  .pic {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 30vw;
    height: 120%;
    object-fit: contain;
  }
`;

const Text = styled.div`
  font-size: calc(1em + 1.5vw);
  color: ${props => props.theme.body};
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  h3 {
    color: ${props => (props.mustard ? '#e6a059' : props.theme.body)};
    font-weight: bold;
    transition: color 0.3s ease; /* Smooth transition */
  }

  & > *:last-child {
    color: ${props => `rgba(${props.theme.bodyRgba},0.6)`};
    font-size: calc(0.5rem + 1.5vw);
    font-weight: 300;
  }
`;

const Intro = () => {
  const [mustard, setMustard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMustard(true), 2500); // Set mustard color after 3 seconds
    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  return (
    <Box
      initial={{ height: 0 }}
      animate={{ height: '55vh' }}
      transition={{ type: 'spring', duration: 2, delay: 1 }}
    >
      <SubBox>
        <Text mustard={mustard}>
          <h1>Hi,</h1>
          <h3>I'm <span style={{ whiteSpace: 'nowrap' }}>Naveen Kumar S.</span></h3>
          <h6>I build apps that make life easier.</h6>
        </Text>
      </SubBox>
      <SubBox>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <img className="pic" src={Me} alt="Profile Pic" />
        </motion.div>
      </SubBox>
    </Box>
  );
};

export default Intro;
