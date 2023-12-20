import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Container, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, Card, CardContent,
  IconButton, Slider, Button, Typography, CircularProgress, List, ListItem, ListItemText,
} from '@mui/material';
import { CloudUpload, CloudDownload, VolumeUp, GraphicEq, Hearing, Tune, FilterVintage, Cancel } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Buffer } from "buffer"

const useStyles = makeStyles({
  inputStyle: {
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    padding: '0px',
    fontSize: '1rem',
  },
  cardStyle: {
    background: '#333',
    color: '#fff',
    margin: '10px 0',
    borderRadius: '8px',
  },
  sliderTrackStyle: {
    color: '#1976d2',
    height: '8px',
  },
  sliderThumbStyle: {
    color: '#2196f3',
  },
});

function VoiceManagement() {
  const classes = useStyles();
  const sliderSettings = [
    {
      min: 0, max: 48000, step: 1, defaultValue: 22050,
      label: "Ricampionamento Audio",
      description: "Controlla la frequenza di campionamento dell'audio finale. Un valore di 0 lascia l'audio invariato. Valori più alti aumentano la frequenza di campionamento per una qualità potenzialmente migliore."
    },
    {
      min: 0, max: 1, step: 0.01, defaultValue: 0.5,
      label: "Scala Inviluppo Volume",
      description: "Ajusta come il volume dell'audio segue quello originale. Valori bassi mantengono la dinamica originale, valori alti normalizzano il volume per una riproduzione più uniforme."
    },
    {
      min: 0, max: 0.5, step: 0.01, defaultValue: 0.25,
      label: "Protezione Consonanti",
      description: "Protegge le consonanti sorde e i suoni del respiro. Valori più bassi aumentano la protezione, riducendo la possibilità di artefatti audio."
    },
    {
      min: 0, max: 7, step: 1, defaultValue: 3,
      label: "Filtro Mediano",
      description: "Applica un filtro che può smussare variazioni rapide nel pitch. Valori maggiori possono ridurre dettagli nel tono della voce."
    },
    {
      min: 0, max: 1, step: 0.01, defaultValue: 0.5,
      label: "Rapporto Funzionalità",
      description: "Gestisce l'intensità degli accenti e la chiarezza della pronuncia. Valori eccessivamente alti possono introdurre distorsioni."
    }
  ];

  const inputStyle = {
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    padding: '0px',
    fontSize: '1rem',
  };

  const cardStyle = {
    background: '#333', // Colore di sfondo delle card
    color: '#fff', // Colore del testo
    margin: '10px 0', // Spazio sopra e sotto la card
    borderRadius: '8px', // Angoli arrotondati
  };


  const [fileInput, setFileInput] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [sliderValues, setSliderValues] = useState(sliderSettings.map(s => s.defaultValue));
  const [fileData, setFileData] = useState(true);
  const [fileAvailable, setFileAvailable] = useState(false)
  let index = useSelector(state => state.index.value);
  const [numericInput, setNumericInput] = useState(0);




  const driveFolderUrl = "https://drive.google.com/drive/folders/1S6_SN5JP8YRC9Rou7M4sAU6s7R_Gt-k9?usp=share_link";
  const driveFolderDest = "https://drive.google.com/drive/folders/1QdiVCnOy3j8ibH83Ot4jBZp4Wy5PmFd8?usp=share_link"

  const handleSliderChange = (index) => (event, newValue) => {
    let newSliderValues = [...sliderValues];
    newSliderValues[index] = newValue;
    setSliderValues(newSliderValues);
  };

  const handleFileChange = (event) => {
    console.log(event.target.files)
    setFileInput(event.target.files[0]);
    setFileData({
      name: event.target.files[0].name,
      url: '', // Placeholder finché non avrai l'URL effettivo dopo il caricamento
    });
  };





  

  const handleIncrement = () => {
    setNumericInput((prev) => Math.min(prev + 1, 12)); // Assicurati di non superare il valore massimo
  };

  const handleDecrement = () => {
    setNumericInput((prev) => Math.max(prev - 1, -12)); // Assicurati di non andare sotto il valore minimo
  };

  const downloadFileFromGoogleDrive = async (downloadUrl) => {
    // Assumendo che questa sia la funzione per scaricare file da Google Drive
    // Sostituire con l'URL effettivo
    const downloadResponse = await axios.get(downloadUrl, {
      responseType: 'blob',
    });
    return downloadResponse.data;
  };

  const handleDownload = async () => {
    if (!downloadUrl) return;
    try {
      const fileData = await downloadFileFromGoogleDrive(downloadUrl);
      const url = window.URL.createObjectURL(new Blob([fileData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.wav'); // o qualsiasi altro nome di file
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Errore durante il download:', error);
    }
  };


  


  const extractFolderIdFromUrl = (url) => {
    // Estrai l'ID della cartella dall'URL (ad esempio, utilizzando una regex)
    const match = url.match(/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  /* const handleSubmit = async () => {
    const data = {
      sid: 2, // Valore statico, sostituire con il valore reale
      source_folder_url: urlOne, // Preso dallo stato del componente
      destination_folder_url: urlTwo, // Preso dallo stato del componente
      f0_up_key: numericInput, // Valore statico, sostituire con il valore reale
      f0_method: "rmvpe", // Valore statico, sostituire con il valore reale
      file_index: index, // Valore statico, sostituire con il valore reale
      index_rate: sliderValues[4], // Preso dallo stato del componente se necessario
      filter_radius: sliderValues[3], // Preso dal primo slider
      resample_sr: sliderValues[0], // Preso dal secondo slider
      rms_mix_rate: sliderValues[1], // Preso dal quarto slider
      protect: sliderValues[2], // Preso dal quinto slider
      format1: "wav" // Valore statico, sostituire con il valore reale
    };


   console.log(data)
    // Modifica l'URL e l'endpoint API in base alle tue necessità
    const API_ENDPOINT = 'http://ec2-15-160-94-154.eu-south-1.compute.amazonaws.com:7865/vc_multi';

    try {
      const response = await axios.post(API_ENDPOINT, data, {
        headers: {
          'Content-Type': 'application/json'
          // Aggiungi qui eventuali altri header necessari, come l'Authorization header
        }
      });

      console.log('Risposta del server:', response);
      // Gestisci qui la risposta del server
    } catch (error) {
      console.error('Errore nella richiesta API:', error);
      // Gestisci qui gli errori della richiesta
    }
  }; */


  const handleSubmit = async () => {
    
    if (!fileInput) return;
    setUploading(true)
    setFileAvailable(false)
    const data = {
      sid: 2, // Valore statico, sostituire con il valore reale
      source_folder_url: driveFolderUrl, // Preso dallo stato del componente
      destination_folder_url: driveFolderDest, // Preso dallo stato del componente
      f0_up_key: numericInput, // Valore statico, sostituire con il valore reale
      f0_method: "rmvpe", // Valore statico, sostituire con il valore reale
      file_index: index, // Valore statico, sostituire con il valore reale
      index_rate: sliderValues[4], // Preso dallo stato del componente se necessario
      filter_radius: sliderValues[3], // Preso dal primo slider
      resample_sr: sliderValues[0], // Preso dal secondo slider
      rms_mix_rate: sliderValues[1], // Preso dal quarto slider
      protect: sliderValues[2], // Preso dal quinto slider
      format1: "wav" // Valore statico, sostituire con il valore reale
    };

    const folderId = extractFolderIdFromUrl(driveFolderUrl);
    if (!folderId) {
      console.error("Impossibile estrarre l'ID della cartella");
      return;
    }
    console.log(fileInput)
    try {



      try {
        // Assicurati che il file sia del tipo corretto
        if (fileInput.type !== 'audio/wav') {
          console.error('Il file selezionato non è di tipo audio/wav.');
          return;
        }

        // Prepara il FormData per l'upload
        const fileBlob = new Blob([fileInput]);
        const formData = new FormData();
        formData.append('file', fileBlob, 'audio.wav');
        formData.append('folderId', folderId);

        // Invia il FormData al server e attendi la risposta
        const uploadResponse = await axios.post('http://15.160.123.219:5000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Controlla se il file è stato caricato con successo
        if (uploadResponse.status === 200 && uploadResponse.data.fileId) {
          console.log('Risposta dal server:', uploadResponse.data);

          // Esegui la chiamata API all'endpoint EC2
          // Assicurati di avere tutti i dati necessari prima di questa chiamata
          const API_ENDPOINT = 'http://ec2-15-160-94-154.eu-south-1.compute.amazonaws.com:7865/vc_multi';
          const apiResponse = await axios.post(API_ENDPOINT, data, {
            headers: { 'Content-Type': 'application/json' }
          });

          if(apiResponse.status === 200){
            setFileAvailable(true)
          }
          // Gestisci qui la risposta dell'API
        } else {
          console.error('Caricamento del file su Google Drive non riuscito.');
        }
      } catch (error) {
        console.error('Errore:', error);
      } finally {
        setUploading(false);
      } 

      // Gestisci la risposta qui
    } catch (error) {
      console.error('Errore:', error);
      setUploading(false);
    }
  };

  const downloadFile = async () => {
    try {
        let folderId = extractFolderIdFromUrl(driveFolderDest)
        const response = await axios({
            url: `http://15.160.123.219:5000/download/${folderId}`,
            method: 'GET',
            responseType: 'blob', // Importante per gestire la risposta come file
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.wav'); // Modifica il nome del file come necessario
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Errore nel download:', error);
    }
};


  // Resto del componente JSX...

  return (
    <Container maxWidth="md" style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px', paddingTop: "50px", paddingBottom: "50px" }}>
      <Typography variant="h4" gutterBottom color="primary" style={{ textAlign: 'center' }}>
        Genera Clip Vocali
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>

          <div>
            {/* Sezione di caricamento */}
            <Typography variant="subtitle1" style={{ color: '#fff', marginBottom: '8px' }}>
              Carica File WAV
            </Typography>
            <FormControl fullWidth variant="outlined" margin="dense">
              <OutlinedInput
                id="file-input"
                type="file"
                onChange={handleFileChange}
                style={{
                  color: '#fff',
                  backgroundColor: '#333',
                  marginBottom: '20px',
                }}
              />
            </FormControl>

            {/* Sezione di download, visualizzata solo se c'è un URL per il file */}
            {true && (
              <div style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#333',
                padding: '10px',
                borderRadius: '4px'
              }}>
                <Typography variant="subtitle1" style={{ color: '#fff', marginRight: '8px' }}>
                  Pronto per il download:
                </Typography>
                <Typography variant="body2" style={{ color: '#fff', flexGrow: 1, marginRight: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {fileData.name && <div>{fileData.name}</div>}
                </Typography>
                <IconButton
                  onClick={handleDownload}
                  style={{ color: '#4caf50' }}
                >
                  <CloudDownload />
                </IconButton>
              </div>
            )}
          </div>
        </Grid>

        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth margin="dense">
            <InputLabel htmlFor="numeric-input" style={{ color: 'grey' }}>Numeric Input</InputLabel>
            <OutlinedInput
              id="numeric-input"
              type="text" // Cambiato da 'number' a 'text' per evitare le freccette native
              value={numericInput}
              onChange={(e) => setNumericInput(e.target.value)}
              label="Numeric Input"
              inputProps={{ min: -12, max: 12 }}
              style={inputStyle}

              endAdornment={
                <div className='d-flex flex-row g-5'>
                  <InputAdornment position="start">
                    <IconButton onClick={handleDecrement} aria-label="decrement value">
                      <RemoveIcon style={{ color: 'grey' }} />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton onClick={handleIncrement} aria-label="increment value">
                      <AddIcon style={{ color: 'grey' }} />
                    </IconButton>
                  </InputAdornment>
                </div>
              }
              sx={{
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0275d8', // Colore dell'hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Colore quando è focused
                },
              }}
            />
          </FormControl>
        </Grid>


        {sliderSettings.map((setting, index) => (
          <Grid item xs={12} key={index}>
            <Card style={{ background: '#333', color: '#fff', marginBottom: '20px' }}>
              <CardContent>
                <Typography gutterBottom>
                  <IconButton color="primary">
                    {index === 0 && <GraphicEq />}
                    {index === 1 && <VolumeUp />}
                    {index === 2 && <Hearing />}
                    {index === 3 && <Tune />}
                    {index === 4 && <FilterVintage />}
                  </IconButton>
                  {setting.label}
                </Typography>
                <Typography variant="body2" style={{ color: 'grey' }}>
                  Valore: {sliderValues[index]}
                </Typography>
                <Typography variant="body2" style={{ color: 'grey' }}>
                  {setting.description}
                </Typography>
                <Slider
                  value={sliderValues[index]}
                  onChange={handleSliderChange(index)}
                  aria-labelledby={`slider-value-${index}`}
                  min={setting.min}
                  max={setting.max}
                  step={setting.step}
                  style={{ color: '#1976d2', height: '8px', }}
                  thumb={{ color: '#2196f3' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={uploading}>
            {uploading ? <CircularProgress size={24} /> : 'Invia'}
          </Button>
          {true && (
            <Button variant="contained" color="secondary" onClick={downloadFile} disabled={!fileAvailable}>
              Scarica File
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default VoiceManagement;
