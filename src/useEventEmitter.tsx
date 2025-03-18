import React from "react";
import { EventContext } from "./EventProvider";

interface EmitConfig {
  allowedAllEvents?: boolean;
}

export const useEventEmitter = () => {
  const { eventBus, eventList, isEventAllowed, allowedAllEvents } =
    React.useContext(EventContext);
  const handleEmitEvent = (
    eventName: string,
    event: any,
    config?: EmitConfig
  ) => {
    const isAllowedAllEvents = config?.allowedAllEvents ?? allowedAllEvents;

    if (!isEventAllowed(eventName) && !isAllowedAllEvents) {
      console.error(
        new Error(
          `Event is not registered. Either add eventName: [${eventName}] in the registeredEvents or set allowedAllEvents to true.`
        )
      );
      return;
    }

    return eventBus.emit(eventName, event);
  };

  return { emit: handleEmitEvent, eventList, isEventAllowed };
};