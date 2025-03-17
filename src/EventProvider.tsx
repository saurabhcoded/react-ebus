import React, { useState, useImperativeHandle } from "react";
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
>(({ children, registerEvents = [], allowRegisteredOnly = false }, ref) => {
  const [allowedAllEvents, setAllowAllEvents] =
    useState<boolean>(allowRegisteredOnly);
  const [registeredEvents, setRegisteredEvents] =
    useState<RegisterEventType[]>(registerEvents);

  const contextValues = {
    eventBus,
    eventList: registeredEvents,
    allowedAllEvents,
  };

  useImperativeHandle(
    ref,
    () => ({
      eventBus,
      eventList: registeredEvents,
      setEventList: setRegisteredEvents,
      allowedAllEvents,
      setAllowAllEvents,
    }),
    [registeredEvents, allowedAllEvents]
  );

  return (
    <EventContext.Provider value={contextValues}>
      {children}
    </EventContext.Provider>
  );
});
