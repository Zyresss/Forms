import { buildUserForm, getResponseFromGemini } from './functions/userForm.js';

document.addEventListener('DOMContentLoaded', async () => {
    const data = localStorage.getItem('userForm');
    let userFormData;

    // No response from Gemini has been saved
    if (data === null) {
        const responseText = await getResponseFromGemini();
        console.log('Response received form Gemini');
        localStorage.setItem('userForm: ', responseText);
        userFormData = JSON.parse(responseText);

        // We didn't get any respose from Gemini (for one reason or another)
        if (!userFormData || !Array.isArray(userFormData) || userFormData.length === 0) {
            document.getElementById('loading-page').classList.add('invisible');
            document.getElementById('no-response-page').classList.remove('invisible');
            return;
        }
    }
    // A response has been saved (means the user refreshed the form page)
    else {
        userFormData = JSON.parse(data);
    }
    console.log('Data fetched: ', data);
    console.log('userFormData', userFormData);
    const form = buildUserForm(userFormData);

    // Here we dynamically build the user form with string concatonation ;)
    console.log('Form code: ', form);
    document.getElementById('user-form').innerHTML = form;

    // Then we display the form :)
    document.getElementById('loading-page').classList.add('invisible');
    document.getElementById('form-page').classList.remove('invisible');
});

document.getElementById('submit-btn').addEventListener('click', async (event) => {
    event.preventDefault();

    const userInput = document.querySelectorAll('.user-input');
    const formData = {};

    try {
        userInput.forEach((input) => {
            if (!input.value) {
                throw new Error('All fields need to be filled!!');
            }

            formData[input.name] = input.value;
        });

        console.log('Form data: ', formData);

        const response = await fetch('/api/data/add-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log('Response: ', response);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response from the server: ', errorText);
            throw new Error('Error sending data to the server: ', errorText);
        }

        localStorage.removeItem('userForm');
        console.log('userForm removed from local storage');

        const responseData = await response.json();
        console.log('Response from the server: ', responseData);
        alert('Data sent to the database!!');
        console.log('Response status: ', response.status);
        console.log('Response headers: ', response.headers);
    }
    catch (error) {
        console.error(error);
        alert(error);
    }
});