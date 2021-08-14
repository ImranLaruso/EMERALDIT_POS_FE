import React, { useState } from 'react';
import { Avatar, Grid, Button } from '@material-ui/core';
import useStyles from '../../../styles/useStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const CustomAvatar = ({ entry, getValue }) => {
  console.log(entry);
  const { alt, value } = entry;
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState(value);

  const fileSelectedHandler = event => {
    console.log(event.target.name);
    console.log(event);
    getValue('logo', URL.createObjectURL(event.target.files[0]));
    setImageSrc(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Grid xs={12}>
      <div className={classes.customAvatarRoot}>
        <Avatar
          alt={alt}
          src={imageSrc}
          className={classes.customAvatarStyles}
        />
        <input
          accept='image/*'
          className={classes.customAvatarInput}
          id='contained-button-file'
          multiple
          type='file'
          onChange={fileSelectedHandler}
        />
        <label
          className={classes.customAvatarButton}
          htmlFor='contained-button-file'
        >
          <Button
            variant='contained'
            color='primary'
            size='small'
            component='span'
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
      </div>
    </Grid>
  );
};

export default CustomAvatar;
