import React, { useState } from 'react';
import axios from 'axios';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon,
    ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Grid, TextField, Divider, Input, FormControl, InputLabel, Select, MenuItem, Slider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileUploadIcon from '@mui/icons-material/CloudUpload';

function Recordings() {
    const [expandedVoice, setExpandedVoice] = useState(null);
    const [expandedStyle, setExpandedStyle] = useState(null);
    const [open, setOpen] = useState(false);
    const [recordingText, setRecordingText] = useState("");
    const [selectedSegmentStyle, setSelectedSegmentStyle] = useState('');
    const [sliderValue, setSliderValue] = useState([20, 80]);
    const [dialogName, setDialogName] = useState('');
    const [dialogText, setDialogText] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCreateRecording = async () => {
        // Qui puoi fare la chiamata API per creare il recording
        const API_URL = 'https://app.resemble.ai/api/v2/voices/4c6d3da5/recordings'; // Modifica con il tuo URL effettivo
        const API_TOKEN = 'ZB2sl0yNUs9NA5rHM2oORAtt'; // Sostituisci con il tuo token API effettivo

        const formData = new FormData();
        formData.append('name', dialogName);
        formData.append('text', dialogText);
        if (file) {
            formData.append('audio', file);
        }

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                }
            });

            console.log("Recording creato:", response.data);
            handleCloseDialog();
        } catch (error) {
            console.error("Errore durante la creazione del recording:", error);
        }
    };

    const toggleVoice = (voice) => {
        if (expandedVoice === voice) {
            setExpandedVoice(null);
        } else {
            setExpandedVoice(voice);
        }
    };

    const eliminaRegistrazione = () => {
        //CHIAMATA API DELETE RECORDING
    }

    const modificaRegistrazione = () => {
        //CHIAMATA API UPDATE RECORDING 
    }

    const caricaRegistrazione = () => {
        // CHIAMATA API CREATE RECORDING
    }

    const handleCreateRecording1 = async () => {
        // Qui puoi fare la chiamata API per creare il recording
        const API_URL = 'https://app.resemble.ai/api/v2/voices/4c6d3da5/recordings'; // Modifica con il tuo URL effettivo
        const API_TOKEN = 'ZB2sl0yNUs9NA5rHM2oORAtt'; // Sostituisci con il tuo token API effettivo

        const formData = new FormData();
        formData.append('name', dialogName);
        formData.append('text', dialogText);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("Recording creato:", response.data);
            handleCloseDialog();
        } catch (error) {
            console.error("Errore durante la creazione del recording:", error);
        }
    };

    const handleCloseDialog = () => {
        setDialogName('');
        setDialogText('');
        setOpen(false);
    };

    const toggleStyle = (style) => {
        if (expandedStyle === style) {
            setExpandedStyle(null);
        } else {
            setExpandedStyle(style);
        }
    };

    return (
        <Container style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                Recordings
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                    <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                        Voci
                    </Typography>
                    <List>
                        {['Voce 1', 'Voce 2'].map((voice) => (
                            <ListItem key={voice} style={{ background: '#444', margin: '10px 0', borderRadius: '8px' }}>
                                <ListItemText primary={voice} />
                                <ListItemIcon>
                                    <IconButton edge="end" color="primary" onClick={() => toggleVoice(voice)}>
                                        {expandedVoice === voice ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                {expandedVoice && (
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                            Stili
                        </Typography>
                        <List>
                            {['Felice', 'Triste', 'Neutro'].map((style) => (
                                <div key={style}>
                                    <ListItem button onClick={() => toggleStyle(style)} style={{ background: '#555', margin: '10px 0', borderRadius: '8px' }}>
                                        <ListItemText primary={style} />
                                        <ListItemIcon>
                                            <IconButton edge="end" color="primary">
                                                {expandedStyle === style ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                        </ListItemIcon>
                                    </ListItem>
                                    {expandedStyle === style && (
                                        <div>
                                            <List>
                                                {['Recording 1', 'Recording 2'].map((recording) => (
                                                    <ListItem key={recording} style={{ background: '#666', margin: '8px 0', borderRadius: '8px' }}>
                                                        <ListItemText primary={recording} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton onClick={eliminaRegistrazione} edge="end" color="secondary">
                                                                <DeleteIcon />
                                                                <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                                                    Elimina
                                                                </Typography>
                                                            </IconButton>
                                                            <IconButton edge="end" onClick={modificaRegistrazione} color="primary">
                                                                <EditIcon />
                                                                <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                                                    Modifica
                                                                </Typography>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginTop: '10px' , marginBottom: "80px"}}>
                                                Aggiungi Recording
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </List>
                    </Grid>
                )}

                <Dialog open={open} onClose={handleCloseDialog}>
                    <DialogTitle>Aggiungi Recording per {expandedStyle}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Nome Recording"
                            fullWidth
                            margin="dense"
                            value={dialogName}
                            onChange={(e) => setDialogName(e.target.value)}
                            InputProps={{ style: { color: 'grey' } }}
                            InputLabelProps={{ style: { color: 'grey' } }}
                        />
                        <TextField
                            label="Testo della Registrazione"
                            fullWidth
                            margin="dense"
                            multiline
                            rows={3}
                            value={dialogText}
                            onChange={(e) => setDialogText(e.target.value)}
                            InputProps={{ style: { color: 'grey' } }}
                            InputLabelProps={{ style: { color: 'grey' } }}
                        />
                        <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
                            Carica File
                            <Input type="file" hidden onChange={handleFileChange} />
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            Annulla
                        </Button>
                        <Button onClick={handleCreateRecording} color="primary">
                            Conferma
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

            <div style={{ marginTop: '30px', width: '100%', background: '#444', padding: '20px', borderRadius: '8px' }}>
                <Typography variant="h5" style={{ color: 'white' }}>
                    Suddivisione e Assegnazione Recording
                </Typography>
                <Button variant="contained" component="label" style={{ marginTop: '10px' }}>
                    Carica Recording
                    <Input type="file" hidden />
                </Button>

                <div style={{ marginTop: '20px', border: '2px solid #555', padding: '20px', borderRadius: '8px' }}>
                    <Typography style={{ color: 'white', textAlign: 'center' }}>
                        (Rappresentazione visiva del recording qui)
                    </Typography>
                    <Slider
                        value={sliderValue}
                        onChange={(event, newValue) => setSliderValue(newValue)}
                        valueLabelDisplay="auto"
                        style={{ color: 'white', marginTop: '20px' }}
                    />
                </div>

                <Typography variant="h6" style={{ color: 'white', marginTop: '20px' }}>
                    Assegna spezzone a stile:
                </Typography>
                <FormControl style={{ marginTop: '10px', width: '100%' }}>
                    <InputLabel htmlFor="style-selector" style={{ color: 'white' }}>Seleziona Stile</InputLabel>
                    <Select
                        labelId="style-selector"
                        style={{ color: 'white' }}
                        inputProps={{
                            style: { color: 'white' }
                        }}
                        InputProps={{ style: { color: 'white' } }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        value={selectedSegmentStyle}
                        onChange={(e) => setSelectedSegmentStyle(e.target.value)}
                    >
                        {['Felice', 'Triste', 'Neutro'].map((style) => (
                            <MenuItem key={style} value={style}>
                                {style}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Aggiungi spezzone allo stile
                </Button>
            </div>
        </Container>
    );
}

export default Recordings;
