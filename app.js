import { TicketManager } from './ticketManager.js';
import { UIManager } from './uiManager.js';
const ShortUniqueId = window.ShortUniqueId;

class App {
    constructor() {
        this.ticketManager = new TicketManager();
        this.uiManager = new UIManager();
        this.uid = new ShortUniqueId();
        this.initializeApp();
    }

    initializeApp() {
        // Initialize from storage
        const storedTickets = this.ticketManager.initializeFromStorage();
        storedTickets.forEach(ticket => {
            this.createTicket(ticket.color, ticket.task, ticket.id);
        });

        // Event Listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add button click
        this.uiManager.addBtn.addEventListener("click", () => {
            console.log("Add button clicked");
            this.uiManager.openModal();
        });

        // Priority colors
        const colorList = ['lightPink', 'blue', 'green', 'black'];
        this.uiManager.allPriorityColors.forEach(priorityColor => {
            priorityColor.addEventListener("click", () => {
                const colorClass = colorList.find(cls => priorityColor.classList.contains(cls));
                this.uiManager.setPriorityColor(colorClass);
            });
        });

        // Modal enter key
        this.uiManager.taskAreaCont.addEventListener("keydown", (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const task = this.uiManager.getTaskAreaValue().trim();
                if (task) {
                    this.createTicket(this.uiManager.modalPriorityColor, task);
                    this.uiManager.clearTaskArea();
                    this.uiManager.closeModal();
                    console.log('Creating ticket with color:', this.uiManager.modalPriorityColor);
                }
            }
        });

        // Remove button
        this.uiManager.removeBtn.addEventListener("click", () => {
            this.uiManager.toggleRemoveMode();
        });

        // Toolbox colors
        this.uiManager.toolBoxColors.forEach(color => {
            color.addEventListener("click", () => {
                const currentColor = color.classList[1];
                const filteredTickets = this.ticketManager.getTicketsByColor(currentColor);
                this.uiManager.clearMainContainer();
                filteredTickets.forEach(ticket => {
                    this.createTicket(ticket.color, ticket.task, ticket.id);
                });
            });

            color.addEventListener("dblclick", () => {
                this.uiManager.clearMainContainer();
                this.ticketManager.getAllTickets().forEach(ticket => {
                    this.createTicket(ticket.color, ticket.task, ticket.id);
                });
            });
        });
    }

    createTicket(ticketColor, task, ticketId) {
        const id = ticketId || this.uid.randomUUID();
        const ticketElement = this.uiManager.createTicketElement(ticketColor, task, id);
        
        // Add ticket to manager if it's new
        if (!ticketId) {
            this.ticketManager.addTicket(ticketColor, task, id);
        }

        // Setup ticket event listeners
        this.setupTicketEventListeners(ticketElement, id);

        this.uiManager.appendTicket(ticketElement);
    }

    setupTicketEventListeners(ticketElement, id) {
        // Delete handler
        ticketElement.addEventListener("click", () => {
            if (this.uiManager.removeFlag) {
                ticketElement.remove();
                this.ticketManager.removeTicket(id);
            }
        });

        // Lock/Unlock handler
        const lockUnlockBtn = ticketElement.querySelector(".lock-unlock i");
        const ticketTaskArea = ticketElement.querySelector(".task-area");
        
        lockUnlockBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent ticket deletion when clicking lock/unlock
            const isLocked = lockUnlockBtn.classList.contains("fa-lock");
            lockUnlockBtn.classList.toggle("fa-lock", !isLocked);
            lockUnlockBtn.classList.toggle("fa-unlock", isLocked);
            ticketTaskArea.setAttribute("contenteditable", isLocked);
            
            if (!isLocked) {
                this.ticketManager.updateTicket(id, { task: ticketTaskArea.textContent });
            }
        });

        // Color change handler
        const ticketColorBand = ticketElement.querySelector(".ticket-color");
        ticketColorBand.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent ticket deletion when clicking color
            const currentColor = ticketColorBand.classList[1];
            const currentColorIdx = this.ticketManager.colors.indexOf(currentColor);
            const nextColorIdx = (currentColorIdx + 1) % this.ticketManager.colors.length;
            const nextColor = this.ticketManager.colors[nextColorIdx];
            
            ticketColorBand.classList.remove(currentColor);
            ticketColorBand.classList.add(nextColor);
            
            this.ticketManager.updateTicket(id, { color: nextColor });
        });
    }
}

// Initialize the application
new App(); 