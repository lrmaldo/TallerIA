const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

let currentPage = 1;
let currentFilter = {
    name: '',
    status: ''
};
let allCharacters = [];
let filteredCharacters = [];
const ITEMS_PER_PAGE = 6;

const elements = {
    searchInput: document.getElementById('searchInput'),
    statusFilter: document.getElementById('statusFilter'),
    searchBtn: document.getElementById('searchBtn'),
    charactersGrid: document.getElementById('charactersGrid'),
    paginationContainer: document.getElementById('paginationContainer'),
    loadingContainer: document.getElementById('loadingContainer'),
    noResultsContainer: document.getElementById('noResultsContainer'),
    errorContainer: document.getElementById('errorContainer')
};

/**
 * Obtiene los personajes de la API
 * @param {string} url - URL de la API
 * @returns {Promise<Array>} Array de personajes
 */
async function fetchCharacters(url = API_BASE_URL) {
    try {
        showLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        showError(error.message);
        return [];
    }
}

/**
 * Carga todos los personajes (con paginación de la API)
 */
async function loadAllCharacters() {
    try {
        showLoading(true);
        allCharacters = [];
        let url = API_BASE_URL;
        
        while (url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al conectar con la API');
            
            const data = await response.json();
            allCharacters = [...allCharacters, ...data.results];
            url = data.info.next;
        }
        
        showLoading(false);
        performSearch();
    } catch (error) {
        showError(error.message);
        showLoading(false);
    }
}

/**
 * Filtra los personajes según los criterios de búsqueda
 */
function performSearch() {
    filteredCharacters = allCharacters.filter(character => {
        const matchName = character.name.toLowerCase().includes(currentFilter.name.toLowerCase());
        const matchStatus = !currentFilter.status || character.status.toLowerCase() === currentFilter.status.toLowerCase();
        return matchName && matchStatus;
    });

    currentPage = 1;
    renderCharacters();
    renderPagination();
}

/**
 * Renderiza las tarjetas de personajes
 */
function renderCharacters() {
    if (filteredCharacters.length === 0) {
        elements.charactersGrid.innerHTML = '';
        elements.noResultsContainer.style.display = 'block';
        elements.paginationContainer.innerHTML = '';
        return;
    }

    elements.noResultsContainer.style.display = 'none';

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);

    elements.charactersGrid.innerHTML = paginatedCharacters.map(character => createCharacterCard(character)).join('');
}

/**
 * Crea una tarjeta HTML para un personaje
 * @param {Object} character - Objeto del personaje
 * @returns {string} HTML de la tarjeta
 */
function createCharacterCard(character) {
    const statusClass = character.status.toLowerCase();
    const statusText = getStatusText(character.status);

    return `
        <div class="card">
            <img src="${character.image}" alt="${character.name}" class="card-image">
            <div class="card-content">
                <div class="card-name">${character.name}</div>
                <div class="card-info">
                    <div>
                        <strong>Estado:</strong>
                        <span class="status ${statusClass}">${statusText}</span>
                    </div>
                    <div>
                        <strong>Especie:</strong>
                        <span>${character.species}</span>
                    </div>
                    <div>
                        <strong>Ubicación:</strong>
                        <span>${character.location.name}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Traduce el estado del personaje
 * @param {string} status - Estado en inglés
 * @returns {string} Estado en español
 */
function getStatusText(status) {
    const statusMap = {
        'Alive': 'Vivo',
        'Dead': 'Muerto',
        'unknown': 'Desconocido'
    };
    return statusMap[status] || status;
}

/**
 * Renderiza los botones de paginación
 */
function renderPagination() {
    const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);

    if (totalPages <= 1) {
        elements.paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Botón anterior
    paginationHTML += `
        <button 
            onclick="goToPage(${currentPage - 1})" 
            ${currentPage === 1 ? 'disabled' : ''}
        >
            ← Anterior
        </button>
    `;

    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button 
                onclick="goToPage(${i})" 
                class="${i === currentPage ? 'active' : ''}"
            >
                ${i}
            </button>
        `;
    }

    // Botón siguiente
    paginationHTML += `
        <button 
            onclick="goToPage(${currentPage + 1})" 
            ${currentPage === totalPages ? 'disabled' : ''}
        >
            Siguiente →
        </button>
    `;

    elements.paginationContainer.innerHTML = paginationHTML;
}

/**
 * Cambia a una página específica
 * @param {number} pageNumber - Número de página
 */
function goToPage(pageNumber) {
    const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);
    
    if (pageNumber < 1 || pageNumber > totalPages) {
        return;
    }

    currentPage = pageNumber;
    renderCharacters();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Muestra/oculta el indicador de carga
 * @param {boolean} show - Mostrar o no
 */
function showLoading(show) {
    elements.loadingContainer.style.display = show ? 'block' : 'none';
}

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje de error
 */
function showError(message) {
    elements.errorContainer.innerHTML = `<div class="error">${message}</div>`;
    setTimeout(() => {
        elements.errorContainer.innerHTML = '';
    }, 5000);
}

/**
 * Manejador de evento para buscar
 */
function handleSearch() {
    currentFilter.name = elements.searchInput.value;
    currentFilter.status = elements.statusFilter.value;
    performSearch();
}

// Event Listeners
elements.searchBtn.addEventListener('click', handleSearch);
elements.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
elements.statusFilter.addEventListener('change', handleSearch);

// Cargar personajes al iniciar
window.addEventListener('DOMContentLoaded', () => {
    loadAllCharacters();
});
