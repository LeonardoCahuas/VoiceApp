import React, { useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, Divider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice"
import { setToken } from './redux/tokenSlice';
import { setIndex } from './redux/indexSlice';


function Authentication() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Aggiunto per gestire gli errori
    const navigate = useNavigate();
    const dispatch = useDispatch()



    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { name, password });
            console.log(response.data.index)
            dispatch(setIndex(response.data.index))
            console.log(name)
            console.log(password)
            if (response.data && response.data.success) { // Verifica che "success" sia true
                console.log(response.data.userId)
                const uuid = response.data.userId; // Estrai l'ID dell'utente dalla risposta
                dispatch(setUser(uuid))
                const token = response.data.token; // Estrai il token dalla risposta
                console.log(token);  // Stampa il token nel console
                dispatch(setToken(token))
                /* const token1 = useSelector(state => state.token.token); 
                console.log(token1) */
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
                    onClick={ loginUser}>
                    { "Accedi" }
                </Button>
                {/* Mostro l'errore se presente */}
                {error && <Typography variant="body2" style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</Typography>}
                <Divider style={{ marginBottom: '20px' }} />
                
            </div>
        </Container>
    );
}

export default Authentication;
