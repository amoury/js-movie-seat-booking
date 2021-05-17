const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = Number(movieSelect.value);

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }


  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

}

updateSelectedCount();


movieSelect.addEventListener('change', e => {
  ticketPrice = Number(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

container.addEventListener('click', event => {
  const targetClassList = event.target.classList;

  if (targetClassList.contains('seat') && !targetClassList.contains('occupied')) {
    targetClassList.toggle('selected');

    updateSelectedCount();
  }
})