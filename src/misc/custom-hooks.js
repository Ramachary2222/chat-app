import { useCallback, useEffect, useState } from "react";


export function useModalState(defaultvalue = false) {

    const [IsOpen, setIsOPen] = useState(defaultvalue);

    const open = useCallback(() => setIsOPen(true), []);
    const close = useCallback(() => setIsOPen(false), []);

    return { IsOpen, open, close }
}

export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    );

    useEffect(() => {
        const queryList = window.matchMedia(query);
        setMatches(queryList.matches);

        const listener = evt => setMatches(evt.matches);

        queryList.addEventListener('change', listener);
        return () => queryList.removeEventListener(listener);
    }, [query]);

    return matches;
};
