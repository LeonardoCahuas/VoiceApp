import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, Card,CardContent,IconButton, Slider, Button, Typography } from '@mui/material';
import axios from 'axios'
import { CloudUpload, CloudDownload, SettingsInputComponent, VolumeUp, GraphicEq, Hearing, Tune, FilterVintage } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';

function VoiceManagement() {
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

  const [urlOne, setUrlOne] = useState('');
  const [urlTwo, setUrlTwo] = useState('');
  const [numericInput, setNumericInput] = useState(0);
  const [sliderValues, setSliderValues] = useState(sliderSettings.map(s => s.defaultValue));
  let index = useSelector(state => state.index.value)


  const handleSliderChange = (index) => (event, newValue) => {
    let newSliderValues = [...sliderValues];
    newSliderValues[index] = newValue;
    setSliderValues(newSliderValues);
  };

  

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

  const handleIncrement = () => {
    setNumericInput((prev) => Math.min(prev + 1, 12)); // Assicurati di non superare il valore massimo
  };

  const handleDecrement = () => {
    setNumericInput((prev) => Math.max(prev - 1, -12)); // Assicurati di non andare sotto il valore minimo
  };

  const handleSubmit = async () => {
    const data = {
      sid: 0, // Valore statico, sostituire con il valore reale
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
  };

  

  const sliderTrackStyle = {
    color: '#1976d2', // Colore della traccia dello slider
    height: '8px',
  };

  const sliderThumbStyle = {
    color: '#2196f3', // Colore del pollice dello slider
  };

  const useStyles = makeStyles(theme => ({
    root: {
      '&:hover $notchedOutline': {
        borderColor: 'color-desiderato', // Sostituisci con il colore desiderato per l'hover
      },
      '&$focused $notchedOutline': {
        borderColor: 'color-desiderato', // Sostituisci con il colore desiderato per lo stato focused
        borderWidth: '1px', // Opzionale: cambia lo spessore del bordo se necessario
      },
    },
    focused: {},
    notchedOutline: {},
  }));




  return (
    <Container maxWidth="md" style={{ background: '#282c34', color: 'white', padding: '2em', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom color="primary" style={{  textAlign: 'center' }}>
        Genera Clip Vocali
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth margin="dense" style={{ marginBottom: '10px' }}>
            <InputLabel htmlFor="url-one" style={{ color: 'grey' }}>URL cartella di origine</InputLabel>
            <OutlinedInput
              id="url-one"
              value={urlOne}
              onChange={(e) => setUrlOne(e.target.value)}
              label="URL cartella di origine"
              style={inputStyle}
              sx={{
                // Stili personalizzati qui
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0275d8', // Sostituisci con il colore desiderato
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Sostituisci con il colore desiderato
                },
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth margin="dense" style={{ marginBottom: '10px' }}>
            <InputLabel htmlFor="url-two" style={{ color: 'grey' }}>URL cartella di destinazione</InputLabel>
            <OutlinedInput
              id="url-two"
              value={urlTwo}
              onChange={(e) => setUrlTwo(e.target.value)}
              label="URL cartella di destinazione"
              style={inputStyle}
              sx={{
                // Stili personalizzati qui
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0275d8', // Sostituisci con il colore desiderato
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white', // Sostituisci con il colore desiderato
                },
              }}
            />
          </FormControl>
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
                  style={{ color: '#1976d2' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmit}>
        Invia
      </Button>
    </Container>
  );
}

export default VoiceManagement;
