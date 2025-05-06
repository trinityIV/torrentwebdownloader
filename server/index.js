import express from 'express';
import WebTorrent from 'webtorrent';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Création du dossier uploads s'il n'existe pas
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads', { recursive: true });
    console.log('Dossier uploads créé avec succès');
}

const upload = multer({ dest: 'uploads/' });
const app = express();
const client = new WebTorrent();

app.use(cors());
app.use(express.json());

// Servir des fichiers statiques depuis un dossier "web" au lieu de "public"
app.use(express.static('../web'));

app.post('/add', upload.single('torrent'), (req, res) => {
    const magnet = req.body.magnet;
    const downloadPath = req.body.downloadPath && req.body.downloadPath.trim() !== ''
        ? req.body.downloadPath
        : undefined;
    let addOptions = {};
    if (downloadPath) {
        addOptions.path = path.resolve(downloadPath);
        if (!fs.existsSync(addOptions.path)) {
            fs.mkdirSync(addOptions.path, { recursive: true });
        }
    }
    if (magnet) {
        client.add(magnet, addOptions, torrent => {
            res.json({ infoHash: torrent.infoHash, name: torrent.name });
        });
    } else if (req.file) {
        const torrentPath = req.file.path;
        client.add(fs.readFileSync(torrentPath), addOptions, torrent => {
            fs.unlinkSync(torrentPath);
            res.json({ infoHash: torrent.infoHash, name: torrent.name });
        });
    } else {
        res.status(400).json({ error: 'No magnet link or torrent file' });
    }
});

app.get('/torrents', (req, res) => {
    res.json(client.torrents.map(t => ({
        infoHash: t.infoHash,
        name: t.name,
        progress: t.progress,
        downloaded: t.downloaded,
        length: t.length,
        files: t.files.map(f => f.name)
    })));
});

app.get('/download/:infoHash/:fileIdx', (req, res) => {
    const torrent = client.get(req.params.infoHash);
    if (!torrent) return res.status(404).send('Torrent not found');
    const file = torrent.files[req.params.fileIdx];
    if (!file) return res.status(404).send('File not found');
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    file.createReadStream().pipe(res);
});

// Ajouter cette route pour arrêter le serveur
app.post('/stop-server', (req, res) => {
    res.json({ success: true, message: "Le serveur va s'arrêter dans 2 secondes" });
    console.log("Arrêt du serveur demandé via l'interface web");
    // Délai pour permettre à la réponse d'être envoyée avant l'arrêt
    setTimeout(() => {
        process.exit(0);
    }, 2000);
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
