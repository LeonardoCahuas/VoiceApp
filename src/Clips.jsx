import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon,
    ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Grid, TextField, Divider, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileUploadIcon from '@mui/icons-material/CloudUpload';
import MicIcon from '@mui/icons-material/Mic';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { FormControl, InputLabel } from '@mui/material';

function Clips() {
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [open, setOpen] = useState(false);
    const [inputType, setInputType] = useState("text");
    const [clipText, setClipText] = useState("");

    const [clips, setClips] = useState([
        { id: 1, voice: 'Voce Italiana', style: 'Felice', text: 'Benvenuti!', file: null },
        { id: 2, voice: 'Voce Italiana', style: 'Triste', text: 'Mi dispiace.', file: null },
        //... altre clips finte
    ]);

    const handleOpen = (voice, style) => {
        setSelectedVoice(voice);
        setSelectedStyle(style);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVoice(null);
        setSelectedStyle(null);
    };

    const handleRemoveClip = (clipId) => {
        setClips(clips.filter(clip => clip.id !== clipId));
    };

    return (
        <Container style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                Gestione Clips
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                        Lista delle Voci
                    </Typography>
                    <List>
                        {['Voce Italiana', 'Voce Inglese', 'Voce Spagnola'].map((voice) => (
                            <ListItem key={voice} button onClick={() => setSelectedVoice(voice)}>
                                <ListItemText primary={voice} />
                                <ListItemIcon>
                                    <IconButton edge="end" color="primary" onClick={() => setSelectedVoice(voice)}>
                                        <MicIcon />
                                    </IconButton>
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
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                            Stili per {selectedVoice}
                        </Typography>
                        <List>
                            {['Felice', 'Triste', 'Neutro', 'Euforico', 'Arrabbiato'].map((style) => (
                                <div key={style}>
                                    <ListItem button onClick={() => handleOpen(selectedVoice, style)}>
                                        <ListItemText primary={style} />
                                        <ListItemIcon>
                                            <IconButton edge="end" color="primary">
                                                <TextFieldsIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemIcon>
                                            <IconButton edge="end" color="primary">
                                                <AddIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItem>

                                    {clips.filter(clip => clip.voice === selectedVoice && clip.style === style).map(clip => (
                                        <ListItem key={clip.id} style={{ paddingLeft: '40px' }}>
                                            <ListItemText primary={clip.text} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton edge="end" color="secondary" onClick={() => handleRemoveClip(clip.id)}>
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

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Genera Clip per {selectedVoice} - {selectedStyle}</DialogTitle>
                    <DialogContent>
                        <FormControl component="fieldset">
                            <Select
                                value={inputType}
                                onChange={(e) => setInputType(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="text">Inserisci Testo</MenuItem>
                                <MenuItem value="file">Carica File</MenuItem>
                            </Select>
                        </FormControl>

                        {inputType === "text" ? (
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
                        ) : (
                            <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
                                Carica File
                                <input type="file" hidden />
                            </Button>
                        )}
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
            </Grid>
        </Container>
    );
}

export default Clips;
