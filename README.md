# `@saurabhcoded/react-eventbus`

A lightweight and flexible event bus for React, designed to simplify inter-component communication using event-driven architecture.

## 🚀 Features
✅ Easy to integrate with any React project  
✅ TypeScript support out of the box  
✅ Supports both global and scoped events  
✅ Handles dynamic event registration and cleanup  
✅ Clean API for emitting and listening to events  

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

## 🔨 Usage

### 1. **Setup EventProvider**  
Wrap your app with the `EventProvider` to initialize the event bus.

```tsx
import React from "react";
import { EventProvider } from "@saurabhcoded/react-eventbus";

const App = () => {
  return (
    <EventProvider
      registerEvents={["user:login", "user:logout"]}
      allowRegisteredOnly={true}
    >
      <YourComponent />
    </EventProvider>
  );
};

export default App;
```

---

### 2. **Listen to Events**  
Use the `useEventBus` hook to listen for events.

```tsx
import { useEventBus } from "@saurabhcoded/react-eventbus";

const YourComponent = () => {
  const { emit } = useEventBus({
    "user:login": (user) => {
      console.log("User logged in:", user);
    },
  });

  return (
    <button onClick={() => emit("user:login", { id: 1, name: "John Doe" })}>
      Login
    </button>
  );
};
```

---

### 3. **Emit Events**  
You can emit events from any component using `emit`.

```tsx
const handleLogout = () => {
  emit("user:logout");
};
```

---

## 🛠️ Props
### **EventProvider Props**
| Prop               | Type                | Required | Description                                                                 |
|--------------------|---------------------|----------|-----------------------------------------------------------------------------|
| `registerEvents`   | `string[]`           | ❌        | List of allowed event names.                                                |
| `allowRegisteredOnly` | `boolean`         | ❌        | If `true`, only registered events are allowed.                              |

---

### **useEventBus Props**
| Prop               | Type                | Required | Description                                                                 |
|--------------------|---------------------|----------|-----------------------------------------------------------------------------|
| `eventListeners`   | `{ [key: string]: (...args: any[]) => void }` | ✅ | Object mapping event names to handler functions.                            |

---

## 🎯 Example
```tsx
import React from "react";
import { EventProvider, useEventBus } from "@saurabhcoded/react-eventbus";

const App = () => (
  <EventProvider registerEvents={["custom:event"]} allowRegisteredOnly={true}>
    <ComponentA />
    <ComponentB />
  </EventProvider>
);

const ComponentA = () => {
  const { emit } = useEventBus({});
  return (
    <button onClick={() => emit("custom:event", { message: "Hello from A!" })}>
      Emit Event
    </button>
  );
};

const ComponentB = () => {
  useEventBus({
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
export type RegisterEventType = string;
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
- Always define and register events in `EventProvider`.  
- Clean up event listeners to avoid memory leaks.  
- Use TypeScript to ensure type safety.  

---

## 👨‍💻 Author
Created by [Saurabh](https://github.com/saurabhcoded)  

---

## 📄 License
This project is licensed under the [MIT License](./LICENSE).