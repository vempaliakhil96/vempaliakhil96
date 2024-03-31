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

        socialMedia.forEach((social) => {
            const anchor = document.createElement('a');
            anchor.href = "https://" + social.link;
            anchor.target = '_blank';
            const icon = document.createElement('i');
            icon.classList.add('fab', social_media_icon_map[social.socialMedia]);
            anchor.appendChild(icon);
            const container = document.getElementById('socialMediaContainer');
            container.appendChild(anchor);
        });
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
}

fetchResumeData();
