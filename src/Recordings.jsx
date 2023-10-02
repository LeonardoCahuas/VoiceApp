import { Resemble } from '@resemble/node';
import { useState } from 'react';

function Recordings() {
    const [res, setRes] = useState("");

    const createRecording = async (e) => {
        e.preventDefault();
        Resemble.setApiKey('ZB2sl0yNUs9NA5rHM2oORAtt');

        // Ottieni il file dall'input file
        const fileInput = document.getElementById('uploadRecording');
        console.log(fileInput)
        const file = fileInput.files[0];
        console.log(file.type)

        if (!file) {
            console.error('Nessun file selezionato');
            return;
        }
        console.log(file)
        try {
            const response = await Resemble.v2.recordings.create("uuisocj", {
                emotion: 'happy',
                is_active: true,
                name: 'happy_sample',
                text: 'Hey, this is a happy sample!',
            }, file, file.size);

            // Check if the response has a 'success' property and it's false
            if (response && response.success === false) {
                console.error("API Error Message:", response.message);
                setRes(response.message);
            } else {
                console.log("API Response:", response);
                setRes(response);
            }
        } catch (e) {
            console.error("Error during recording creation:", e.message);
            setRes("An error occurred during recording creation.");
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
