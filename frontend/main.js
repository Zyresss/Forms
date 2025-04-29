document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("user-form");

    const response = await fetch("./form.json");
    const data = await response.json();

    let htmlBody = '<div class="m-3"></div>';
    data.forEach(datum => {
        console.log(`=== ${datum.section} ===`);
        htmlBody += `<div class="shadow is-flex is-justify-content-center mx-6" style="background-color:rgb(185, 189, 62); padding: 1rem; margin-bottom: 1.5rem; border-radius: 20px; font-weight: bold; font-size: large; color: #325947;"><p style="">=== ${datum.section} ===</p></div><div class="is-flex is-justify-content-center is-align-items-center"><div>`;

        for (const [label, type] of Object.entries(datum.fields)) {
            if (Array.isArray(type)) {
                console.log(`${label}: [${type.join(', ')}]`);

                htmlBody += `<div class="is-flex"><div class="mt-2 mx-3 wid ww" style="width: 330px ;"><label style="font-size: large; color: black;">${label} :</label></div> <div class="is-flex is-justify-content-center wid"><div class="select custom-select"><select style="width: 240px;">`;
                for (const index in type) {
                    htmlBody += `<option>${type[index]}</option>`;
                }

                htmlBody += "</select></div></div></div> <br>";
            }
            else {
                console.log(`${label}: ${type}`);
                htmlBody += `<div class="is-flex"><div class="mt-2 mx-3 wid ww" style="width: 330px ;"><label style="font-size: large; color: black;">${label} :</label></div> <div class="is-flex is-justify-content-center wid"><input class="input custom-input w" placeholder="${label}" type="${type}"></div></div> <br>`;
            }
        }
        htmlBody += "</div></div><br>";
    });

    document.getElementById("user").innerHTML = htmlBody;
    console.log(data);
});