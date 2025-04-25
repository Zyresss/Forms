document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("user-form");

    const response = await fetch("./form.json");
    const data = await response.json();

    let htmlBody = '<div class="m-3"></div>';
    data.forEach(datum => {
        console.log(`=== ${datum.section} ===`);
        htmlBody += `<div class="shadow is-flex is-justify-content-center mx-5" style="background-color: #FFE66D; padding: 1rem; margin-bottom: 1.5rem; border-radius: 20px; font-weight: bold;"><p>=== ${datum.section} ===</p></div>`;

        for (const [label, type] of Object.entries(datum.fields)) {
            if (Array.isArray(type)) {
                console.log(`${label}: [${type.join(', ')}]`);

                htmlBody += `<div class="is-flex is-justify-content-center"><div class="mx-4"><label>${label} :</label></div> <div class="select custom-select"><select>`;
                for (const index in type) {
                    htmlBody += `<option>${type[index]}</option>`;
                }

                htmlBody += "</select></div></div> <br>";
            }
            else {
                console.log(`${label}: ${type}`);
                htmlBody += `<div class="is-flex is-justify-content-center"><div class="mx-4"><label>${label} :</label></div> <input class="input custom-input w" placeholder="${label}" type="${type}"></div> <br>`;
            }
        }
        htmlBody += "<br>";
    });

    document.getElementById("user").innerHTML = htmlBody;
    console.log(data);
});