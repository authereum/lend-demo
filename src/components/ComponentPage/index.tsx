import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import GradientButton from '../GradientButton'

const ComponentPage: FunctionComponent<{}> = () => {
  return (
    <div className="ComponentPage">
      <Typography variant="h1" color="primary" gutterBottom>
        h1. Label
      </Typography>
      <Typography variant="h2" color="primary" gutterBottom>
        h2. Label
      </Typography>
      <Typography variant="h3" color="primary" gutterBottom>
        h3. Label
      </Typography>
      <Typography variant="subtitle1" color="primary" gutterBottom>
        <Box color="primary.light">
          subtitle1. Label
        </Box>
      </Typography>
      <Typography variant="subtitle2" color="primary" gutterBottom>
        subtitle2. Label
      </Typography>
      <Typography variant="body1" color="primary" gutterBottom>
        body1
      </Typography>
      <Card>
        <Box padding="3.5rem">
        <Typography variant="h3" color="primary" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body1" color="primary" gutterBottom>
          Card contents
        </Typography>
        </Box>
      </Card>
      <GradientButton label="Lend"/>
    </div>
  )
}

export default ComponentPage