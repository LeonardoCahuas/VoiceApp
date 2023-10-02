import { Resemble } from '@resemble/node';
import { useState } from 'react';
import axios from 'axios';

function Recordings() {
    const [res, setRes] = useState("");

    const createRecording = async (event) => {
        event.preventDefault();
        const name = 'Prova1';
        const apiKey = 'ZB2sl0yNUs9NA5rHM2oORAtt';

        try {
            const fileInput = document.getElementById('uploadRecording');
            console.log(fileInput)
            const file = fileInput.files[0];
            // Verifica che il file WAV di consenso esista
            
            console.log(apiKey)
            // Crea una voce su Resemble utilizzando l'endpoint corretto
            const response = await axios.post('https://app.resemble.ai/api/v2/voices', {
                name,
                consent: file,// Se vuoto, puoi ometterlo
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Voce creata su Resemble:', response.data);
            } else {
                throw new Error('Errore durante la creazione della voce su Resemble.');
            }
        } catch (error) {
            console.error(error);
        }


    }

    return (
        <section className="container col-6">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mt-4">Recording</h1>
                    <ul className="list-group">
                        <li className="list-group-item">Registrazione 1 <span className="float-right"><a href="#">Modifica</a> | <a href="#">Elimina</a></span></li>
                        <li className="list-group-item">Registrazione 2 <span className="float-right"><a href="#">Modifica</a> | <a href="#">Elimina</a></span></li>
                    </ul>
                    <h2 className="mt-4">Registra Nuova Clip Vocale</h2>
                    {
                        res && <p></p>
                    }
                    <form>
                        <div className="form-group">
                            <label htmlFor="recordingText">Testo:</label>
                            <input type="text" className="form-control" id="recordingText" name="recordingText" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="uploadRecording">Carica Registrazione:</label>
                            <input type="file" className="form-control-file" id="uploadRecording" name="uploadRecording" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={createRecording}>Carica registrazione</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Recordings;
