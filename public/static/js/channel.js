document.addEventListener('DOMContentLoaded', () => {
    const channels = [
        { name: 'Général', participants: 42, imageUrl: 'path/to/general.jpg' },
        { name: 'Développement', participants: 34, imageUrl: 'path/to/development.jpg' },
        { name: 'Jeux', participants: 27, imageUrl: 'path/to/games.jpg' },
        { name: 'Musique', participants: 19, imageUrl: 'path/to/music.jpg' },
    ];

    const channelsContainer = document.getElementById('channels-container');

    channels.forEach(channel => {
        const card = document.createElement('div');
        card.className = 'channel-card';

        const img = document.createElement('img');
        img.src = channel.imageUrl; // Remplacez par vos propres images
        img.alt = `Image du canal ${channel.name}`;

        const content = document.createElement('div');
        content.className = 'channel-card-content';

        const title = document.createElement('h3');
        title.className = 'channel-card-title';
        title.textContent = channel.name;

        const info = document.createElement('p');
        info.className = 'channel-card-info';
        info.textContent = `Participants: ${channel.participants}`;

        content.appendChild(title);
        content.appendChild(info);

        card.appendChild(img);
        card.appendChild(content);

        channelsContainer.appendChild(card);
    });
});
