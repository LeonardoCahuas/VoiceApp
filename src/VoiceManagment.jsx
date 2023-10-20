import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, TextField, Collapse,
  ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Grid, Divider, InputAdornment, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function VoiceManagement() {
  const [open, setOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceSearch, setVoiceSearch] = useState("");
  const [expandedVoice, setExpandedVoice] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVoice(null);
  };

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
    <Container style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px'}}>
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
                    <Button startIcon={<DeleteIcon />} color="secondary">
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
            <TextField label="Nome Voce" fullWidth margin="dense" defaultValue={selectedVoice} style={{ color: 'white', borderColor: 'white' }} InputProps={{ style: { color: 'white', borderColor: 'white' } }} />
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
            <TextField label="Nome Voce" fullWidth margin="dense" InputProps={{ style: { color: 'white', borderColor: 'white' } }} InputLabelProps={{ style: { color: 'white' } }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Annulla
            </Button>
            <Button onClick={handleClose} color="primary">
              Conferma
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
}

export default VoiceManagement;
