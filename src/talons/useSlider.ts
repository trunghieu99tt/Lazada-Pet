import { useState, useCallback } from "react";

export const useSlider = () => {
    const [dragging, setDragging] = useState(false);

    const handleBeforeChange = useCallback(() => {
        setDragging(true);
    }, [setDragging]);

    const handleAfterChange = useCallback(() => {
        setDragging(false);
    }, [setDragging]);

    const handleOnItemClick = useCallback(
        (e) => {
            if (dragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        [dragging]
    );

    return {
        handleBeforeChange,
        handleAfterChange,
        handleOnItemClick,
    };
};
