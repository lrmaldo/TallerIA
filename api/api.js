// 🌐 Pokédex - Consumo de APIs con fetch

// Variables globales
let todosLosPokemon = [];
let pokemonFiltrado = [];
let paginaActual = 1;
const POKEMON_POR_PAGINA = 20;

// Elementos del DOM
const inputPokemon = document.getElementById('inputPokemon');
const btnBuscar = document.getElementById('btnBuscar');
const pokemonGrid = document.getElementById('pokemonGrid');
const pagination = document.getElementById('pagination');
const pokemonModal = document.getElementById('pokemonModal');
const modalClose = document.getElementById('modalClose');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');

// ==================== FUNCIONES DE CARGA DE DATOS ====================

/**
 * Obtiene todos los Pokémon de la PokeAPI
 */
async function cargarTodosPokemon() {
    try {
        loadingMessage.style.display = 'block';
        errorMessage.innerHTML = '';

        // Obtener lista de todos los Pokémon
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0');
        if (!respuesta.ok) throw new Error('Error al cargar los Pokémon');

        const datos = await respuesta.json();
        todosLosPokemon = datos.results.map((pokemon, index) => ({
            id: index + 1,
            nombre: pokemon.name,
            url: pokemon.url
        }));

        pokemonFiltrado = [...todosLosPokemon];
        paginaActual = 1;
        mostrarPaginaActual();
        generarBotonesPaginacion();

        loadingMessage.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        errorMessage.innerHTML = `<div class="error">Error al cargar los Pokémon: ${error.message}</div>`;
        loadingMessage.style.display = 'none';
    }
}

/**
 * Obtiene los detalles completos de un Pokémon
 */
async function obtenerDetallesPokemon(nombreOId) {
    try {
        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`
        );
        if (!respuesta.ok) throw new Error('Pokémon no encontrado');

        return await respuesta.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// ==================== FUNCIONES DE BÚSQUEDA ====================

/**
 * Filtra los Pokémon según el término de búsqueda
 */
function filtrarPokemon(termino) {
    const terminoLower = termino.toLowerCase().trim();

    if (terminoLower === '') {
        pokemonFiltrado = [...todosLosPokemon];
    } else {
        pokemonFiltrado = todosLosPokemon.filter(pokemon => {
            const coincideNombre = pokemon.nombre.includes(terminoLower);
            const coincideId = pokemon.id.toString() === terminoLower;
            return coincideNombre || coincideId;
        });
    }

    paginaActual = 1;
    mostrarPaginaActual();
    generarBotonesPaginacion();
}

// ==================== FUNCIONES DE VISUALIZACIÓN ====================

/**
 * Obtiene los Pokémon de la página actual y los muestra
 */
async function mostrarPaginaActual() {
    try {
        const inicio = (paginaActual - 1) * POKEMON_POR_PAGINA;
        const fin = inicio + POKEMON_POR_PAGINA;
        const pokemonEnPagina = pokemonFiltrado.slice(inicio, fin);

        if (pokemonEnPagina.length === 0) {
            pokemonGrid.innerHTML = '<p style="grid-column: 1/-1; color: white; text-align: center;">No se encontraron Pokémon</p>';
            return;
        }

        loadingMessage.style.display = 'block';
        pokemonGrid.innerHTML = '';

        // Cargar detalles de cada Pokémon
        const promesas = pokemonEnPagina.map(pokemon => obtenerDetallesPokemon(pokemon.nombre));
        const detalles = await Promise.all(promesas);

        detalles.forEach(detalles => {
            if (detalles) {
                const card = crearTarjetaPokemon(detalles);
                pokemonGrid.appendChild(card);
            }
        });

        loadingMessage.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        loadingMessage.style.display = 'none';
    }
}

/**
 * Crea una tarjeta de Pokémon para el grid
 */
function crearTarjetaPokemon(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <img src="${pokemon.sprites.front_default || 'https://via.placeholder.com/100'}" 
             alt="${pokemon.name}" 
             onerror="this.src='https://via.placeholder.com/100'">
        <h3>${pokemon.name}</h3>
        <p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
    `;
    card.addEventListener('click', () => mostrarModalPokemon(pokemon));
    return card;
}

/**
 * Genera los botones de paginación
 */
function generarBotonesPaginacion() {
    pagination.innerHTML = '';

    const totalPaginas = Math.ceil(pokemonFiltrado.length / POKEMON_POR_PAGINA);

    if (totalPaginas <= 1) return;

    // Botón anterior
    const btnAnterior = document.createElement('button');
    btnAnterior.textContent = '← Anterior';
    btnAnterior.disabled = paginaActual === 1;
    btnAnterior.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarPaginaActual();
            generarBotonesPaginacion();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(btnAnterior);

    // Botones de números de página
    const inicio = Math.max(1, paginaActual - 2);
    const fin = Math.min(totalPaginas, paginaActual + 2);

    if (inicio > 1) {
        const btn1 = document.createElement('button');
        btn1.textContent = '1';
        btn1.addEventListener('click', () => cambiarPagina(1, totalPaginas));
        pagination.appendChild(btn1);

        if (inicio > 2) {
            const puntos = document.createElement('span');
            puntos.textContent = '...';
            puntos.style.color = 'white';
            puntos.style.alignSelf = 'center';
            pagination.appendChild(puntos);
        }
    }

    for (let i = inicio; i <= fin; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === paginaActual) btn.classList.add('active');
        btn.addEventListener('click', () => cambiarPagina(i, totalPaginas));
        pagination.appendChild(btn);
    }

    if (fin < totalPaginas) {
        if (fin < totalPaginas - 1) {
            const puntos = document.createElement('span');
            puntos.textContent = '...';
            puntos.style.color = 'white';
            puntos.style.alignSelf = 'center';
            pagination.appendChild(puntos);
        }

        const btnUltima = document.createElement('button');
        btnUltima.textContent = totalPaginas;
        btnUltima.addEventListener('click', () => cambiarPagina(totalPaginas, totalPaginas));
        pagination.appendChild(btnUltima);
    }

    // Botón siguiente
    const btnSiguiente = document.createElement('button');
    btnSiguiente.textContent = 'Siguiente →';
    btnSiguiente.disabled = paginaActual === totalPaginas;
    btnSiguiente.addEventListener('click', () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarPaginaActual();
            generarBotonesPaginacion();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(btnSiguiente);
}

/**
 * Cambia a una página específica
 */
function cambiarPagina(numeroPagina, totalPaginas) {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
        paginaActual = numeroPagina;
        mostrarPaginaActual();
        generarBotonesPaginacion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==================== FUNCIONES DEL MODAL ====================

/**
 * Muestra el modal con los detalles completos del Pokémon
 */
function mostrarModalPokemon(pokemon) {
    // Rellenar información en el modal
    document.getElementById('modalImage').src = pokemon.sprites.front_default || 'https://via.placeholder.com/200';
    document.getElementById('modalName').textContent = pokemon.name;
    document.getElementById('modalId').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    // Tipos
    const tiposDiv = document.getElementById('modalTypes');
    tiposDiv.innerHTML = '';
    pokemon.types.forEach(typeObj => {
        const tipo = typeObj.type.name;
        const badge = document.createElement('span');
        badge.className = `type-badge type-${tipo}`;
        badge.textContent = tipo;
        tiposDiv.appendChild(badge);
    });

    // Altura y Peso
    document.getElementById('modalHeight').textContent = `${pokemon.height / 10} m`;
    document.getElementById('modalWeight').textContent = `${pokemon.weight / 10} kg`;

    // Estadísticas
    const statsDiv = document.getElementById('modalStats');
    statsDiv.innerHTML = '';
    pokemon.stats.forEach(stat => {
        const statName = stat.stat.name;
        const valor = stat.base_stat;
        const porcentaje = (valor / 255) * 100;

        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <h4>${formatearNombreStat(statName)}</h4>
            <div class="stat-bar">
                <div class="stat-fill" style="width: ${porcentaje}%"></div>
            </div>
            <p style="font-size: 0.8em; margin-top: 5px;">${valor}</p>
        `;
        statsDiv.appendChild(statItem);
    });

    // Habilidades
    const abilitiesDiv = document.getElementById('modalAbilities');
    abilitiesDiv.innerHTML = '';
    pokemon.abilities.forEach(abilityObj => {
        const habilidad = document.createElement('p');
        habilidad.textContent = `• ${abilityObj.ability.name}`;
        habilidad.style.textTransform = 'capitalize';
        abilitiesDiv.appendChild(habilidad);
    });

    // Mostrar modal
    pokemonModal.classList.add('show');
}

/**
 * Formatea el nombre de las estadísticas
 */
function formatearNombreStat(nombre) {
    const traduccion = {
        'hp': 'HP',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'At. Esp.',
        'special-defense': 'Def. Esp.',
        'speed': 'Velocidad'
    };
    return traduccion[nombre] || nombre;
}

/**
 * Cierra el modal
 */
function cerrarModal() {
    pokemonModal.classList.remove('show');
}

// ==================== EVENT LISTENERS ====================

// Botón de búsqueda
btnBuscar.addEventListener('click', () => {
    const termino = inputPokemon.value;
    filtrarPokemon(termino);
});

// Buscar al presionar Enter
inputPokemon.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const termino = inputPokemon.value;
        filtrarPokemon(termino);
    }
});

// Cerrar modal
modalClose.addEventListener('click', cerrarModal);
pokemonModal.addEventListener('click', (e) => {
    if (e.target === pokemonModal) {
        cerrarModal();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pokemonModal.classList.contains('show')) {
        cerrarModal();
    }
});

// ==================== INICIALIZACIÓN ====================

// Cargar todos los Pokémon al abrir la página
window.addEventListener('DOMContentLoaded', cargarTodosPokemon);
