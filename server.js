const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Mock Database
let requests = [];
let offers = [];

// --- ROUTES ---

// Home Page
app.get('/', (req, res) => {
    res.render('index');
});

// Submit Ride Request
app.post('/request', (req, res) => {
    const request = {
        id: Date.now(),
        pickup: req.body.pickup,
        destination: req.body.destination,
        date: req.body.date,
        time: req.body.time,
        passengers: req.body.passengers
    };
    requests.push(request);
    res.redirect(`/marketplace/${request.id}`);
});

// Marketplace (The Bidding Page)
app.get('/marketplace/:requestId', (req, res) => {
    const requestId = req.params.requestId;
    const userOffers = offers.filter(o => o.requestId == requestId);
    res.render('marketplace', { requestId, offers: userOffers });
});

// Driver Portal
app.get('/driver', (req, res) => {
    res.render('driver', { requests });
});

// Driver submits a bid
app.post('/bid', (req, res) => {
    const offer = {
        id: Date.now(),
        requestId: req.body.requestId,
        driverName: req.body.driverName,
        price: req.body.price,
        car: req.body.car,
        rating: "4.8"
    };
    offers.push(offer);
    res.redirect('/driver');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`LocalsRide Live on port ${PORT}`));
