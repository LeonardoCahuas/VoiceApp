import React from 'react';
import { Button, Typography, Box, Grid, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MicIcon from '@mui/icons-material/Mic';
import StyleIcon from '@mui/icons-material/Style';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Box style={{ height: '100vh', width: '100vw', background: '#282c34', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0', margin: '0' }}>
            <Typography variant="h2" gutterBottom style={{ color: '#8A2BE2', fontWeight: 'bold' }}>
                VoiceApp: La Rivoluzione Vocale
            </Typography>

            <Typography variant="h6" style={{ color: 'white', maxWidth: '70%', textAlign: 'center', marginBottom: '30px' }}>
                Con VoiceApp, dare vita alle tue creazioni vocali non è mai stato così semplice. Crea, personalizza e modifica le tue voci in un ambiente intuitivo. Esplora una vasta gamma di stili, registra e modifica al volo.
            </Typography>

            <Grid container spacing={5} alignItems="center" justifyContent="center" style={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton style={{ color: '#FFD700' }}>
                            <HomeIcon fontSize="large" />
                        </IconButton>
                        <Typography style={{ color: 'white', marginTop: '10px' }}>
                            Una piattaforma pensata per te.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton color="secondary">
                            <MicIcon fontSize="large" />
                        </IconButton>
                        <Typography style={{ color: 'white', marginTop: '10px' }}>
                            Registra e modifica con facilità.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <IconButton color="primary">
                            <StyleIcon fontSize="large" />
                        </IconButton>
                        <Typography style={{ color: 'white', marginTop: '10px' }}>
                            Personalizza ogni dettaglio.
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
