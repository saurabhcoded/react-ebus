import eventBus from "./eventBus";
import React from "react";

export type RegisterEventType = {
  [key: string]: string;
};

export type EventHandler = (...args: any[]) => void;

export interface UseEventListenerConfig {
  allowedAllEvents?: boolean;
}

export interface EventProviderProps {
  children: React.ReactNode;
  registerEvents?: RegisterEventType;
  allowAllEvents?: boolean;
}

export interface EventProviderRef {
  eventBus: typeof eventBus;
  eventList: RegisterEventType;
  setEventList: React.Dispatch<React.SetStateAction<RegisterEventType>>;
  allowedAllEvents: boolean;
  setAllowAllEvents: React.Dispatch<React.SetStateAction<boolean>>;
}
