import { useCallback, useContext, useEffect, useMemo } from "react";
import { EventContext } from "./EventProvider";
import { EventHandler, UseEventListenerConfig } from "./types";

export const useEventListener = (
  eventListeners: Record<string, EventHandler>,
  configuration?: UseEventListenerConfig
) => {
  const { eventBus, eventList, isEventAllowed, allowedAllEvents } =
    useContext(EventContext);

  const isAllowedAllEvents = useMemo(
    () => configuration?.allowedAllEvents ?? allowedAllEvents,
    [configuration, allowedAllEvents]
  );

  useEffect(() => {
    const handlers: [string, EventHandler][] = [];

    for (const eventName in eventListeners) {
      if (!isAllowedAllEvents && !isEventAllowed(eventName)) {
        console.error(
          `🚨 Event "${eventName}" is not registered. ➡️ To fix this, either:  
            - Add "${eventName}" to registered events in EventProvider.  
            - Or set "allowedAllEvents" to true.`
        );
        continue;
      }

      const memoizedHandler: EventHandler = (...args) =>
        eventListeners[eventName](...args);

      eventBus.on(eventName, memoizedHandler);
      handlers.push([eventName, memoizedHandler]);
    }

    // Cleanup on unmount
    return () => {
      handlers.forEach(([eventName, handler]) => {
        eventBus.off(eventName, handler);
      });
    };
  }, [eventListeners, eventBus, eventList, isAllowedAllEvents, isEventAllowed]);

  // Unregister all handlers
  const unregisterAll = useCallback(() => {
    Object.keys(eventListeners).forEach((eventName) => {
      eventBus.off(eventName, eventListeners[eventName]);
    });
  }, [eventBus, eventListeners]);

  // Unregister specific handler
  const unregister = useCallback(
    (removeEventName: string) => {
      if (eventListeners[removeEventName]) {
        eventBus.off(removeEventName, eventListeners[removeEventName]);
      }
    },
    [eventBus, eventListeners]
  );

  return { eventBus, unregisterAll, unregister };
};
