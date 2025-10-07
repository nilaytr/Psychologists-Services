import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { setPsychologists } from "./slice";

export const fetchPsychologists = () => (dispatch) => {
    const unsubscribe = onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        
        if (!data) {
            dispatch(setPsychologists([]));
            return;
        }
        
        const psychologistsWithId = Object.values(data).map((psychologist, index) => ({
            id: index,
            ...psychologist,
        }));
        
        dispatch(setPsychologists(psychologistsWithId));
    });
    
    return () => {
        unsubscribe(); 
    }     
};