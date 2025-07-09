// UI Management Module
export class UIManager {
    constructor() {
        this.addBtn = document.querySelector(".add-btn");
        this.modalCont = document.querySelector(".modal-cont");
        this.taskAreaCont = document.querySelector(".textarea-cont");
        this.mainCont = document.querySelector(".tickets-cont");
        this.allPriorityColors = document.querySelectorAll(".priority-color");
        this.removeBtn = document.querySelector(".remove-btn");
        this.toolBoxColors = document.querySelectorAll(".color");
        this.isModalOpen = false;
        this.removeFlag = false;
        this.modalPriorityColor = 'lightPink'; // Match HTML default
    }

    createTicketElement(ticketColor, task, id) {
        const ticketCont = document.createElement("div");
        ticketCont.setAttribute('class', 'ticket-cont');
        ticketCont.innerHTML = `
            <div class="ticket-color ${ticketColor}"></div>
            <div class="ticket-id">#${id}</div>
            <div class="task-area">${task}</div>
            <div class="lock-unlock"><i class="fa fa-lock"></i></div>
        `;
        return ticketCont;
    }

    openModal() {
        console.log("openModal called");
        this.modalCont.style.display = "flex";
        this.isModalOpen = true;
        this.taskAreaCont.focus();
    }

    closeModal() {
        this.modalCont.style.display = "none";
        this.isModalOpen = false;
    }

    toggleRemoveMode() {
        this.removeFlag = !this.removeFlag;
        this.removeBtn.style.color = this.removeFlag ? "red" : "black";
    }

    setPriorityColor(color) {
        console.log('Priority color set to:', color);
        this.modalPriorityColor = color;
        this.allPriorityColors.forEach(priorityColor => {
            priorityColor.classList.remove("active");
            if (priorityColor.classList.contains(color)) {
                priorityColor.classList.add("active");
            }
        });
    }

    clearMainContainer() {
        const allTickets = document.querySelectorAll(".ticket-cont");
        allTickets.forEach(ticket => ticket.remove());
    }

    appendTicket(ticketElement) {
        this.mainCont.appendChild(ticketElement);
    }

    getTaskAreaValue() {
        return this.taskAreaCont.value;
    }

    clearTaskArea() {
        this.taskAreaCont.value = "";
    }
} 