import { ChangeEvent, useCallback, useState } from "react";


function useGlossaryItemHandler(): {
    onClickGlossaryItem: (item_name: string) => void
    actorOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    actor_value: string
} {
    const [actor_value, setActor] = useState('');

    const onClickGlossaryItem = useCallback((item_name: string) => setActor(item_name), []);
    const actorOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setActor(e.target.value), []);

    return {
        onClickGlossaryItem,
        actorOnChange,
        actor_value
    }
}

export default useGlossaryItemHandler;