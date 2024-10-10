document.addEventListener('DOMContentLoaded', function () {
    function loadTabData(tabName, fileName) {
        fetch(`/data/${fileName}.json`)
            .then(response => response.json())
            .then(data => populateTab(tabName, data))
            .catch(error => console.error('Error loading data:', error));
    }

    function populateTab(tabName, data) {
        const tabContent = document.getElementById(tabName);
        tabContent.innerHTML = ''; // Clear existing content

        data.forEach(entry => {
            const box = document.createElement('div');
            box.classList.add('box');

            const boxImage = document.createElement('img');
            boxImage.src = '/img/sig.png';
            if (entry.logo) {
                boxImage.src = entry.logo;
            }
            if (entry.logoType === 'black') {
                boxImage.style.backgroundColor = 'white';
            } else {
                boxImage.style.backgroundColor = '#333';
            }
            boxImage.classList.add('box-image');

            const boxText = document.createElement('div');
            boxText.classList.add('box-text');

            const h3 = document.createElement('h3');
            if (entry.organization) {
                h3.textContent = entry.organization;
            }

            const aspan = document.createElement('span');
            if (entry.url) {
                aspan.innerHTML = `(<a class="link" href="${entry.url}" target="_blank">${entry.url}</a>)`;
            }

            const roleDate = document.createElement('div');
            roleDate.classList.add('role-date');

            const roleBox = document.createElement('span');
            roleBox.classList.add('role-box');
            roleBox.textContent = entry.role;

            const dateBox = document.createElement('span');
            dateBox.classList.add('date-box');
            dateBox.textContent = entry.dates;

            roleDate.appendChild(roleBox);
            roleDate.appendChild(dateBox);

            const degree = document.createElement('p');
            if (entry.degree) {
                degree.innerHTML = `<strong>Degree:</strong> ${entry.degree}`;
            }

            const location = document.createElement('p');
            if (entry.location) {
                location.innerHTML = `<strong>Location:</strong> ${entry.location}`;
            }

            const description = document.createElement('p');
            if (entry.description) {
                description.textContent = entry.description;
            }

            const skills = document.createElement('div');
            if (entry.skills) {
                skills.classList.add('skills');
                entry.skills.forEach(skill => {
                    const skillBox = document.createElement('span');
                    skillBox.classList.add('skill-box');
                    skillBox.textContent = skill;
                    skills.appendChild(skillBox);
                });
            }

            boxText.appendChild(h3);
            boxText.appendChild(roleDate);
            boxText.appendChild(degree);
            boxText.appendChild(location);
            boxText.appendChild(description);
            boxText.appendChild(aspan);
            boxText.appendChild(skills);
            box.appendChild(boxImage);
            box.appendChild(boxText);
            tabContent.appendChild(box);
        });
    }


    loadTabData('education', 'education');
    loadTabData('experience', 'experience');
    loadTabData('volunteering', 'volunteering');
    loadTabData('projects', 'projects');

    // Load photography dynamically
    function loadPhotography() {
        const photoGallery = document.querySelector('.photo-gallery');
        photoGallery.innerHTML = ''; // Clear existing content
        fetch('/photos') // This assumes server-side logic to serve the photo directory
            .then(response => response.json())
            .then(photos => {
                // photos.sort().reverse();
                photos.forEach(photo => {
                    const divElement = document.createElement('div');
                    // divElement.classList.add('photo');
                    const imgElement = document.createElement('img');
                    imgElement.src = `/photos/${photo}`;
                    imgElement.alt = `Photo ${photo}`;
                    // imgElement.classList.add('gallery-photo');
                    divElement.appendChild(imgElement);
                    photoGallery.appendChild(divElement);
                });
                return photoGallery;
            }).then(x => {
                $('#mygallery').justifiedGallery({
                    rowHeight: 180,
                    lastRow: 'justify',
                    margins: 3,
                    captions: false,
                    cssAnimation: true
                });
            })
            .catch(error => console.error('Error loading photos:', error));
    }

    loadPhotography();
});