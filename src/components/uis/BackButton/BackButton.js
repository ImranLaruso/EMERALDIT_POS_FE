import React from 'react';
import { useHistory } from 'react-router-dom';
import { BackButtonContainer, StyledBackArrow } from './BackButton.styles';
import { Button } from '@material-ui/core';

const BackButton = () => {
  const { goBack } = useHistory();

  return (
    <BackButtonContainer>
      <Button variant="contained" color="default" onClick={goBack}>
        <StyledBackArrow /> Go Back
      </Button>
    </BackButtonContainer>
  );
};

export default BackButton;
