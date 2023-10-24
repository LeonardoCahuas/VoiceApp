import React, { useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, Divider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';


function Authentication() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Aggiunto per gestire gli errori
    const navigate = useNavigate();


    const registerUser = async () => {
        try {
            await axios.post('http://localhost:5000/users', { name, password });
            alert('User registered successfully');
        } catch (error) {
            setError('Error registering user');
        }
    };

    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { name, password });
            console.log(response.data.success)
            if(response.data && response.data.success) { // Verifica che "success" sia true
                navigate("/dashboard")// Reindirizza l'utente a /dashboard
            } else {
                setError(response.data.message || 'Incorrect name or password'); // Usa il messaggio di errore inviato dal server, se disponibile
            }
        } catch (error) {
            setError('Error logging in');
        }
    };
    

    return (
        <Container style={{
            background: '#282c34',
            color: 'white',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }} maxWidth={false}>
            <div style={{ width: '80%', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center' }}>
                    {isLogin ? <LockOutlinedIcon style={{ fontSize: 60, color: '#FFC107' }} /> : <PersonAddIcon style={{ fontSize: 60, color: '#9C27B0' }} />}
                    <Typography variant="h4" gutterBottom style={{ color: 'white', marginTop: '20px' }}>
                        {isLogin ? "Login" : "Registrazione"}
                    </Typography>
                </div>
                <TextField
                    label="Username"
                    variant="filled"
                    fullWidth
                    margin="dense"
                    style={{ backgroundColor: 'white' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    fullWidth
                    margin="dense"
                    style={{ backgroundColor: 'white', marginBottom: '20px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth style={{ marginBottom: '20px' }}
                        onClick={isLogin ? loginUser : registerUser}>
                    {isLogin ? "Accedi" : "Registrati"}
                </Button>
                {/* Mostro l'errore se presente */}
                {error && <Typography variant="body2" style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</Typography>}
                <Divider style={{ marginBottom: '20px' }} />
                {isLogin ?
                    <Typography variant="body2" style={{ color: 'white', textAlign: 'center' }}>
                        Non hai un account? <span onClick={() => setIsLogin(false)} style={{ color: '#9C27B0', cursor: 'pointer' }}>Registrati ora</span>
                    </Typography>
                    :
                    <Typography variant="body2" style={{ color: 'white', textAlign: 'center' }}>
                        Hai già un account? <span onClick={() => setIsLogin(true)} style={{ color: '#FFC107', cursor: 'pointer' }}>Accedi</span>
                    </Typography>
                }
            </div>
        </Container>
    );
}

export default Authentication;
