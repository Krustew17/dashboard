import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import requester from "../../common/requester";
import apiEndPoints from "../../config/apiEndpoints";

const useRouteChange = () => {
    const hasRequested = useRef(false);
    const location = useLocation();

    useEffect(() => {
        const trackRouteChange = async () => {
            if (hasRequested.current) return;
            try {
                await requester(
                    apiEndPoints.logs.track.url,
                    {
                        method: apiEndPoints.logs.track.method,
                        body: {
                            path: location.pathname,
                        },
                    },
                    true
                );

                // Mark that the request has been made
                hasRequested.current = true;
            } catch (error) {
                console.error("Error tracking route change:", error);
            }
        };

        const timeout = setTimeout(() => {
            trackRouteChange();
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, [location]);
};

export default useRouteChange;
