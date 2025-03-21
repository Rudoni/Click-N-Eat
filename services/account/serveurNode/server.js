const port = 3000;
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const client = require('./db'); // Importer le client PostgreSQL

app.use(express.json());

const body = "<body><header><a href='http://localhost:8081/'>Click'n'Eat</a></header><br>"

app.get('/', (req, res) => {
    res.send('Hello World from Dockerized Node.js!');
});

app.get('/login', (req, res) => {
    res.send(body+`     <h2>Connexion</h2>
        <form id="loginForm">
        <label>Email: </label>
    <input type="email" id="email" required>
        <label>Mot de passe: </label>
        <input type="password" id="password" required>
            <button type="submit">Se connecter</button>
        </form>
        <p id="message"></p>

        <script>
            document.getElementById("loginForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/login/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

            const data = await response.json();
            document.getElementById("message").innerText = data.message;

            if (response.ok) {
            window.location.href = "/dashboard";
        }
        });
        </script></body>`);
})

app.get('/register', (req, res) => {
    res.send(body+`     <h2>Creation de compte</h2>
        <form id="registerForm">
        <label>Nom: </label>
        <input type="text" id="nom" required>
        <label>Prenom: </label>
        <input type="text" id="prenom" required>
        <label>Email: </label>
        <input type="email" id="email" required>
        <label>Mot de passe: </label>
        <input type="password" id="password" required>
        <label>Confirmer le mot de passe: </label>
        <input type="password" id="password2" required>
            <button type="submit">Se connecter</button>
        </form>
        <p id="message"></p>

        <script>
            document.getElementById("registerForm").addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const password2 = document.getElementById("password2").value;
            const nom = document.getElementById("nom").value;
            const prenom = document.getElementById("prenom").value;
            
            const response = await fetch("/register/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, password2, nom, prenom })
        });

            const data = await response.json();
            document.getElementById("message").innerText = data.message;

            if (response.ok) {
            window.location.href = "/dashboard";
        }
        });
        </script></body>`);
})

app.post("/register/register", async (req, res) => {


    debugger;

    const {email, password, password2, nom, prenom} = req.body;

    console.log("register/register", email, password);

    if (password !== password2) {
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }


    if (!password.match(/(?=.*[A-Z]{1,})(?=.*[@]{1,})(?=.*\d{1,})(?=[a-z]{1,}).{8,}/)) {
        return res.status(406).json({message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."})
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'insert into client (first_name, last_name, email, password_hash, type) values ($1, $2, $3, $4, $5)',
        values: [prenom, nom, email, hashed_password, 'client'],
    }

    let response = await client.query(query)

    console.log(response)

    // const result = await client.query(query)
    // console.log(result)

    await client.end()
    if (email === "test@email.com" && password === "1234") {
        return res.json({message: "Connexion réussie !"});
    } else {
        return res.status(401).json({message: "Email ou mot de passe incorrect."});
    }
});

app.post("/login/authenticate", (req, res) => {

    debugger;

    const { email, password } = req.body;

    console.log("login/aut", email, password);

    if (email === "test@email.com" && password === "1234") {
        return res.json({ message: "Connexion réussie !" });
    } else {
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }
});

app.get('/db', (req, res) => {
    // Exemple de requête simple
    client.query('SELECT NOW()')
        .then(result => {
            res.send('✅ Connexion réussie à PostgreSQL, heure actuelle : ' + result.rows[0].now);
        })
        .catch(err => {
            res.send('❌ Erreur de connexion : ' + err.message);
        });
});

app.get('/deco', (req, res) => {
    client.end()
        .then(() => {
            res.send('Connexion fermée');
        })
        .catch((err) => {
            res.send('Erreur lors de la fermeture de la connexion', err);
        });
})

app.get('/random', (req, res) => {
    res.send(Math.random().toString());
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:"+port);
});