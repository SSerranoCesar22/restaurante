let monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById("dates");
let month = document.getElementById("month");
let year = document.getElementById("year");

let prevMonthDOM = document.getElementById("prev-month");
let nextMonthDOM = document.getElementById("next-month");
let selectedHour;
let selectedDay;

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener("click", () => lastMonth());
nextMonthDOM.addEventListener("click", () => nextMonth());

writeMonth(monthNumber);

function writeMonth(month) {
    for (let i = startDay(); i > 0; i--) {
        dates.innerHTML += `<button class="calendar-date calendar-item last-days">${getTotalDays(monthNumber - 1) - (i - 1)}</button>`;
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        if (i === currentDay && month === monthNumber) {
            dates.innerHTML += `<button class="calendar-dates calendar-item today" onclick="handleButtonClick(${i})">${i}</button>`;
        } else if (i < currentDay && month === monthNumber) {
            dates.innerHTML += `<button class="calendar-date calendar-item last-days">${i}</button>`;
        } else {
            dates.innerHTML += `<button class="calendar-dates calendar-item" onclick="handleButtonClick(${i})">${i}</button>`;
        }
    }
}

function getTotalDays(month) {
  if (month === -1) month = 11;

  if (
    month == 0 ||
    month == 2 ||
    month == 4 ||
    month == 6 ||
    month == 7 ||
    month == 9 ||
    month == 11
  ) {
    return 31;
  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
    return 30;
  } else {
    return isLeap() ? 29 : 28;
  }
}

function isLeap() {
  return (
    (currentYear % 100 !== 0 && currentYear % 4 === 0) ||
    currentYear % 400 === 0
  );
}
function startDay() {
  let start = new Date(currentYear, monthNumber, 1);
  return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
}

function lastMonth() {
  if (monthNumber !== 0) {
    monthNumber--;
  } else {
    monthNumber = 11;
    currentYear--;
  }
  setNewDate();
}
function nextMonth() {
  if (monthNumber !== 11) {
    monthNumber++;
  } else {
    monthNumber = 0;
    currentYear++;
  }
  setNewDate();
}
function setNewDate() {
  currentDate.setFullYear(currentYear, monthNumber, currentDay);
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();
  dates.textContent = " ";
  writeMonth(monthNumber);
}
function isBookable() {
    //falta implementar saber numero de mesas para saber cuantas reservas se  pueden hacer
}
function handleButtonClick(day) {
    selectedDay = day;
    selectedHour = undefined; // Reiniciar la hora seleccionada
    let horasSelector = document.getElementById("horas");

    // Cambia el estilo para mostrar el selector
    horasSelector.style.display = "block";
}
function handleHourSelection() {
    // Se llama cuando se selecciona una hora
    selectedHour = document.getElementById("horas").value;
}
function enviarDatos() {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    // Verificar si se ha seleccionado un día y una hora antes de mostrar el mensaje
    if (selectedDay !== undefined && selectedHour !== undefined) {
        const mensaje = `Reserva seleccionada para el día ${selectedDay} a las ${selectedHour}, datos de contacto: nombre: ${nombre} telefono: ${telefono} email: ${email}`;
        alert(mensaje);
    } else {
        // Mostrar un aviso si no se ha seleccionado un día o una hora
        alert("Por favor, selecciona un día y una hora antes de enviar.");
    }
}