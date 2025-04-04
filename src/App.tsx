import reactLogo from './assets/react.svg'
import firestoreLogo from './assets/firestore.png';
import muiLogo from './assets/mui.png';
import viteLogo from '/vite.svg'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import './App.css'

function App() {

  return (
    <Box maxWidth={800} margin='0 auto'>
      <Box textAlign='center'>
        <Box>
          <Link href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </Link>
          <Link href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </Link>
          <Link href="https://console.firebase.google.com/" target="_blank">
            <img src={firestoreLogo} className="logo firestore" alt="Firestore logo" />
          </Link>
          <Link href="https://mui.com/material-ui" target="_blank">
            <img src={muiLogo} className="logo mui" alt="Material UI logo" />
          </Link>
        </Box>
        <Typography variant="h3" component="h1">Vite + React + Firestore + MUI</Typography>
        <Box mt={2} mb={3} textAlign='center' width='100%'>
          <Stack direction='row' spacing={2} justifyContent='center'>
            <Box>
              <Typography fontWeight='bold'>
                Because...Interwebs!
              </Typography>
            </Box>
            <Box>
              <Link href="https://github.com/becauseinterwebs">GitHub</Link>
            </Box>
            <Box>
              <Link href="https://becauseinterwebs.com">Web</Link>
            </Box>
          </Stack>
        </Box>
        <Box>
          <p>
            This scaffolding template is designed to get a project using Vite, React, Firestore and Material UI up and running quickly. 
            It is a template I built as I found myself replicating this setup each time I started a new project with these requirements. 
            It is built from my base <a href="https://github.com/becauseinterwebs/react-vite-firestore" target="blank">React + Vite + Firestore</a> template.
          </p>
        </Box>
      </Box>
      <Divider/>
      <Box>
        <p>To configure the Firestore connection:</p>
        <ul>
          <li>Open the <b><i>/.env.development</i></b> file</li>
          <li>Edit the values to match your Firestore setup</li>
          <li>When you are ready to publish to a production environment, copy your .env file to <b><i>.env.production</i></b></li>
        </ul>
      </Box>
      <Box>
        <p><b>Building for a specific environment</b></p>
        <p>For development, just use the standard commands</p>
        <p><b>yarn dev</b> or <b>npm run dev</b></p>
        <p>For production, a script has been added to the <b>package.json</b> file:</p>
        <p><b>yarn build:prod</b> or <b>npm run build:prod</b></p>
        <p>This will set the environment file used for the build to <b>.env.production</b></p>
      </Box>
      <Box>
        If you are hosting your project on <b>Cloudflare</b> (which I highly recommend...it's FREE) there is a 
        script in the package.json for publishing to your Cloudflare account:
        <p><b>yarn publish:prod</b> or <b>npm run publish:prod</b></p>
        Just replace the <b>CLOUDFLARE_ACCOUNT_ID</b> with your token and change the <b>--project-name</b> variable to your project.
      </Box>
    </Box>
  )
}

export default App
