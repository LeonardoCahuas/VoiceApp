import Clips from "../Clips";
import Recordings from "../Recordings";
import Style from "../Style";
import VoiceManagement from "../VoiceManagment";

const pages = {
    "voci" : <VoiceManagement/>,
    "registrazioni": <Recordings/>,
    "clips": <Clips/>,
    "styles": <Style/>
}

export default pages