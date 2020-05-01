import React, { FunctionComponent } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(20deg, #FF4E00 30%, #EC9F05 90%)',
    borderRadius: '4.0rem',
    border: 0,
    color: 'white',
    height: '8.0rem',
    width: '25.0rem',
    padding: '0 30px',
    boxShadow: 'none',
    maring: '2.0rem',
  },
  label: {
    textTransform: 'capitalize',
  }
}))

type GradientButtonProps = {
  label: string
  onClick?: () => void
}

const GradientButton: FunctionComponent<GradientButtonProps> = ({ label, onClick, children }) => {
  const styles = useStyles()
  return (
    <Button 
      variant="contained"
      classes={{
        root: styles.root,
        label:styles.label
      }}
      onClick={onClick}
    >
      <Typography variant="h3">
        {label}
      </Typography>
    </Button>
  )
}
  
  export default GradientButton


