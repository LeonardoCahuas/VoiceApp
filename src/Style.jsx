import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon,
    ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Grid, TextField, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import MicIcon from '@mui/icons-material/Mic';

function Style() {
    const [expandedVoice, setExpandedVoice] = useState(null);
    const [openStyleDialog, setOpenStyleDialog] = useState(false);
    const [openPronunciationDialog, setOpenPronunciationDialog] = useState(false);

    const handleToggleVoice = (voice) => {
        if (expandedVoice === voice) {
            setExpandedVoice(null);
        } else {
            setExpandedVoice(voice);
        }
    };

    const handleCloseStyleDialog = () => {
        setOpenStyleDialog(false);
    };

    const handleClosePronunciationDialog = () => {
        setOpenPronunciationDialog(false);
    };

    return (
        <Container style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                Gestione Stili
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                        Lista delle Voci
                    </Typography>
                    <List>
                        {['Voce Italiana', 'Voce Inglese', 'Voce Spagnola'].map((voice) => (
                            <div key={voice}>
                                <ListItem button onClick={() => handleToggleVoice(voice)}>
                                    <ListItemText primary={voice} />
                                    <ListItemIcon>
                                        {expandedVoice === voice ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemIcon>
                                    <ListItemSecondaryAction>
                                        <IconButton color="primary" onClick={() => setOpenStyleDialog(true)}>
                                            <AddIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {expandedVoice === voice && (
                                    <List>
                                        {['Felice', 'Triste', 'Neutro'].map((style) => (
                                            <div key={style}>
                                                <ListItem button>
                                                    <ListItemText primary={style} />
                                                    <ListItemSecondaryAction>
                                                        <IconButton edge="end" color="primary">
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton edge="end" color="secondary">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton edge="end" color="primary" onClick={() => setOpenPronunciationDialog(true)}>
                                                            <MicIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <List>
                                                    <ListItem>
                                                        <ListItemText primary="Esempio pronuncia: Ciao" />
                                                        <ListItemSecondaryAction>
                                                            <IconButton edge="end" color="primary">
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton edge="end" color="secondary">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                </List>
                                                <Divider />
                                            </div>
                                        ))}
                                    </List>
                                )}
                            </div>
                        ))}
                    </List>
                </Grid>

                <Dialog open={openStyleDialog} onClose={handleCloseStyleDialog}>
                    <DialogTitle>Aggiungi Stile</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Nome Stile"
                            fullWidth
                            margin="dense"
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseStyleDialog} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={handleCloseStyleDialog} color="primary">
                            Aggiungi
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openPronunciationDialog} onClose={handleClosePronunciationDialog}>
                    <DialogTitle>Aggiungi Pronuncia</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Parola"
                            fullWidth
                            margin="dense"
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            label="Pronuncia"
                            fullWidth
                            margin="dense"
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePronunciationDialog} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={handleClosePronunciationDialog} color="primary">
                            Salva
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    );
}

export default Style;
