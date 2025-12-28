// Lógica principal del juego El Impostor

class ImpostorGame {
    constructor() {
        this.numPlayers = 4;
        this.selectedCategory = null;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.clues = [];
        this.votes = {};
        this.normalWord = '';
        this.impostorIndex = -1;
        this.gamePhase = 'menu'; // menu, config, distribution, game, voting, result
        this.init();
    }

    init() {
        this.loadCategories();
        this.showScreen('menu');
    }

    // ============= NAVEGACIÓN DE PANTALLAS =============
    showScreen(screenName) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Mostrar la pantalla solicitada
        const targetScreen = document.getElementById(`screen-${screenName}`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.gamePhase = screenName;
        }
    }

    // ============= CONFIGURACIÓN =============
    loadCategories() {
        const categoryGrid = document.getElementById('category-grid');
        if (!categoryGrid) return;

        categoryGrid.innerHTML = '';
        const categories = getCategories();

        categories.forEach(category => {
            const btn = document.createElement('div');
            btn.className = 'category-btn';
            btn.textContent = this.formatCategoryName(category);
            btn.onclick = () => this.selectCategory(category, btn);
            categoryGrid.appendChild(btn);
        });

        // Seleccionar primera categoría por defecto
        if (categories.length > 0) {
            this.selectedCategory = categories[0];
            categoryGrid.firstChild.classList.add('selected');
        }
    }

    formatCategoryName(category) {
        const icons = {
            animales: '🐾',
            comida: '🍕',
            profesiones: '👔',
            deportes: '⚽',
            lugares: '🏛️',
            objetos: '🔧',
            transporte: '🚗',
            tecnologia: '💻',
            musica: '🎵',
            peliculas: '🎬'
        };

        const icon = icons[category] || '📁';
        const name = category.charAt(0).toUpperCase() + category.slice(1);
        return `${icon} ${name}`;
    }

    selectCategory(category, btnElement) {
        this.selectedCategory = category;

        // Actualizar estilos
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        btnElement.classList.add('selected');
    }

    changePlayerCount(delta) {
        this.numPlayers += delta;

        // Limitar entre 3 y 10 jugadores
        if (this.numPlayers < 3) this.numPlayers = 3;
        if (this.numPlayers > 10) this.numPlayers = 10;

        document.getElementById('num-players').textContent = this.numPlayers;
    }

    // ============= INICIO DEL JUEGO =============
    startGame() {
        if (!this.selectedCategory) {
            alert('Por favor selecciona una categoría');
            return;
        }

        // Obtener par de palabras
        const wordPair = getRandomWordPair(this.selectedCategory);
        if (!wordPair) {
            alert('Error al obtener palabras');
            return;
        }

        // Asignar impostor aleatorio
        this.impostorIndex = Math.floor(Math.random() * this.numPlayers);
        this.normalWord = wordPair.normal;

        // Crear jugadores
        this.players = [];
        for (let i = 0; i < this.numPlayers; i++) {
            this.players.push({
                id: i + 1,
                word: i === this.impostorIndex ? wordPair.impostor : wordPair.normal,
                isImpostor: i === this.impostorIndex,
                hasSeenWord: false
            });
        }

        // Reiniciar estado
        this.currentPlayerIndex = 0;
        this.clues = [];
        this.votes = {};

        // Ir a pantalla de distribución
        this.showDistribution();
    }

    // ============= DISTRIBUCIÓN DE PALABRAS =============
    showDistribution() {
        this.showScreen('distribution');
        this.updateDistributionScreen();
    }

    updateDistributionScreen() {
        const playerNum = this.currentPlayerIndex + 1;
        document.getElementById('current-player-num').textContent = playerNum;

        // Ocultar palabra, mostrar botón de revelar
        document.getElementById('word-hidden').style.display = 'block';
        document.getElementById('word-revealed').style.display = 'none';
    }

    revealWord() {
        const currentPlayer = this.players[this.currentPlayerIndex];

        // Mostrar palabra
        document.getElementById('player-word').textContent = currentPlayer.word;
        document.getElementById('word-hidden').style.display = 'none';
        document.getElementById('word-revealed').style.display = 'block';

        currentPlayer.hasSeenWord = true;
    }

    nextPlayer() {
        this.currentPlayerIndex++;

        if (this.currentPlayerIndex >= this.numPlayers) {
            // Todos han visto sus palabras, iniciar juego
            this.startGamePhase();
        } else {
            // Siguiente jugador
            this.updateDistributionScreen();
        }
    }

    // ============= FASE DE JUEGO (PISTAS) =============
    startGamePhase() {
        this.currentPlayerIndex = 0;
        this.showScreen('game');
        this.updateGameScreen();
    }

    updateGameScreen() {
        document.getElementById('total-players').textContent = this.numPlayers;
        document.getElementById('current-turn-player').textContent = (this.currentPlayerIndex % this.numPlayers) + 1;
        this.updateCluesList();
    }

    addClue() {
        const input = document.getElementById('clue-input');
        const clueText = input.value.trim();

        if (!clueText) {
            alert('Por favor escribe una pista');
            return;
        }

        const playerNum = (this.currentPlayerIndex % this.numPlayers) + 1;

        this.clues.push({
            player: playerNum,
            text: clueText
        });

        input.value = '';
        this.currentPlayerIndex++;

        this.updateGameScreen();
    }

    updateCluesList() {
        const cluesList = document.getElementById('clues-list');

        if (this.clues.length === 0) {
            cluesList.innerHTML = '<p class="no-clues">Aún no hay pistas...</p>';
            return;
        }

        cluesList.innerHTML = '';
        this.clues.forEach(clue => {
            const clueDiv = document.createElement('div');
            clueDiv.className = 'clue-item';
            clueDiv.innerHTML = `<strong>Jugador ${clue.player}:</strong> ${clue.text}`;
            cluesList.appendChild(clueDiv);
        });

        // Auto-scroll al final
        cluesList.scrollTop = cluesList.scrollHeight;
    }

    // ============= VOTACIÓN =============
    initVoting() {
        this.showScreen('voting');
        const voteList = document.getElementById('players-vote-list');
        voteList.innerHTML = '';

        for (let i = 0; i < this.numPlayers; i++) {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-vote-item';
            playerDiv.innerHTML = `
                <span class="player-name">Jugador ${i + 1}</span>
                <span class="vote-count">0 votos</span>
            `;
            playerDiv.onclick = () => this.toggleVote(i, playerDiv);
            voteList.appendChild(playerDiv);
        }
    }

    toggleVote(playerIndex, element) {
        // Limpiar selección previa
        document.querySelectorAll('.player-vote-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Seleccionar nuevo
        element.classList.add('selected');
        this.votes.selected = playerIndex;
    }

    tallyVotes() {
        if (this.votes.selected === undefined) {
            alert('Por favor vota por un jugador');
            return;
        }

        const votedPlayer = this.votes.selected;
        const wasImpostor = this.players[votedPlayer].isImpostor;

        this.showVoteResult(votedPlayer, wasImpostor);
    }

    showVoteResult(votedPlayer, wasImpostor) {
        this.showScreen('vote-result');
        const resultDiv = document.getElementById('vote-result-info');

        if (wasImpostor) {
            // Jugadores ganaron
            resultDiv.innerHTML = `
                <div class="result-box success">
                    <div class="result-icon">🎉</div>
                    <h3>¡Victoria de los Jugadores!</h3>
                    <p>El Jugador ${votedPlayer + 1} era el impostor</p>
                    <p>Su palabra era: <strong>${this.players[votedPlayer].word}</strong></p>
                    <p>La palabra correcta era: <strong>${this.normalWord}</strong></p>
                </div>
            `;

            setTimeout(() => {
                this.showFinalScreen('players');
            }, 3000);
        } else {
            // No era el impostor, dar oportunidad de adivinar
            resultDiv.innerHTML = `
                <div class="result-box warning">
                    <div class="result-icon">😬</div>
                    <h3>¡No era el impostor!</h3>
                    <p>El Jugador ${votedPlayer + 1} NO era el impostor</p>
                    <p>El impostor tiene una última oportunidad...</p>
                </div>
            `;

            setTimeout(() => {
                this.showImpostorGuess();
            }, 3000);
        }
    }

    // ============= ADIVINANZA DEL IMPOSTOR =============
    showImpostorGuess() {
        this.showScreen('impostor-guess');
        document.getElementById('impostor-number').textContent = this.impostorIndex + 1;
        document.getElementById('guess-input').value = '';
    }

    checkImpostorGuess() {
        const input = document.getElementById('guess-input');
        const guess = input.value.trim().toUpperCase();

        if (!guess) {
            alert('Por favor escribe tu respuesta');
            return;
        }

        if (guess === this.normalWord) {
            this.showFinalScreen('impostor', true);
        } else {
            this.showFinalScreen('players', false);
        }
    }

    impostorGiveUp() {
        this.showFinalScreen('players', false);
    }

    // ============= RESULTADO FINAL =============
    showFinalScreen(winner, impostorGuessed = false) {
        this.showScreen('final');
        const resultDiv = document.getElementById('final-result');

        if (winner === 'impostor') {
            resultDiv.innerHTML = `
                <div class="result-box danger">
                    <div class="result-icon">😈</div>
                    <h3>¡Gana el Impostor!</h3>
                    <p>El impostor adivinó la palabra correctamente</p>
                    <p>La palabra era: <strong>${this.normalWord}</strong></p>
                </div>
            `;
        } else {
            if (impostorGuessed === false) {
                resultDiv.innerHTML = `
                    <div class="result-box success">
                        <div class="result-icon">🎊</div>
                        <h3>¡Ganan los Jugadores!</h3>
                        <p>El impostor no pudo adivinar la palabra</p>
                        <p>La palabra correcta era: <strong>${this.normalWord}</strong></p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="result-box success">
                        <div class="result-icon">🎉</div>
                        <h3>¡Ganan los Jugadores!</h3>
                        <p>Descubrieron al impostor</p>
                    </div>
                `;
            }
        }

        this.showRoleReveal();
    }

    showRoleReveal() {
        const revealDiv = document.getElementById('roles-reveal');
        revealDiv.innerHTML = '';

        this.players.forEach((player, index) => {
            const roleDiv = document.createElement('div');
            roleDiv.className = `role-reveal-item ${player.isImpostor ? 'impostor' : 'normal'}`;

            roleDiv.innerHTML = `
                <div>
                    <span class="player-name">Jugador ${index + 1}</span>
                    <small> - ${player.word}</small>
                </div>
                <span class="role-badge ${player.isImpostor ? 'impostor' : 'normal'}">
                    ${player.isImpostor ? '😈 Impostor' : '✅ Normal'}
                </span>
            `;

            revealDiv.appendChild(roleDiv);
        });
    }

    // ============= REINICIAR JUEGO =============
    newGame() {
        this.players = [];
        this.clues = [];
        this.votes = {};
        this.currentPlayerIndex = 0;
        this.showScreen('config');
    }
}

// Inicializar el juego cuando se carga la página
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new ImpostorGame();
});
