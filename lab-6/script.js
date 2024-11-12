document.addEventListener('DOMContentLoaded', () => {
    const displayArea = document.getElementById('content');

    // Create and add a title
    const title = document.createElement('h2');
    title.textContent = 'Even and Odd Number Sorter';
    displayArea.appendChild(title);

    // Create the button to trigger sorting
    const button = document.createElement('button');
    button.textContent = 'Sort Even and Odd Numbers';
    displayArea.appendChild(button);

    // Initial list of numbers
    const numbers = [12, 45, 23, 10, 67, 89, 34, 56, 9, 0];

    // Create a list to display numbers
    const numberList = document.createElement('ul');
    numbers.forEach(num => {
        const listItem = document.createElement('li');
        listItem.textContent = num;
        numberList.appendChild(listItem);
    });
    displayArea.appendChild(numberList);

    // Message to display after sorting
    const message = document.createElement('p');
    message.style.fontStyle = 'italic';
    displayArea.appendChild(message);

    // Add event listener to the button for sorting numbers
    button.addEventListener('click', () => {
        const evenNumbers = numbers.filter(num => num % 2 === 0);
        const oddNumbers = numbers.filter(num => num % 2 !== 0);

        // Clear the existing list
        numberList.innerHTML = '';

        // Display even numbers
        evenNumbers.forEach(num => {
            const listItem = document.createElement('li');
            listItem.textContent = `Even: ${num}`;
            listItem.classList.add('even');
            numberList.appendChild(listItem);
        });

        // Display odd numbers
        oddNumbers.forEach(num => {
            const listItem = document.createElement('li');
            listItem.textContent = `Odd: ${num}`;
            listItem.classList.add('odd');
            numberList.appendChild(listItem);
        });

        // Display sorted message
        message.textContent = 'The numbers have been sorted into even and odd!';
    });
});
