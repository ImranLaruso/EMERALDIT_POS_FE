import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  cardOuterDiv: {
    width: 'unset',
    margin: '0 -15px !important',
    color: 'black',
  },
  card: {
    padding: '0 15px !important',
    cursor: 'pointer',
  },
  cardInnerDiv: {
    border: '0',
    marginBottom: '30px',
    marginTop: '30px',
    borderRadius: '6px',
    color: 'black',
    background: '#ffffff',
    width: '100%',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
  countInnerDiv: {
    border: '0',
    marginBottom: '30px',
    marginTop: '30px',
    borderRadius: '6px',
    color: 'black',
    background: '#ffffff',
    width: '80%',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
  cardShading: {
    color: '#FFF',
    margin: '0 15px',
    padding: 0,
    position: 'relative',
  },
  cardInnerDiv2: {
    borderRadius: '3px',
    marginTop: '-20px',
    padding: '15px',
    ...successCardHeader,
  },
  cardBody: {
    padding: '0.9375rem 20px',
    flex: '1 1 auto',
    WebkitBoxFlex: '1',
    position: 'relative',
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: grayColor[1],
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  cardDescription: {
    color: '#999',
    margin: 0,
    fontSize: '14px',
    paddingTop: '10px',
    marginBottom: 0,
  },
}));

const grayColor = [
  '#999',
  '#777',
  '#3C4858',
  '#AAAAAA',
  '#D2D2D2',
  '#DDD',
  '#b4b4b4',
  '#555555',
  '#333',
  '#a9afbb',
  '#eee',
  '#e7e7e7',
];

const successBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(76, 175, 80,.4)',
};

// eslint-disable-next-line no-unused-vars
const successColor = ['#4caf50', '#66bb6a', '#43a047', '#5cb860'];

const successCardHeader = {
  background: 'lightBlue',
  // 'linear-gradient(60deg, ' + successColor[1] + ', ' + successColor[2] + ')',
  ...successBoxShadow,
};

// eslint-disable-next-line no-unused-vars
const hexToRgb = input => {
  input = input + '';
  input = input.replace('#', '');
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ', ' +
    parseInt(second, 16) +
    ', ' +
    parseInt(last, 16)
  );
};
