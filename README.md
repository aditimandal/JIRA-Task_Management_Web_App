# JIRA-Style Task Management Web App: Project Insight

## Overview
This is a simple JIRA-style task management web application. It allows users to:
- Add tasks with a priority color
- Edit tasks (lock/unlock)
- Change the priority color of a task
- Delete tasks
- Filter tasks by color
- Persist tasks in localStorage

The app is built using vanilla JavaScript (modularized), HTML, and CSS. No frameworks or build tools are required.

---

## Main Components & Their Responsibilities

### 1. `index.html`
- The main HTML structure for the app.
- Contains:
  - Header with add button
  - Modal for adding tasks and selecting priority
  - Ticket container
  - Toolbox for filtering and deleting
- Loads the main JS modules and the `short-unique-id` library via CDN.

### 2. `styles.css`
- Handles all styling for the app, including layout, modal, tickets, and color themes.

### 3. `app.js` (Main Application Logic)
- **Class: `App`**
  - Coordinates the entire app.
  - Instantiates `TicketManager` and `UIManager`.
  - Handles event listeners for UI actions (add, delete, filter, color selection, etc).
  - Manages the flow for creating, editing, and deleting tickets.
- **Key Methods:**
  - `initializeApp()`: Loads tickets from localStorage and sets up event listeners.
  - `setupEventListeners()`: Wires up all UI events (add, color select, enter key, delete, filter).
  - `createTicket(color, task, id)`: Creates a ticket in the DOM and data model.
  - `setupTicketEventListeners(ticketElement, id)`: Handles ticket-specific events (delete, lock/unlock, color change).

### 4. `uiManager.js` (UI/DOM Management)
- **Class: `UIManager`**
  - Handles all DOM queries and UI state.
  - Manages modal open/close, color selection, and ticket rendering.
- **Key Methods:**
  - `openModal()`, `closeModal()`: Show/hide the modal.
  - `setPriorityColor(color)`: Highlights the selected color and stores it for the next ticket.
  - `createTicketElement(color, task, id)`: Returns a DOM element for a ticket.
  - `appendTicket(ticketElement)`: Adds a ticket to the DOM.
  - `clearMainContainer()`: Removes all tickets from the DOM.
  - `getTaskAreaValue()`, `clearTaskArea()`: Get/clear modal textarea value.

### 5. `ticketManager.js` (Ticket Data & Persistence)
- **Class: `TicketManager`**
  - Manages the array of tickets and their persistence in localStorage.
- **Key Methods:**
  - `initializeFromStorage()`: Loads tickets from localStorage.
  - `addTicket(color, task, id)`: Adds a ticket to the array and updates localStorage.
  - `removeTicket(id)`: Removes a ticket from the array and updates localStorage.
  - `updateTicket(id, updates)`: Updates a ticket's task or color and persists the change.
  - `getTicketsByColor(color)`: Returns all tickets of a given color.
  - `getAllTickets()`: Returns all tickets.

---

## App Flow Summary
1. **App loads:**
   - Tickets are loaded from localStorage and rendered.
2. **User clicks +:**
   - Modal opens. User enters a task and selects a priority color.
3. **User presses Enter:**
   - Ticket is created with the selected color and saved to localStorage.
4. **User can:**
   - Edit a ticket (lock/unlock)
   - Change ticket color (cycles through colors)
   - Delete a ticket (enable delete mode, then click ticket)
   - Filter tickets by color (click color in toolbox)
   - Show all tickets (double-click any color in toolbox)
5. **All changes are persisted in localStorage.**

---

## How Each Feature Works
- **Add Ticket:** Modal collects task and color, then creates and saves ticket.
- **Edit Ticket:** Unlock, edit, and re-lock to save changes.
- **Change Color:** Click color bar on ticket to cycle and save.
- **Delete Ticket:** Enable delete mode, click ticket to remove from DOM and storage.
- **Filter:** Click toolbox color to show only tickets of that color.
- **Persistence:** All ticket data is stored in localStorage and loaded on refresh.

---

## Extending the App
- Add due dates, tags, or descriptions to tickets.
- Add user authentication for multi-user support.
- Add drag-and-drop for ticket reordering.
- Add search or advanced filtering.

---

## File Map
- `index.html` — Main HTML
- `styles.css` — Main CSS
- `app.js` — App logic and event wiring
- `uiManager.js` — UI/DOM helpers
- `ticketManager.js` — Data and persistence

---

*This document was generated to help you and others quickly understand the structure and logic of your project.* 
