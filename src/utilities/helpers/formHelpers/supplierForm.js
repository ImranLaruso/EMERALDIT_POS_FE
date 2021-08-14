import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

export const getSupplierFormData = [
  {
    id: 'firstName',
    type: 'text',
    label: 'Name',
    name: 'firstName',
    required: true,
    autoFocus: true,
    icon: <PersonIcon />,
  },
  {
    id: 'companyName',
    type: 'text',
    label: 'Company Name',
    name: 'companyName',
    required: true,
    icon: <PersonIcon />,
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email',
    name: 'email',
    required: false,
    icon: <EmailIcon />,
  },
  {
    id: 'phoneNo',
    name: 'phoneNo',
    type: 'number',
    label: 'Mobile Number',
    required: false,
    icon: <PhoneIphoneIcon />,
  },
  {
    id: 'gender',
    name: 'gender',
    type: 'radio',
    label: 'Gender',
    values: ['Male', 'Female'],
  },
  {
    id: 'address',
    type: 'text',
    label: 'Address',
    name: 'address',
    required: false,
    icon: <HomeIcon />,
  },
  {
    id: 'defaultDiscount',
    type: 'text',
    label: 'Default Discount',
    name: 'defaultDiscount',
    required: false,
    icon: <LocalOfferIcon />,
  },
  {
    id: 'bankAccount',
    type: 'text',
    label: 'Bank Account',
    name: 'bankAccount',
    required: false,
    icon: <MonetizationOnIcon />,
  },
  {
    id: 'recruiter',
    type: 'text',
    label: 'Recruiter',
    name: 'recruiter',
    required: false,
    icon: <RecentActorsIcon />,
  },
  {
    id: 'description',
    type: 'text',
    label: 'Description',
    name: 'description',
    multiline: true,
    rows: 4,
    required: false,
  },
];
