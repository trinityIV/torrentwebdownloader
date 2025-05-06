const API = 'http://localhost:3000';

async function fetchTorrents() {
    try {
        const res = await fetch(`${API}/torrents`);
        if (!res.ok) {
            throw new Error(`Erreur API: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error('Impossible de récupérer les torrents:', error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}

async function addTorrent({ magnet, file, downloadPath }) {
    const formData = new FormData();
    if (magnet) formData.append('magnet', magnet);
    if (file) formData.append('torrent', file);
    if (downloadPath) formData.append('downloadPath', downloadPath);
    await fetch(`${API}/add`, {
        method: 'POST',
        body: formData
    });
}

function renderTorrents(torrents) {
    const container = document.getElementById('torrents');
    container.innerHTML = '';
    torrents.forEach((t, idx) => {
        const div = document.createElement('div');
        div.className = 'torrent';
        div.innerHTML = `
            <div class="torrent-name"><i class="fa-solid fa-file-download"></i> <b>${t.name}</b></div>
            <div class="torrent-info">Progression: ${(t.progress * 100).toFixed(1)}%</div>
            <div class="progress-bar"><div class="progress-bar-inner" style="width:${t.progress*100}%"></div></div>
            <div class="torrent-files">
                Fichiers: ${t.files.map((f, i) => `<a href="${API}/download/${t.infoHash}/${i}" target="_blank">${f}</a>`).join(', ')}
            </div>
        `;
        container.appendChild(div);
    });
    
    if (torrents.length === 0) {
        container.innerHTML = '<div class="empty-state">Aucun torrent en cours. Ajoutez-en un pour commencer.</div>';
    }
}

document.getElementById('addForm').onsubmit = async e => {
    e.preventDefault();
    const magnet = document.getElementById('magnet').value.trim();
    const fileInput = document.getElementById('torrentFile');
    const file = fileInput.files[0];
    const downloadPath = document.getElementById('downloadPath').value.trim();
    
    if (!magnet && !file) {
        alert('Veuillez fournir un lien magnet ou un fichier .torrent');
        return;
    }
    
    try {
        await addTorrent({ magnet, file, downloadPath });
        document.getElementById('magnet').value = '';
        fileInput.value = '';
        document.getElementById('selectedFileName').textContent = 'Aucun fichier sélectionné';
        document.getElementById('downloadPath').value = '';
        document.getElementById('selectedFolderPath').textContent = 'Dossier par défaut';
        update();
    } catch (error) {
        alert('Erreur lors de l\'ajout du torrent: ' + error.message);
    }
};

async function update() {
    try {
        const torrents = await fetchTorrents();
        renderTorrents(torrents);
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        // Affiche un message d'erreur dans l'interface
        const container = document.getElementById('torrents');
        container.innerHTML = '<div class="error-state">Erreur de connexion au serveur. Vérifiez que le serveur est bien démarré.</div>';
    }
}
setInterval(update, 2000);
update();
