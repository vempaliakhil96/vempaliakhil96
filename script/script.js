function textToBulletList(text) {
    // Split the text into individual sentences
    var sentences = text.split('\n');

    // Create an empty string to store the bullet list HTML
    var bulletListHTML = '<ul>';

    // Loop through each sentence and add it as a list item
    sentences.forEach(function(sentence) {
        bulletListHTML += '<li>' + sentence.trim() + '</li>';
    });

    // Close the unordered list
    bulletListHTML += '</ul>';

    return bulletListHTML;
}

async function fetchResumeData() {
    try {
        const response = await fetch('../ats_resume.json');
        const data = await response.json();
        const resumeData = JSON.parse(JSON.stringify(data));
        const socialMedia = resumeData.socialMedia;
        const social_media_icon_map = {
            "Github": "fa-github",
            "LinkedIn": "fa-linkedin",
            "twitter": "fa-twitter",
        };
        social_media_container = document.getElementById('social-media-container');
        socialMedia.forEach((social) => {
            const anchor = document.createElement('a');
            anchor.href = "https://" + social.link;
            anchor.target = '_blank';
            const icon = document.createElement('i');
            icon.classList.add('fab', social_media_icon_map[social.socialMedia]);
            anchor.appendChild(icon);
            social_media_container.appendChild(anchor);
        });
        const anchor = document.createElement('a');
        anchor.href = "mailto:" + resumeData.email;
        anchor.target = '_blank';
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-envelope');
        anchor.appendChild(icon);
        social_media_container.appendChild(anchor)
        document.getElementById("about-me-content").innerHTML = `<p>${resumeData.summary}</p>`;
        job_table_data = document.getElementById('job-table-rows');
        resumeData.workExperience.forEach((job) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${job.company}</td>
                <td style="white-space: nowrap;">${job.position}</td>
                <td style="white-space: nowrap;">${job.startYear} <br> ${job.endYear}</td>
                <td style="text-align: left;">${textToBulletList(job.keyAchievements)}</td>
            `;
            job_table_data.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
}

fetchResumeData();
