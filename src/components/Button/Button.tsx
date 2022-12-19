import { Button as MuiButton } from '@mui/material';

function Button(props: any) {

  return (
    <MuiButton variant={props.variant || 'contained'} {...props}>
      {props.children}
    </MuiButton>
  )
}

export default Button
