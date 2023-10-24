import Clips from "../Clips";
import Authentication from "../Authentication";
import Recordings from "../Recordings";
import Style from "../Style";
import VoiceManagement from "../VoiceManagment";

const pages = {
    "voci" : <VoiceManagement/>,
    "registrazioni": <Recordings/>,
    "clips": <Clips/>,
    "styles": <Style/>,
    "authentication": <Authentication/>
}

export default pages