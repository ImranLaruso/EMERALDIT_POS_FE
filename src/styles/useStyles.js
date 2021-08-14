import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  salesItemTable: {
    margin: '75px 0 0 0',
    width: '65%',
  },
  cardSales: {
    margin: '20px',
    padding: '20px',
  },
  salesCustomerInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  materialIcon: {
    cursor: 'pointer',
  },
  displaySalesCustomerInfo: {
    width: '90%',
  },
  removeCustomerIcon: {
    margin: 'auto',
    width: '10%',
  },
  removePaymentTypeIcon: {
    width: '10%',
  },
  salesContainer: {
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'space-around',
  },
  totalDueAmountContainer: {
    columnCount: 2,
    display: 'flex',
    justifyContent: 'space-around',
  },
  salesDisplayAmountBox: {
    textAlign: 'center',
    padding: 10,
    minWidth: '50px',
    fontSize: '1.5rem',
  },
  paymentMethodButtons: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
  },
  addSubmitPayment: {
    width: '100%',
  },
  salesAddAmount: {
    width: '100%',
    margin: '20px 0',
    fontSize: '1.5rem',
  },
  salesAddPayAmountButton: {
    width: '100%',
    margin: '20px 0',
    fontSize: '1.5rem',
  },
  salesTotalAmountDisplay: {
    color: theme.palette.success.main,
    fontSize: '3rem',
  },
  salesDueAmountDisplay: {
    color: theme.palette.secondary.main,
    fontSize: '3rem',
  },
  salesPaymentTypeContainer: {
    display: 'flex',
    width: '100%',
  },
  salesPayContainerRow: {
    width: '90%',
    marginTop: 0,
    fontSize: '1.2rem',
  },
  salesPayContainerRowAmount: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  paymentMethodSelection: {
    textAlign: 'center',
  },
  salesDueDateCalendarExpand: {
    width: '75%',
  },
  salesDueDateCalendarShrink: {
    width: 'min-content',
  },
  paymentMethodDueView: {
    width: '50%',
    margin: 'auto',
  },
  mainContianer: {
    display: 'flex',
  },
  topMenu: {
    position: 'fixed',
    height: '100vh',
    top: 65,
    left: 0,
    flexGrow: 1,
    backgroundColor: theme.palette.grey[900],
    display: 'flex',
    color: 'white',
    paddingBottom: theme.spacing(3),
  },
  pageContainer: {
    width: '100%',
  },
  logoutButton: {
    color: 'white',
  },
  companyHeader: {
    display: 'flex',
    marginLeft: theme.spacing(6),
  },
  companyLogoContainer: {
    display: 'contents',
    cursor: 'pointer',
  },
  progressIndicator: {
    width: '100%',
  },
  companyAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  companyName: {
    margin: 'auto',
    fontSize: '22px',
    paddingLeft: theme.spacing(2),
  },
  customAvatarStyles: {
    margin: theme.spacing(1),
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  customAvatarRoot: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  customAvatarButton: {
    margin: theme.spacing(2),
    paddingTop: theme.spacing(6),
  },
  customAvatarInput: {
    display: 'none',
  },
  inputsTop: {
    position: 'relative',
    textAlign: 'left',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '10px',
  },
  searchTab: {
    border: 0,
    width: '80%',
    margin: 'auto',
    padding: 0,
    position: 'relative',
    minWidth: 0,
    verticalAlign: 'top',
  },
  searchItemSuggestionBox: {
    width: '120%',
    position: 'absolute',
    top: -140,
    left: -60,
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  toolTipItemDisplay: {
    textAlign: 'center',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-around',
  },
  toolTipValue: {
    fontWeight: 'bold',
  },
  loginHeading: {
    textAlign: 'center',
  },
  loginFormFieldIcon: {
    width: '10%',
  },
  loginFormField: {
    width: '80%',
  },
  loginRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loginPaper: {
    width: theme.spacing(50),
    height: theme.spacing(20),
  },
  loginPaperForConfirmPwd: {
    width: theme.spacing(50),
    height: theme.spacing(30),
  },
  loginSubmit: {
    width: theme.spacing(40),
    display: 'flex',
    marginRight: theme.spacing(9),
    marginTop: theme.spacing(4),
  },
  loginGridField: {
    padding: theme.spacing(2),
  },
  loginputField: {
    width: theme.spacing(36),
  },
  loginForgotPassword: {
    width: theme.spacing(80),
    marginTop: theme.spacing(3),
  },
  '& > *': {
    margin: theme.spacing(10),
    width: theme.spacing(80),
    height: theme.spacing(70),
  },
  loginFormControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  loginProgress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  formbuilderForm: {
    marginTop: theme.spacing(3),
  },
  formbuilderSubmit: {
    margin: theme.spacing(2, 1),
  },
  formbuilderMargin: {
    marginRight: theme.spacing(1),
  },
  cashbookDateAlign: {
    display: 'inline',
    margin: theme.spacing(2),
  },
  cashbookUi: {
    padding: theme.spacing(2),
  },
  paymentdropDown: {
    width: '100%',
    margin: '10px 0',
  },
  paymentTypeTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  dropdownControl: {
    width: '100%',
  },
  dropdownChips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  mainPageView: {
    width: '100%',
    marginTop: 75,
    marginLeft: '175px',
  },
  header: {
    height: 50,
    backgroundColor: theme.palette.grey[900],
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    color: 'white',
    display: 'inline-flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    zIndex: 2,
  },
  createNewButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2),
  },
  itemTypeLabel: {
    marginTop: theme.spacing(2),
    color: '#000',
  },
  miniTableViewContainer: {
    minHeight: '140px',
  },
  miniTableViewTable: {
    width: '100%',
    textAlign: 'center',
    color: 'black',
  },
  backButton: {
    marginBottom: theme.spacing(4),
  },
}));
