document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.getElementById('goal-input');
    const addBtn = document.getElementById('add-btn');
    const goalList = document.getElementById('goal-list');

    // Load goals from local storage on page load
    loadGoals();

    // Event listener for the "Add" button
    addBtn.addEventListener('click', addGoal);

    // Event listener for pressing "Enter" in the input field
    goalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addGoal();
        }
    });

    // Event delegation for marking items as complete and removing items
    goalList.addEventListener('click', (e) => {
        if (e.target.closest('.goal-item-text')) {
            toggleGoalStatus(e.target.closest('.goal-item-text'));
        }
        if (e.target.closest('.delete-btn')) {
            removeGoal(e.target.closest('li'));
        }
    });

    function addGoal() {
        const goalText = goalInput.value.trim();
        if (goalText !== '') {
            createGoalElement(goalText);
            goalInput.value = '';
            saveGoals();
        }
    }

    function createGoalElement(text, isCompleted = false) {
        const li = document.createElement('li');
        li.classList.add('goal-item');
        if (isCompleted) {
            li.classList.add('completed');
        }

        const goalTextSpan = document.createElement('span');
        goalTextSpan.classList.add('goal-item-text');
        goalTextSpan.textContent = text;
        li.appendChild(goalTextSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('action-btn', 'delete-btn');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        
        li.appendChild(deleteBtn);
        goalList.appendChild(li);
    }

    function toggleGoalStatus(goalElement) {
        goalElement.parentElement.classList.toggle('completed');
        saveGoals();
    }

    function removeGoal(goalElement) {
        goalElement.remove();
        saveGoals();
    }

    function saveGoals() {
        const goals = [];
        goalList.querySelectorAll('.goal-item').forEach(item => {
            goals.push({
                text: item.querySelector('.goal-item-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('bucketListGoals', JSON.stringify(goals));
    }

    function loadGoals() {
        const goals = JSON.parse(localStorage.getItem('bucketListGoals'));
        if (goals) {
            goals.forEach(goal => {
                createGoalElement(goal.text, goal.completed);
            });
        }
    }
});