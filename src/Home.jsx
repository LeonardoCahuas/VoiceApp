import React from 'react';
import { Button, Typography, Box, Grid, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MicIcon from '@mui/icons-material/Mic';
import StyleIcon from '@mui/icons-material/Style';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Box style={{ minHeight: '100vh', height: "fit-content", width: '100vw', background: '#282c34', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0', paddingBottom: "50px", margin: '0' }}>
            <Typography variant="h2" gutterBottom style={{ color: '#8A2BE2', fontWeight: 'bold' }}>
                VoiceApp
            </Typography>

            <Typography variant="h6" style={{ color: 'white', maxWidth: '70%', textAlign: 'center', marginBottom: '30px' }}>
                Registra una clip vocale e convertila rapidamente nella voce del tuo artista preferito. Carica le tue clip su Google Drive e fornisci il link della cartella contenente le registrazioni originali, insieme al link della cartella dove desideri ricevere i file convertiti. Personalizza le impostazioni per l'output a tuo piacimento e in pochi istanti otterrai le tue registrazioni trasformate.
            </Typography>

            <Grid container spacing={5} alignItems="center" justifyContent="center" style={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton style={{ color: '#FFD700' }}>
                            <HomeIcon fontSize="large" />
                        </IconButton>
                        <Typography style={{ color: 'white', marginTop: '10px' }}>
                            Registra la clip
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton color="secondary">
                            <MicIcon fontSize="large" />
                        </IconButton>
                        <Typography style={{ color: 'white', marginTop: '10px' }}>
                            Imposta la voce e le sue tonalità
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton color="primary">
                            <StyleIcon fontSize="large" />
                        </IconButton>
                        <Typography style={{ color: 'white', marginTop: '10px' }}>
                            Convertila nella voce del tuo artista
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Button className='buttondash' variant="contained" color="primary" startIcon={<DashboardIcon />} style={{ marginTop: '40px', backgroundColor: '#8A2BE2', color: '#282c34' }}>
                <Link to="/authentication" className='linkdash'>Accedi al Dashboard</Link>
            </Button>
        </Box>
    );
}

export default Home;
