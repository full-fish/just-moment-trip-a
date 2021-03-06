import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import catzzal5 from '../../Assets/catzzal5.gif';

function LoginMessage() {
  const navigate = useNavigate();
  const goHome = () => {
    Swal.fire({
      icon: 'warning',
      title: 'π€·ββοΈ λ‘κ·ΈμΈμ΄ νμν©λλ€',
      allowOutsideClick: false,
      backdrop: `
      rgba(0,0,110,0.5)
      url(${catzzal5})
      bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  useEffect(() => {
    goHome();
  }, []);

  return <></>;
}

export default LoginMessage;
