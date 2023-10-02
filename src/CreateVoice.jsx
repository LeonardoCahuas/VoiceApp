import axios from 'axios';
import fs from 'fs/promises';

function CreateVoice() {

    const creaVoice = async (event) => {
        event.preventDefault();
        console.log(e)
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
                    <h1 className="mt-4">Crea Nuova Voce</h1>
                    {/* Form per la creazione di nuove voci con sovrapposizione di registrazioni */}
                    <form>
                        {/* <div className="form-group">
                            <label htmlFor="newVoiceMood">Mood della Voce:</label>
                            <select className="form-control" id="newVoiceMood" name="newVoiceMood">
                                <option value="happy">Felice</option>
                                <option value="sad">Triste</option>
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="overlayRecording">Sovrapponi Registrazione:</label>
                            <input type="file" className="form-control-file" id="uploadRecordin" name="overlayRecording" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="selectVoice">Seleziona Voce:</label>
                            <select className="form-control" id="selectVoice" name="selectVoice">
                            </select>
                        </div> */}
                        <button type="submit" onClick={creaVoice} className="btn btn-primary">Crea Voce</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default CreateVoice