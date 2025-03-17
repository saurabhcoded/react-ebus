import eventBus from "./eventBus";
import React from "react";

export type RegisterEventType = {
  [key: string]: string;
};

export type EventHandler = (...args: any[]) => void;

export interface UseEventBusConfig {
  eventListeners?: Record<string, EventHandler>;
  configuration?: Record<string, any>;
}

export interface EventProviderProps {
  children: React.ReactNode;
  registerEvents?: RegisterEventType[];
  allowRegisteredOnly?: boolean;
}

export interface EventProviderRef {
  eventBus: typeof eventBus;
  eventList: RegisterEventType[];
  setEventList: React.Dispatch<React.SetStateAction<RegisterEventType[]>>;
  allowedAllEvents: boolean;
  setAllowAllEvents: React.Dispatch<React.SetStateAction<boolean>>;
}
