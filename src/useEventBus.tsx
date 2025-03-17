import React, { useContext, useEffect } from "react";
import { EventContext } from "./EventProvider";
import { EventHandler, UseEventBusConfig } from "./types";

export const useEventBus = ({
  eventListeners = {},
  configuration = {},
}: UseEventBusConfig) => {
  const { eventBus, eventList, allowedAllEvents } = useContext(EventContext);

  useEffect(() => {
    const handlers: [string, EventHandler][] = [];

    Object.entries(eventListeners).forEach(([eventName, handler]) => {
      if (!allowedAllEvents && !eventList.hasOwnProperty(eventName)) {
        throw new Error(
          `Event is not registered. Either add eventName: [${eventName}] in the registeredEvents or set allowedAllEvents to true.`
        );
      }

      const memoizedHandler = (...args: any[]) => handler(...args);
      eventBus.on(eventName, memoizedHandler);
      handlers.push([eventName, memoizedHandler]);
    });

    // Cleanup on unmount
    return () => {
      handlers.forEach(([eventName, handler]) => {
        eventBus.off(eventName, handler);
      });
    };
  }, [eventListeners, eventBus, eventList, allowedAllEvents]);

  return { emit: eventBus.emit, eventBus };
};
