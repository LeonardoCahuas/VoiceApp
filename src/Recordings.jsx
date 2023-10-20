import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon,
    ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Grid, TextField, Divider, Input, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileUploadIcon from '@mui/icons-material/CloudUpload';

function Recordings() {
    const [open, setOpen] = useState(null);
    const [currentStyle, setCurrentStyle] = useState(null);
    const [selectedRecording, setSelectedRecording] = useState(null);
    const [recordingText, setRecordingText] = useState("");

    const handleOpen = (style) => {
        setOpen(style);
        setCurrentStyle(style);
    };

    const handleClose = () => {
        setOpen(null);
        setCurrentStyle(null);
    };

    return (
        <Container style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                Recordings
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                        Voci
                    </Typography>
                    <List>
                        {['Voce 1', 'Voce 2'].map((voice) => (
                            <ListItem key={voice}>
                                <ListItemText primary={voice} />
                                <ListItemIcon>
                                    <IconButton edge="end" color="primary" onClick={() => handleOpen(voice)}>
                                        {open === voice ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                        Stili
                    </Typography>
                    <List>
                        {['Felice', 'Triste', 'Neutro'].map((style) => (
                            <ListItem key={style} button onClick={() => handleOpen(style)}>
                                <ListItemText primary={style} />
                                <ListItemIcon>
                                    <IconButton edge="end" color="primary" onClick={() => handleOpen(style)}>
                                        {open === style ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                {currentStyle && (
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                            Recordings per {currentStyle}
                        </Typography>
                        <List>
                            {['Recording 1', 'Recording 2'].map((recording) => (
                                <ListItem key={recording}>
                                    <ListItemText primary={recording} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton edge="end" color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <Button variant="contained" color="primary" onClick={() => setOpen(currentStyle)}>
                            Aggiungi Recording
                        </Button>
                    </Grid>
                )}

                <Dialog open={open !== null} onClose={handleClose}>
                    <DialogTitle>Aggiungi Recording per {currentStyle}</DialogTitle>
                    <DialogContent>
                        <TextField 
                            label="Nome Recording" 
                            fullWidth 
                            margin="dense" 
                            InputProps={{ style: { color: 'white' } }} 
                            InputLabelProps={{ style: { color: 'white' } }} 
                        />
                        <TextField 
                            label="Testo della Registrazione" 
                            fullWidth 
                            margin="dense" 
                            multiline 
                            rows={3} 
                            InputProps={{ style: { color: 'white' } }} 
                            InputLabelProps={{ style: { color: 'white' } }} 
                            value={recordingText} 
                            onChange={(e) => setRecordingText(e.target.value)} 
                        />
                        <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
                            Carica File
                            <Input type="file" hidden />
                        </Button>
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

export default Recordings;
