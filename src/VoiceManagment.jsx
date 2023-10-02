function VoiceManagement() {
    return (
        <section className="container col-6">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mt-4">Gestione delle Voci</h1>
                    {/* Lista delle voci con opzioni di modifica ed eliminazione */}
                    <ul className="list-group">
                        <li className="list-group-item">Voce 1 <span className="float-right"><a href="#">Modifica</a> | <a href="#">Elimina</a></span></li>
                        <li className="list-group-item">Voce 2 <span className="float-right"><a href="#">Modifica</a> | <a href="#">Elimina</a></span></li>
                        {/* Aggiungi altre voci qui */}
                    </ul>
                    {/* Form per la creazione di nuove voci */}
                    <h2 className="mt-4">Crea Nuova Voce</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="voiceName">Nome Voce:</label>
                            <input type="text" className="form-control" id="voiceName" name="voiceName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="uploadClip">Carica Clip:</label>
                            <input type="file" className="form-control-file" id="uploadClip" name="uploadClip" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mood">Mood:</label>
                            <select className="form-control" id="mood" name="mood">
                                <option value="happy">Felice</option>
                                <option value="sad">Triste</option>
                                {/* Aggiungi altri moods qui */}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Crea Voce</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default VoiceManagement