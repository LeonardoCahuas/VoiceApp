import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, Input, DialogContent, DialogActions, List, ListItem, TextField, Collapse,
  ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Grid, Divider, InputAdornment, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useSelector } from "react-redux";
import userReducer from "./redux/userSlice"
import { useEffect } from 'react';

function VoiceManagement() {
  const [open, setOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceSearch, setVoiceSearch] = useState("");
  const [expandedVoice, setExpandedVoice] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [voices, setVoices] = useState([])
  const [voiceName, setVoiceName] = useState("");
  const [consentFile, setConsentFile] = useState(null);

  const userId = useSelector(state => state.user.user)


  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}/voices`);
        setVoices(response.data); // Assumendo che la risposta sia un array di voci
      } catch (error) {
        console.error('Errore durante il recupero delle voci:', error);
      }
    };
    fetchVoices();


  }, [])

  async function createVoice() {
    const API_URL = 'https://app.resemble.ai/api/v2/voices';
    const API_TOKEN = 'ZB2sl0yNUs9NA5rHM2oORAtt'; // Sostituisci con il tuo token API

    const formData = new FormData();
    formData.append('name', voiceName);
    formData.append('consent', consentFile); // Assicurati che questo sia il file codificato in base64

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Voce creata:", response.data);

      const responseBack = await axios.post('http://localhost:5000/voices', {
        uuid: response.data.item.uuid,
        userId: userId
      });
      handleClose();
    } catch (error) {
      console.error("Errore durante la creazione della voce:", error);
    }
  }



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVoice(null);
  };

  const aggiungiVoce = () => {
    setOpen(false);
    setSelectedVoice(null);

    //CHIAMATA API CREATE VOICE
  };

  async function eliminaVoce() {
    console.log("eiooo")
    const API_URL = `https://app.resemble.ai/api/v2/voices/uuidu`;
    const API_TOKEN = 'ZB2sl0yNUs9NA5rHM2oORAtt'; // Assicurati di sostituire con il tuo token API effettivo

    try {
        const response = await axios.delete(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        });

        if (response.data.success) {
            console.log(`Voice with UUID  deleted successfully from Resemble.ai.`);
            
            // Qui puoi anche aggiungere codice per eliminare la voce dal tuo backend locale se necessario.
            // Ad esempio, se hai un endpoint DELETE sul tuo backend locale:
            // await axios.delete(`http://localhost:5000/voices/${voiceUuid}`);
            
        } else {
            console.error('Failed to delete voice from Resemble.ai.');
        }
    } catch (error) {
        console.error(`Error deleting voice with UUID `, error);
    }
}


  const toggleVoiceStyle = (voice) => {
    if (expandedVoice === voice) {
      setExpandedVoice(null);
    } else {
      setExpandedVoice(voice);
    }
  };

  const handleEditVoice = (voice) => {
    setSelectedVoice(voice);
  };

  const handleEditStyle = (style) => {
    setSelectedStyle(style);
  };

  return (
    <Container style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
        Gestione delle Voci
      </Typography>

      <TextField
        variant="filled"
        style={{ marginBottom: '20px', color: 'white', borderColor: 'white' }}
        placeholder="Cerca voce..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: { color: 'white', borderColor: 'white' }
        }}
        value={voiceSearch}
        onChange={(e) => setVoiceSearch(e.target.value)}
      />

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
            Elenco Voci
          </Typography>
          <List>
            {['Voce 1', 'Voce 2', 'Voce 3'].filter(voice => voice.toLowerCase().includes(voiceSearch.toLowerCase())).map((voice, index) => (
              <div key={index}>
                <ListItem divider button onClick={() => toggleVoiceStyle(voice)}>
                  <ListItemText primary={voice} />
                  <ListItemSecondaryAction style={{ marginRight: '30px' }}>
                    <Button startIcon={<EditIcon />} color="primary" onClick={() => handleEditVoice(voice)}>
                      Modifica
                    </Button>
                    <Button startIcon={<DeleteIcon />} onClick={eliminaVoce} color="secondary">
                      Elimina
                    </Button>
                  </ListItemSecondaryAction>
                  {expandedVoice === voice ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={expandedVoice === voice} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {['Felice', 'Triste', 'Neutro'].map((style, sIndex) => (
                      <ListItem key={sIndex} divider style={{ paddingLeft: '60px', backgroundColor: '#3a3f48' }}>
                        <ListItemText primary={style} />
                        <ListItemSecondaryAction style={{ marginRight: '30px' }}>
                          <IconButton color="primary" onClick={() => handleEditStyle(style)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
            Aggiungi Voce
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen} style={{ width: '100px', height: '100px' }}>
            <AddIcon fontSize="large" />
          </Button>
        </Grid>

        {selectedVoice && (
          <Grid item xs={12}>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
              Modifica Voce {selectedVoice}
            </Typography>
            <TextField label="Nome Voce" fullWidth margin="dense" defaultValue={selectedVoice} style={{ color: 'white', borderColor: 'white' }} InputProps={{ style: { color: 'white', borderColor: 'grey' } }} InputLabelProps={{ style: { color: 'grey' } }} />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary">
                Salva Modifiche
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setSelectedVoice(null)}>
                Annulla
              </Button>
            </Box>
          </Grid>
        )}

        {selectedStyle && (
          <Grid item xs={12}>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="h5" gutterBottom style={{ color: 'white' }}>
              Modifica Stile {selectedStyle}
            </Typography>
            <TextField label="Nome Stile" fullWidth margin="dense" defaultValue={selectedStyle} style={{ color: 'white', borderColor: 'white' }} InputProps={{ style: { color: 'white', borderColor: 'white' } }} />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary">
                Salva Modifiche
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setSelectedStyle(null)}>
                Annulla
              </Button>
            </Box>
          </Grid>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Aggiungi Nuova Voce</DialogTitle>
          <DialogContent>
            <TextField
              label="Nome Voce"
              fullWidth
              margin="dense"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              InputProps={{ style: { color: 'grey', borderColor: 'grey' } }}
              InputLabelProps={{ style: { color: 'grey' } }}
            />

            <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
              Carica Consenso
              <Input type="file" hidden onChange={(e) => setConsentFile(e.target.files[0])} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Annulla
            </Button>
            <Button onClick={createVoice} color="primary">
              Conferma
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
}

export default VoiceManagement
