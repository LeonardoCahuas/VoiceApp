import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon,
    ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Grid, TextField, Divider, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MicIcon from '@mui/icons-material/Mic';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { FormControl, InputLabel } from '@mui/material';

function Clips() {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [openText, setOpenText] = useState(false);
    const [openVoice, setOpenVoice] = useState(false);
    const [clipText, setClipText] = useState("");

    const [clips, setClips] = useState([
        { id: 1, voice: 'Voce Italiana', style: 'Felice', text: 'Benvenuti!', file: null },
        { id: 2, voice: 'Voce Italiana', style: 'Triste', text: 'Mi dispiace.', file: null },
        //... altre clips finte
    ]);

    const creaClipDaTesto = (voice, style) => {
        setSelectedVoice(voice);
        setSelectedStyle(style);
        setOpenText(true);

        //CHIAMATA API CREATE CLIP FROM TEXT
    };

    const creaClipDaVoce = (voice, style) => {
        setSelectedVoice(voice);
        setSelectedStyle(style);
        setOpenVoice(true);

        //CHIAMATA API CREATE CLIP FROM VOCE (VEDERE INSIEME)
    };

    const handleClose = () => {
        setOpenText(false);
        setOpenVoice(false);
        setSelectedVoice(null);
        setSelectedStyle(null);
    };

    const eliminaClip = (clipId) => {
        setClips(clips.filter(clip => clip.id !== clipId));

        //CHIAMATA API DELETE CLIP
    };
    
    const modificaClip = (clipid) => {
        //CHIAMATA API UPDATE CLIP
    }
    return (
        <Container style={{ background: '#282c34', color: 'white', padding: '5em', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom style={{ color: 'white', marginBottom: '40px' }}>
                Gestione Clips
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} style={{ background: '#444', margin: '10px 0', padding: '10px', borderRadius: '8px' }}>
                    <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                        Lista delle Voci
                    </Typography>
                    <List>
                        {['Voce Italiana', 'Voce Inglese', 'Voce Spagnola'].map((voice) => (
                            <ListItem key={voice} button onClick={() => setSelectedVoice(voice)}>
                                <ListItemText primary={voice} />
                                <ListItemIcon>
                                    <Button startIcon={<TextFieldsIcon />} onClick={() => creaClipDaTesto(voice)}>
                                        Crea da Testo
                                    </Button>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <Button  color='secondary' startIcon={<MicIcon color='secondary' />} onClick={() => creaClipDaVoce(voice)}>
                                        Crea da Voce
                                    </Button>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <IconButton edge="end" color="primary" onClick={() => setSelectedVoice(voice)}>
                                        <ExpandMore />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                {selectedVoice && (
                    <Grid item xs={12} style={{ background: '#555', margin: '10px 0', padding: '10px', borderRadius: '8px' }}>
                        <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                            Stili per {selectedVoice}
                        </Typography>
                        <List>
                            {['Felice', 'Triste', 'Neutro', 'Euforico', 'Arrabbiato'].map((style) => (
                                <div key={style}>
                                    <ListItem button onClick={() => handleOpenText(selectedVoice, style)}>
                                        <ListItemText primary={style} />
                                    </ListItem>

                                    {clips.filter(clip => clip.voice === selectedVoice && clip.style === style).map(clip => (
                                        <ListItem key={clip.id} style={{ paddingLeft: '40px', background: '#666', margin: '8px 0', borderRadius: '8px' }}>
                                            <ListItemText primary={clip.text} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" color="primary" onClick={modificaClip(clip.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton edge="end" color="secondary" onClick={() => eliminaClip(clip.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </div>
                            ))}
                        </List>
                    </Grid>
                )}

                <Dialog open={openText} onClose={handleClose}>
                    <DialogTitle>Genera Clip per {selectedVoice} - {selectedStyle}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Testo per generare Clip"
                            fullWidth
                            margin="dense"
                            multiline
                            rows={3}
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                            value={clipText}
                            onChange={(e) => setClipText(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Genera Clip
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openVoice} onClose={handleClose}>
                    <DialogTitle>Registra Clip per {selectedVoice} - {selectedStyle}</DialogTitle>
                    <DialogContent>
                        <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
                            Inizia Registrazione
                            <input type="file" hidden />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Termina Registrazione
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    );
}

export default Clips;
