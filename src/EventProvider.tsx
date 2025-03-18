import React, { useImperativeHandle, useState } from "react";
import eventBus from "./eventBus";
import {
  EventProviderProps,
  EventProviderRef,
  RegisterEventType,
} from "./types";

export const EventContext = React.createContext<EventProviderRef | null>(null);

export const EventProvider = React.forwardRef<
  EventProviderRef,
  EventProviderProps
>(({ children, registerEvents = [], allowAllEvents = true }, ref) => {
  const [allowedAllEvents, setAllowAllEvents] =
    useState<boolean>(allowAllEvents);
  const [registeredEvents, setRegisteredEvents] =
    useState<RegisterEventType>(registerEvents);

  const isEventAllowed = (eventName: string) => {
    try {
      let allowedEvents = Object.values(registeredEvents);
      return allowedEvents.includes(eventName);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const contextValues = {
    eventBus,
    eventList: registeredEvents,
    isEventAllowed,
    allowedAllEvents,
  };

  useImperativeHandle(
    ref,
    () => ({
      eventBus,
      eventList: registeredEvents,
      setEventList: setRegisteredEvents,
      isEventAllowed,
      allowedAllEvents,
      setAllowAllEvents,
    }),
    [registeredEvents, allowedAllEvents, isEventAllowed]
  );

  return (
    <EventContext.Provider value={contextValues}>
      {children}
    </EventContext.Provider>
  );
});
