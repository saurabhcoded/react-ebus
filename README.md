# `@saurabhcoded/react-eventbus`

A lightweight and flexible event bus for React, designed to simplify inter-component communication using event-driven architecture.

[![npm](https://img.shields.io/npm/v/@saurabhcoded/react-eventbus)](https://www.npmjs.com/package/@saurabhcoded/react-eventbus)  
[![GitHub stars](https://img.shields.io/github/stars/saurabhcoded/react-eventbus?style=social)](https://github.com/saurabhcoded/react-eventbus)  

---

## 🚀 Features

✅ Easy to integrate with any React project  
✅ TypeScript support out of the box  
✅ Supports both global and scoped events  
✅ Handles dynamic event registration and cleanup  
✅ Clean API for emitting and listening to events  
✅ Fully compatible with React 19
---

## 📦 Installation

Install the package using npm:

```bash
npm install @saurabhcoded/react-eventbus
```

or with yarn:

```bash
yarn add @saurabhcoded/react-eventbus
```

---

## 🔥 Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-afr23cxp?embed=1&file=src%2Fdemo%2FDemo1%2FListenerComp.tsx&view=preview)


---

## 🔨 Usage

### 1. **Setup EventProvider**

Wrap your app with the `EventProvider` to initialize the event bus:

```tsx
import React from "react";
import { EventProvider } from "@saurabhcoded/react-eventbus";

const App = () => {
  return (
    <EventProvider
      registerEvents={{
        userlogin: "user:login",
        userlogout: "user:logout",
      }}
      allowAllEvents={false}
    >
      {/* If `allowAllEvents` is false, only registered events will be allowed */}
      <YourComponent />
    </EventProvider>
  );
};

export default App;
```

---

### 2. **Emit Events using `useEventEmitter`**

Use the `useEventEmitter` hook to emit events from any component.

```tsx
import { useEventEmitter } from "@saurabhcoded/react-eventbus";

const YourComponent = () => {
  const { emit, eventList } = useEventEmitter();

  const handleLogin = () => {
    emit("user:login", { id: 1, name: "John Doe" }); // Emit directly by event name
  };

  const handleLoginWithRegisteredEvent = () => {
    emit(eventList.userlogin, { id: 1, name: "John Doe" }); // Emit using registered events to avoid typos
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLoginWithRegisteredEvent}>
        Login with Registered Event
      </button>
    </div>
  );
};
```

---

### 3. **Listen to Events using `useEventListener`**

Use the `useEventListener` hook to listen for events.

```tsx
import { useEventListener } from "@saurabhcoded/react-eventbus";

const YourComponent = () => {
  const { unregister, unregisterAll } = useEventListener(
    {
      "user:login": (data) => {
        console.log("User logged in:", data);
      },
      "user:logout": () => {
        console.log("User logged out");
      },
    },
    { allowedAllEvents: false }
  );

  return (
    <div>
      <p>Listening for login and logout events...</p>
      <button onClick={() => unregister("user:login")}>
        Unregister Login Event
      </button>
      <button onClick={unregisterAll}>Unregister All Events</button>
    </div>
  );
};
```

---

## 🛠️ Props

### **EventProvider Props**

| Prop               | Type                    | Required | Description                                     |
| ------------------ | ----------------------- | -------- | ----------------------------------------------- |
| `registerEvents`   | `{[key:string]:string}` | ❌       | List of allowed event names.                    |
| `allowAllEvents`   | `boolean`               | ❌       | If `false`, only registered events are allowed. |

---

### **useEventEmitter Props**

| Prop               | Type                                           | Description                                         |
| ------------------ | ---------------------------------------------- | --------------------------------------------------- |
| `emit`             | `(eventName: string, payload?: any) => void`   | Function to emit an event with an optional payload. |
| `eventList`         | `{[key: string]: string}`                     | List of registered events.                          |
| `isEventAllowed`    | `(eventName: string) => boolean`              | Function to check if an event is allowed.           |

---

### **useEventListener Props**

| Prop             | Type                              | Required | Description                                            |
| ---------------- | --------------------------------- | -------- | ------------------------------------------------------ |
| `eventListeners` | `Record<string, EventHandler>`    | ✅       | Object mapping event names to handler functions.       |
| `configuration`  | `Partial<UseEventListenerConfig>` | ❌       | Configuration object for allowing unregistered events. |

---

### **EmitConfig Props** (Optional)

| Prop               | Type      | Description                                        |
| ------------------ | --------- | -------------------------------------------------- |
| `allowedAllEvents`  | `boolean` | If `true`, allows emitting events even if unregistered. |

---

## 🎯 Example

### Combined Example with Emit and Listener:

```tsx
import React from "react";
import {
  EventProvider,
  useEventEmitter,
  useEventListener,
} from "@saurabhcoded/react-eventbus";

const App = () => (
  <EventProvider
    registerEvents={{ customEvent: "custom:event" }}
    allowAllEvents={false}
  >
    <ComponentA />
    <ComponentB />
  </EventProvider>
);

const ComponentA = () => {
  const { emit } = useEventEmitter();

  return (
    <button onClick={() => emit("custom:event", { message: "Hello from A!" })}>
      Emit Event
    </button>
  );
};

const ComponentB = () => {
  useEventListener({
    "custom:event": (data) => {
      console.log("Event received:", data);
    },
  });

  return <div>Listening for events...</div>;
};
```

---

## 📜 TypeScript Support

Types are included out of the box:

```ts
export type EventHandler = (...args: any[]) => void;

export interface UseEventListenerConfig {
  allowedAllEvents?: boolean;
}
```

---

## 🚧 Development

### Run TypeScript Check:

```bash
npm run type-check
```

### Build the Package:

```bash
npm run build
```

### Publish to npm:

```bash
npm publish --access public
```

---

## ✅ Best Practices

✔️ Always define and register events in `EventProvider`.  
✔️ Clean up event listeners to avoid memory leaks.  
✔️ Use TypeScript to ensure type safety.  
✔️ Handle unknown or unregistered events gracefully.  

---

## ⭐ Support the Project

If you like this project, consider giving it a ⭐ on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/saurabhcoded/react-eventbus?style=social)](https://github.com/saurabhcoded/react-eventbus)  

---

## 👨‍💻 Author

Created by [Saurabh](https://github.com/saurabhcoded)

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

### 🔥 **Changes Made:**

✅ Updated with `useEventEmitter` and `useEventListener` changes.  
✅ Improved formatting for better readability.  
✅ Added demo link and GitHub star button.  
✅ Fixed consistency across examples.  