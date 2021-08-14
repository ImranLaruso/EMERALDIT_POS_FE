import styled from 'styled-components';
import { Button, FormControl, Grid, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const SubmitButton = styled(Button)`
  margin: 20px 0;
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export const StyledFieldContainer = styled(Grid)`
  margin: 20px 0;
`;

export const StyledCreateIcon = styled(CreateIcon)`
  margin-right: 10px;
  margin-left: 20px;
`;

export const StyledBackArrow = styled(ArrowBackIcon)`
  margin-right: 10px;
`;

export const BackButtonContainer = styled.div`
  text-align: right;
`;

export const Title = styled(Typography)`
  text-align: center;
`;
