// Ticket Management Module
export class TicketManager {
    constructor() {
        this.ticketArr = [];
        this.colors = ['lightPink', 'blue', 'green', 'black'];
    }

    initializeFromStorage() {
        if (localStorage.getItem("tickets")) {
            let str = localStorage.getItem("tickets");
            let arr = JSON.parse(str);
            this.ticketArr = arr;
            return arr;
        }
        return [];
    }

    addTicket(ticketColor, task, ticketId) {
        const ticket = {
            color: ticketColor,
            task: task,
            id: ticketId
        };
        this.ticketArr.push(ticket);
        this.updateLocalStorage();
        return ticket;
    }

    removeTicket(id) {
        const ticketIdx = this.getTicketIdx(id);
        if (ticketIdx !== -1) {
            this.ticketArr.splice(ticketIdx, 1);
            this.updateLocalStorage();
        }
    }

    updateTicket(id, updates) {
        const ticketIdx = this.getTicketIdx(id);
        if (ticketIdx !== -1) {
            this.ticketArr[ticketIdx] = { ...this.ticketArr[ticketIdx], ...updates };
            this.updateLocalStorage();
        }
    }

    getTicketIdx(id) {
        return this.ticketArr.findIndex(ticket => ticket.id === id);
    }

    getTicketsByColor(color) {
        return this.ticketArr.filter(ticket => ticket.color === color);
    }

    getAllTickets() {
        return this.ticketArr;
    }

    updateLocalStorage() {
        let stringifyArr = JSON.stringify(this.ticketArr);
        localStorage.setItem("tickets", stringifyArr);
    }
} 