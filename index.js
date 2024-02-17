const express = require("express")
const app = express()
let voitures = [
    { id: 1, name: "clio" },
    { id: 2, name: "megane" },
    { id: 3, name: "range" }
];
app.post('/ajouter-voiture', (req, res) => {
    const nouvelleVoiture = req.body;
    voitures.push(nouvelleVoiture);
    res.json({ message: 'Voiture ajoutée', voitures });
});
app.get('/voitures', (req, res) => {
    res.json(voitures);
});
const PORT = 5000; 

app.listen(PORT, () => {
  console.log(`Server running`);
});
app.get('/voiture/:id', (req, res) => {
    const voitureId = parseInt(req.params.id);
    const voiture = voitures.find(v => v.id === voitureId);
    if (voiture) {
        res.json(voiture);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});
app.put('/voiture/:id', (req, res) => {
    const voitureId = parseInt(req.params.id);
    const index = voitures.findIndex(v => v.id === voitureId);
    if (index !== -1) {
        voitures[index] = { ...voitures[index], ...req.body };
        res.json({ message: 'Voiture modifiée', voiture: voitures[index] });
    } else {
        res.status(404).json({ message: "Voiture non trouvée" });
    }
});
app.delete('/voiture/:id', (req, res) => {
    const voitureId = parseInt(req.params.id);
    const index = voitures.findIndex(v => v.id === voitureId);
    if (index !== -1) {
        voitures.splice(index, 1);
        res.json({ message: 'Voiture supprimée avec succès' });
    } else {
        res.status(404).json({ message: "Voiture non trouvée" });
    }
});