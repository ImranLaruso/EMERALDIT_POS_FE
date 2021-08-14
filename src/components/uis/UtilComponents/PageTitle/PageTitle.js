import React from 'react';
import { StyledPageTitle, TitleContainer } from './PageTitle.styles';
import CreateNew from '../../CreateNew';
import BackButton from '../../BackButton/BackButton';

const PageTitle = ({ title, createNewPath, backButton }) => {
  return (
    <TitleContainer>
      <StyledPageTitle>{title}</StyledPageTitle>
      {createNewPath ? <CreateNew type={createNewPath} /> : null}
      {backButton ? <BackButton /> : null}
    </TitleContainer>
  );
};

export default PageTitle;
