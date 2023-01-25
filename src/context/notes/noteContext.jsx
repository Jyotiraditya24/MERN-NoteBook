import { createContext } from "react";

export const NoteContext = createContext();

const NoteContextProvider = (props)=>{
    <NoteContext.Provider value>
        {props.children}
    </NoteContext.Provider>
}

export default NoteContextProvider;