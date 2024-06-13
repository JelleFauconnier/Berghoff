

document.getElementById('level-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    window.location.href = `../game/?difficulty=${selectedDifficulty}`;
});
