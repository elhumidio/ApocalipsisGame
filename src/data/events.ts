import { GameEvent, Location, BaseUpgrade, Achievement, RadioMessage, Survivor, Weather } from '../types/game';

// ============ SURVIVORS ============
export const allSurvivors: Survivor[] = [
  { id: 'maria', name: 'María', skill: 'medic', health: 100, loyalty: 80, description: 'Enfermera retirada. Calma bajo presión.', avatar: '👩‍⚕️', alive: true },
  { id: 'carlos', name: 'Carlos', skill: 'fighter', health: 100, loyalty: 70, description: 'Ex-militar. Letal pero desconfiado.', avatar: '🪖', alive: true },
  { id: 'luna', name: 'Luna', skill: 'scout', health: 100, loyalty: 90, description: 'Joven exploradora. Rápida y sigilosa.', avatar: '🏃‍♀️', alive: true },
  { id: 'viktor', name: 'Viktor', skill: 'engineer', health: 100, loyalty: 60, description: 'Ingeniero ruso. Puede construir cualquier cosa.', avatar: '🔧', alive: true },
  { id: 'ana', name: 'Ana', skill: 'cook', health: 100, loyalty: 85, description: 'Chef. Hace magia con lo que encuentra.', avatar: '👩‍🍳', alive: true },
  { id: 'diego', name: 'Diego', skill: 'leader', health: 100, loyalty: 75, description: 'Ex-alcalde. Carismático pero ambicioso.', avatar: '🎩', alive: true },
  { id: 'sofia', name: 'Sofía', skill: 'medic', health: 100, loyalty: 65, description: 'Estudiante de medicina. Idealista.', avatar: '💉', alive: true },
  { id: 'marco', name: 'Marco', skill: 'fighter', health: 100, loyalty: 50, description: 'Luchador de MMA. Fuerza bruta.', avatar: '🥊', alive: true },
];

// ============ WEATHER ============
export const weatherTypes: Weather[] = [
  { type: 'clear', name: 'Cielo Despejado', description: 'Un día relativamente normal.', icon: '☀️', duration: 1, effects: {} },
  { type: 'rain', name: 'Lluvia Ácida', description: 'Lluvia corrosiva. El cielo llora veneno.', icon: '🌧️', duration: 2, effects: { health: -5, water: 5 } },
  { type: 'storm', name: 'Tormenta Eléctrica', description: 'Rayos sin precedentes. La tierra tiembla.', icon: '⛈️', duration: 1, effects: { morale: -10, fuel: -3 } },
  { type: 'radiation', name: 'Nube Radiactiva', description: 'Una nube verdosa se acerca. Los contadores Geiger enloquecen.', icon: '☢️', duration: 3, effects: { health: -15, morale: -10 } },
  { type: 'fog', name: 'Niebla Sobrenatural', description: 'Una niebla espesa que no es natural. Se escuchan voces.', icon: '🌫️', duration: 2, effects: { morale: -15 } },
  { type: 'blood_rain', name: 'Lluvia de Sangre', description: 'Llueve un líquido rojo. Las profecías se cumplen.', icon: '🩸', duration: 1, effects: { morale: -25, health: -5 } },
  { type: 'eclipse', name: 'Eclipse Total', description: 'El sol desaparece. Las sombras se mueven solas.', icon: '🌑', duration: 1, effects: { morale: -20 } },
];

// ============ ACHIEVEMENTS ============
export const allAchievements: Achievement[] = [
  { id: 'first_day', name: 'Primer Amanecer', description: 'Sobrevive el primer día', icon: '🌅', unlocked: false, condition: 'day >= 1' },
  { id: 'week_survivor', name: 'Una Semana', description: 'Sobrevive 7 días', icon: '📅', unlocked: false, condition: 'day >= 7' },
  { id: 'two_weeks', name: 'Quincena Maldita', description: 'Sobrevive 14 días', icon: '🗓️', unlocked: false, condition: 'day >= 14' },
  { id: 'month', name: 'Un Mes en el Infierno', description: 'Sobrevive 30 días', icon: '🏆', unlocked: false, condition: 'day >= 30' },
  { id: 'savior', name: 'El Salvador', description: 'Salva a 5 personas', icon: '😇', unlocked: false, condition: 'saved >= 5' },
  { id: 'ruthless', name: 'Sin Piedad', description: 'Traiciona a 3 personas', icon: '🗡️', unlocked: false, condition: 'betrayed >= 3' },
  { id: 'zombie_slayer', name: 'Cazador de No-Muertos', description: 'Elimina 20 zombis', icon: '🧟', unlocked: false, condition: 'kills >= 20' },
  { id: 'collector', name: 'Explorador', description: 'Descubre todas las ubicaciones', icon: '🗺️', unlocked: false, condition: 'all_locations' },
  { id: 'builder', name: 'Arquitecto', description: 'Construye 5 mejoras en la base', icon: '🏗️', unlocked: false, condition: 'upgrades >= 5' },
  { id: 'saint', name: 'Santidad', description: 'Mantén moral al 100%', icon: '✨', unlocked: false, condition: 'morale_100' },
  { id: 'warlord', name: 'Señor de la Guerra', description: 'Acumula 50 de munición', icon: '💣', unlocked: false, condition: 'ammo_50' },
  { id: 'mysterious', name: 'El Elegido', description: 'Descifra todos los mensajes de radio', icon: '📻', unlocked: false, condition: 'all_radio' },
  { id: 'good_ending', name: 'Redención', description: 'Alcanza el final bueno', icon: '🕊️', unlocked: false, condition: 'ending_good' },
  { id: 'bad_ending', name: 'Condena', description: 'Alcanza el final malo', icon: '😈', unlocked: false, condition: 'ending_bad' },
  { id: 'secret_ending', name: 'La Verdad', description: 'Descubre el secreto del apocalipsis', icon: '👁️', unlocked: false, condition: 'ending_secret' },
];

// ============ BASE UPGRADES ============
export const baseUpgrades: BaseUpgrade[] = [
  { id: 'walls', name: 'Muros Reforzados', description: 'Reduce ataques zombi un 30%', icon: '🧱', cost: { materials: 20, fuel: 5 }, effect: 'defense', level: 0, maxLevel: 3, built: false },
  { id: 'garden', name: 'Huerto', description: 'Genera +5 comida por día', icon: '🌱', cost: { materials: 10, water: 10 }, effect: 'food_gen', level: 0, maxLevel: 3, built: false },
  { id: 'well', name: 'Pozo de Agua', description: 'Genera +5 agua por día', icon: '💧', cost: { materials: 15, fuel: 5 }, effect: 'water_gen', level: 0, maxLevel: 3, built: false },
  { id: 'medbay', name: 'Enfermería', description: 'Regenera +5 salud por día', icon: '🏥', cost: { materials: 15, meds: 10 }, effect: 'health_gen', level: 0, maxLevel: 2, built: false },
  { id: 'radio_tower', name: 'Torre de Radio', description: 'Recibe más mensajes de radio', icon: '📡', cost: { materials: 20, fuel: 10 }, effect: 'radio', level: 0, maxLevel: 2, built: false },
  { id: 'generator', name: 'Generador', description: 'Permite usar electricidad. Desbloquea mejoras.', icon: '⚡', cost: { materials: 25, fuel: 15 }, effect: 'power', level: 0, maxLevel: 1, built: false },
  { id: 'watchtower', name: 'Torre de Vigilancia', description: 'Detecta amenazas con antelación', icon: '🗼', cost: { materials: 20, fuel: 5 }, effect: 'warning', level: 0, maxLevel: 1, built: false },
  { id: 'armory', name: 'Armería', description: 'Crafting de munición. +2 munición/día', icon: '🔫', cost: { materials: 30, fuel: 10 }, effect: 'ammo_gen', level: 0, maxLevel: 2, built: false },
  { id: 'lab', name: 'Laboratorio', description: 'Investiga el origen del apocalipsis', icon: '🔬', cost: { materials: 25, meds: 15 }, effect: 'research', level: 0, maxLevel: 3, built: false },
  { id: 'shrine', name: 'Santuario', description: '+10 moral por día. Fe en tiempos oscuros.', icon: '⛪', cost: { materials: 15 }, effect: 'morale_gen', level: 0, maxLevel: 1, built: false },
];

// ============ RADIO MESSAGES ============
export const radioMessages: RadioMessage[] = [
  { id: 'msg1', sender: '???', message: 'No son naturales. Los terremotos... los eclipses... todo es una señal. Ellos vienen.', type: 'warning', day: 1, decoded: false },
  { id: 'msg2', sender: 'Base Norte', message: 'Si escuchan esto, vayan al norte. Coordenadas 42.3, -71.0. Hay un refugio. Pero no confíen en...', type: 'help', day: 3, decoded: false },
  { id: 'msg3', sender: 'FRECUENCIA MUERTA', message: '01001000 01000101 01001100 01010000. Ellos ya están aquí. No son de este mundo.', type: 'mystery', day: 5, decoded: false },
  { id: 'msg4', sender: 'Dr. Morales', message: 'El virus no es natural. Fue diseñado. Alguien quería esto. Busquen el Laboratorio Omega.', type: 'intel', day: 7, decoded: false },
  { id: 'msg5', sender: '???', message: 'He visto lo que hay al otro lado. No hay infierno. Hay algo peor. Ellos nos observan.', type: 'mystery', day: 10, decoded: false },
  { id: 'msg6', sender: 'Comando Central', message: 'Protocolo Génesis activado. Todos los agentes: procedan con la Fase 3. El mundo debe arder para renacer.', type: 'intel', day: 12, decoded: false },
  { id: 'msg7', sender: 'LA ENTIDAD', message: 'Hijos míos. El ciclo se repite. Ustedes no son los primeros. No serán los últimos. Pero pueden elegir.', type: 'mystery', day: 15, decoded: false },
  { id: 'msg8', sender: 'Sobreviviente Final', message: 'Si alguien escucha esto... la cura está en el búnker. Coordenadas encriptadas. La clave es: APOCALIPSIS.', type: 'help', day: 20, decoded: false },
];

// ============ GAME EVENTS ============
export const gameEvents: GameEvent[] = [
  // === MORAL EVENTS ===
  {
    id: 'stranger_door',
    title: '🚪 Alguien Llama a la Puerta',
    description: 'Es de noche. Escuchas golpes desesperados. Una mujer suplica ayuda, dice que la persiguen. Podría ser una trampa...',
    category: 'moral',
    choices: [
      { text: 'Abrir y ayudar', effects: { morale: 15, food: -5 }, outcome: 'La mujer trae información sobre un almacén. Tu grupo recupera humanidad.', addFlag: 'helped_stranger', achievementId: 'savior' },
      { text: 'Ignorar', effects: { morale: -10 }, outcome: 'Los golpes cesan. A la mañana encuentras sangre. El grupo no te mira igual.' },
      { text: 'Abrir con arma preparada', effects: { ammo: -2, morale: 5 }, outcome: 'Era civil. Pero tu precaución salvó al grupo de saqueadores que la seguían.' },
    ],
  },
  {
    id: 'child_alone',
    title: '👧 Niño Solo en la Carretera',
    description: 'Un niño de 8 años camina solo. Sucio, descalzo. Lleva un dibujo de su familia. Dice que busca a sus padres.',
    category: 'moral',
    choices: [
      { text: 'Acogerlo en el grupo', effects: { food: -8, water: -5, morale: 20 }, outcome: 'Se llama Miguel. Callado pero inteligente. El grupo recuerda por qué lucha.', addFlag: 'saved_miguel' },
      { text: 'Darle suministros y enviarlo', effects: { food: -5, water: -3, morale: 5 }, outcome: 'Se va agradecido. No sabes si sobrevivirá. El grupo está dividido.' },
      { text: 'No puedes permitirte más bocas', effects: { morale: -20 }, outcome: 'El grupo no te perdona. La línea entre supervivencia y humanidad se desdibuja.', addFlag: 'abandoned_child' },
    ],
  },
  {
    id: 'betrayal',
    title: '🗡️ Traición Interna',
    description: 'Alguien del grupo roba suministros. Cuando lo confrontas, dice que tiene una familia escondida en otro lugar.',
    category: 'moral',
    minDay: 4,
    choices: [
      { text: 'Perdonar y entender', effects: { morale: -5, food: -5 }, outcome: 'Su "otra familia" son niños huérfanos. Un héroe silencioso. La moral sube.' },
      { text: 'Exiliarlo del grupo', effects: { morale: -15, food: 5 }, outcome: 'Se va sin resistir. Algunos te miran con miedo. Otros con aprobación.', addFlag: 'exiled_member' },
      { text: 'Proponer acuerdo: traer a todos', effects: { morale: 10, food: -8 }, outcome: 'Más bocas, más manos. Y quizás, más esperanza.' },
    ],
  },

  // === ZOMBIE EVENTS ===
  {
    id: 'zombie_horde',
    title: '🧟 Horda de No-Muertos',
    description: 'Una horda de infectados se acerca al refugio. Son cientos. Sus ojos brillan en la oscuridad. Gritan con voces que no son humanas.',
    category: 'zombie',
    minDay: 3,
    weight: 2,
    choices: [
      { text: 'Defender con todo el arsenal', effects: { ammo: -15, morale: 10, health: -5 }, outcome: '¡Victoria! Cae horda tras horda. Pero la munición se agota. ¿Cuántas más vendrán?', addFlag: 'defended_horde' },
      { text: 'Usar explosivos y barricadas', effects: { fuel: -15, materials: -10, morale: 5 }, outcome: 'Los explosivos diezman la horda. Los muros aguantan. Pero el ruido atraerá más.', addFlag: 'used_explosives' },
      { text: 'Huir por la noche', effects: { fuel: -10, morale: -15 }, outcome: 'Escapan, pero pierden el refugio. Días de construcción, perdidos en una noche.', addFlag: 'fled_horde' },
      { text: 'Ofrenda de carne para distraerlos', effects: { food: -20, morale: -10 }, outcome: 'Funciona... por ahora. Los muertos se alimentan y pasan de largo. Pero saben que estás aquí.' },
    ],
  },
  {
    id: 'zombie_survivor',
    title: '🧟‍♂️ Superviviente Mordido',
    description: 'Encuentras a un superviviente mordido. Aún es consciente. Suplica que no lo dejes convertir. O que lo cures si es posible.',
    category: 'zombie',
    minDay: 5,
    choices: [
      { text: 'Intentar curarlo con medicinas', effects: { meds: -10, morale: 5 }, outcome: 'Milagrosamente, la infección se detiene. ¿Inmunidad? Esto podría cambiar todo.', addFlag: 'cured_zombie', addSurvivor: allSurvivors[6] },
      { text: 'Cumplir su deseo: dispararle', effects: { ammo: -1, morale: -5 }, outcome: 'Te lo agradece con su último aliento humano. "Gracias... por tratarme como persona."', addFlag: 'mercy_kill' },
      { text: 'Atarlo y estudiarlo', effects: { morale: -15, health: -5 }, outcome: 'Se convierte. Escapa. Ahora hay un zombie que te conoce. Vuelve con más.', addFlag: 'zombie_studied' },
    ],
  },
  {
    id: 'zombie_nest',
    title: '🏚️ Nido de Infectados',
    description: 'Un edificio colapsado repleto de no-muertos. Pero entre ellos ves suministros militares intactos. ¿Vale la pena el riesgo?',
    category: 'zombie',
    minDay: 4,
    choices: [
      { text: 'Asalto frontal con el equipo', effects: { health: -10, ammo: 5, meds: 10 }, outcome: 'Masacre brutal. Pero el botín es increíble: armas, medicinas, raciones. Carlos dice: "Profesional."', addFlag: 'raided_nest' },
      { text: 'Distracción con ruido y entrar sigilosamente', effects: { fuel: -5, ammo: 5, meds: 5 }, outcome: 'Luna crea la distracción. Entras, tomas lo que puedes, sales. Limpio.', addFlag: 'stealth_nest' },
      { text: 'Demasiado peligroso. Volver.', effects: { morale: -5 }, outcome: 'Prudencia. Pero el grupo sabe que ahí había algo valioso. La próxima vez quizás.' },
    ],
  },

  // === WEATHER EVENTS ===
  {
    id: 'radiation_storm',
    title: '☢️ Tormenta Radiactiva',
    description: 'Los contadores Geiger enloquecen. Una nube verdosa se acerca desde el este. Tienen minutos para decidir.',
    category: 'weather',
    minDay: 5,
    weight: 2,
    choices: [
      { text: 'Refugiarse en el sótano sellado', effects: { health: -5, morale: -5 }, outcome: 'Sobreviven, pero la radiación se filtra. Dolor de cabeza, náuseas. Pasará.', addFlag: 'survived_radiation' },
      { text: 'Usar trajes improvisados y sellar el refugio', effects: { materials: -10, fuel: -5 }, outcome: 'Los trajes aguantan lo suficiente. El refugio queda sellado. Seguro, pero consumiste recursos.' },
      { text: 'Correr hacia el oeste, alejarse', effects: { fuel: -15, water: -10 }, outcome: 'Escapan de la nube. Pero el viaje consume recursos vitales. El mapa cambia.' },
    ],
  },
  {
    id: 'blood_rain_event',
    title: '🩸 Llueve Sangre',
    description: 'Un líquido rojo cae del cielo. Huele a hierro. Los animales huyen. La radio solo emite estática. El cielo... observa.',
    category: 'weather',
    minDay: 7,
    choices: [
      { text: 'Refugiarse y cubrir todo', effects: { morale: -10, health: 5 }, outcome: 'El líquido corroe lo que toca. Sobrevives. Pero el mundo parece más hostil que nunca.' },
      { text: 'Recoger muestras', effects: { health: -10, morale: -5 }, outcome: 'Organismos microscópicos que no deberían existir. El conocimiento tiene un precio.', addFlag: 'blood_sample' },
      { text: 'Rezar y esperar', effects: { morale: 10 }, outcome: 'La lluvia se detiene alrededor del refugio como si una barrera invisible los protegiera. ¿Fe? ¿Suerte? ¿Algo más?', addFlag: 'divine_protection' },
    ],
  },
  {
    id: 'eclipse_event',
    title: '🌑 Eclipse Total',
    description: 'Oscuridad total a mediodía. En las sombras ves figuras que no son humanas. Se mueven de forma imposible. El eclipse... las libera.',
    category: 'weather',
    minDay: 10,
    choices: [
      { text: 'Esconderse y no mirar', effects: { morale: -15 }, outcome: 'Susurros imposibles durante horas. Cuando sale el sol, ya no están. Pero dejaron marcas.' },
      { text: 'Observar con binoculares', effects: { health: -5, morale: -20 }, outcome: 'Lo que ves no debería existir. Tendrás pesadillas por semanas. Pero ahora sabes a qué os enfrentáis.', addFlag: 'saw_entities' },
      { text: 'Encender todas las luces', effects: { fuel: -15, morale: 10 }, outcome: 'La luz las repele. Descubres una debilidad. El conocimiento es poder.', addFlag: 'light_weakness' },
    ],
  },

  // === RADIO EVENTS ===
  {
    id: 'radio_mystery',
    title: '📻 Señal de Radio Misteriosa',
    description: 'Tu radio capta una señal: "Coordenadas 34.0522. Refugio seguro. Traigan suministros para entrar. Repito: TRAEGAN SUMINISTROS."',
    category: 'radio',
    minDay: 2,
    choices: [
      { text: 'Ir a las coordenadas', effects: { fuel: -15, food: -10, morale: 10 }, outcome: 'Encuentras una comunidad organizada. Te ofrecen un trato: suministros por trabajo. Esperanza real.', addFlag: 'found_community' },
      { text: 'Responder por radio', effects: { morale: 5 }, outcome: 'Nadie responde, pero la señal se repite cada noche. ¿Grabación? ¿Alguien real?', addFlag: 'radio_contact' },
      { text: 'Ignorar - parece trampa', effects: { morale: -5 }, outcome: 'Quizás era seguro, quizás no. Nunca lo sabrás.' },
    ],
  },
  {
    id: 'radio_warning',
    title: '📻 Transmisión de Emergencia',
    description: '"¡A TODOS LOS SUPERVIVIENTES! No vayan al este. Repito: NO VAYAN AL ESTE. Hay algo... algo que no es de este mundo. Dios nos ampare."',
    category: 'radio',
    minDay: 6,
    choices: [
      { text: 'Investigar el este de todos modos', effects: { fuel: -10, health: -15, ammo: 20, materials: 15 }, outcome: 'Encontraste un campamento militar destruido. Y algo más. Algo que aún se mueve entre los escombros.', addFlag: 'explored_east' },
      { text: 'Obedecer y fortalecer defensas al este', effects: { materials: -10, morale: 5 }, outcome: 'Sabiduría. Esa noche escuchan aullidos desde el este. Algo se acerca. Pero están preparados.' },
      { text: 'Transmitir tu propia advertencia', effects: { morale: 10 }, outcome: 'Otras radios responden. No están solos. Una red de supervivientes se forma en la oscuridad.', addFlag: 'radio_network' },
    ],
  },

  // === NPC EVENTS ===
  {
    id: 'recruit_medic',
    title: '👩‍⚕️ Enfermera Herida',
    description: 'Encuentras a María, una enfermera, herida pero viva. Dice que puede ayudar a tu grupo si la aceptan.',
    category: 'npc',
    minDay: 2,
    choices: [
      { text: 'Acogerla y curarla', effects: { meds: -10, morale: 15 }, outcome: 'María se une al grupo. Sus habilidades médicas salvan vidas. "Estoy con ustedes hasta el final."', addSurvivor: allSurvivors[0], addFlag: 'recruited_maria' },
      { text: 'Darle suministros y dejarla ir', effects: { meds: -5, morale: 5 }, outcome: 'Se va agradecida. "Si necesitan ayuda, estaré cerca." Quizás vuelva.' },
      { text: 'No tenemos recursos para más', effects: { morale: -10 }, outcome: 'Se va con lágrimas. El grupo siente el peso de la decisión.' },
    ],
  },
  {
    id: 'recruit_fighter',
    title: '🪖 Soldado Desertor',
    description: 'Carlos, un ex-militar, aparece en tu perímetro. Dice que desertó. Sabe combatir. Pero sus ojos cuentan otra historia.',
    category: 'npc',
    minDay: 3,
    choices: [
      { text: 'Reclutarlo tras verificar su historia', effects: { morale: 5, food: -5 }, outcome: 'Carlos se une. Es letal y eficiente. "He visto cosas que no puedo contar. Pero lucharé por ustedes."', addSurvivor: allSurvivors[1], addFlag: 'recruited_carlos' },
      { text: 'No confío en militares', effects: { morale: -5 }, outcome: 'Se va sin decir palabra. ¿Era aliado o amenaza? Nunca lo sabrás.' },
      { text: 'Reclutarlo pero con vigilancia', effects: { morale: -5, food: -5 }, outcome: 'Acepta las condiciones. "Justo. Yo tampoco confiaría en mí." Al menos es honesto.', addSurvivor: allSurvivors[1], addFlag: 'recruited_carlos_wary' },
    ],
  },
  {
    id: 'hostile_group',
    title: '🔫 Grupo Hostil',
    description: 'Un grupo armado bloquea tu camino. Su líder, un hombre con cicatrices, exige un "peaje". O pagas, o hay problemas.',
    category: 'npc',
    minDay: 4,
    choices: [
      { text: 'Pagar el peaje', effects: { food: -15, fuel: -10 }, outcome: 'Te dejan pasar. Debilidad. Pero tu grupo vive. A veces la prudencia es supervivencia.' },
      { text: 'Negociar', effects: { food: -5, morale: 5 }, outcome: 'Tras tensa negociación, aceptan menos. "Eres listo. Quizás nos veamos de nuevo." ¿Amigo o enemigo futuro?' },
      { text: 'Combatir', effects: { health: -10, food: 10, ammo: -3 }, outcome: 'Batalla brutal. Ganas, pero a qué costo. Saqueas sus suministros. La moral es... compleja.', addFlag: 'fought_bandits' },
    ],
  },

  // === EXPLORATION EVENTS ===
  {
    id: 'abandoned_hospital',
    title: '🏥 Hospital Abandonado',
    description: 'Un hospital en ruinas. Podría tener medicinas vitales, pero los hospitales abandonados suelen esconder horrores...',
    category: 'exploration',
    choices: [
      { text: 'Entrar con el equipo completo', effects: { health: 20, food: -5, fuel: -5 }, outcome: 'Botiquín completo y antibióticos. Pero hay marcas de garras en las paredes. Algo salió de aquí.' },
      { text: 'Enviar un explorador solo', effects: { health: 10 }, outcome: 'Regresa con medicinas básicas. Pero dice que hay "algo" en el sótano que no quiere describir.' },
      { text: 'Mejor no arriesgarse', effects: { morale: -5 }, outcome: 'El grupo entiende la prudencia. Pero todos saben que necesitan medicinas.' },
    ],
  },
  {
    id: 'underground_bunker',
    title: '🔐 Búnker Subterráneo',
    description: 'Un búnker militar sellado. La cerradura electrónica aún tiene energía. Podría contener suministros increíbles... o algo terrible.',
    category: 'exploration',
    minDay: 5,
    choices: [
      { text: 'Forzar la entrada', effects: { fuel: -5, health: 15, ammo: 10 }, outcome: '¡Jackpot! Raciones, munición, generador. Pero en las paredes hay marcas de garras. Algo salió de aquí.', addFlag: 'bunker_opened' },
      { text: 'Investigar alrededores primero', effects: { fuel: -3 }, outcome: 'Notas de un soldado: "Día 47. Ya no son humanos. NO ABRAS." Decides no arriesgarte.', addFlag: 'bunker_warning' },
      { text: 'Marcar y volver después', effects: { morale: 5 }, outcome: 'Sabiduría. Volverás mejor preparados. Una carta bajo la manga.', addFlag: 'bunker_marked' },
    ],
  },

  // === SURVIVAL EVENTS ===
  {
    id: 'trader_caravan',
    title: '🐴 Caravana de Comerciantes',
    description: 'Comerciantes supervivientes llegan. Tienen medicinas, armas y comida. Pero sus precios son... creativos.',
    category: 'survival',
    choices: [
      { text: 'Comprar medicinas (cuesta combustible)', effects: { fuel: -10, health: 25 }, outcome: 'Medicinas de calidad. El líder dice: "Ve al norte. Hay una ciudad que aún vive."', addFlag: 'trader_north_info' },
      { text: 'Comprar armas (cuesta comida)', effects: { food: -12, ammo: 15 }, outcome: 'Mejor armados. Advierten: "Se acerca algo grande desde el este."', addFlag: 'trader_east_warning' },
      { text: 'Intercambiar información por suministros', effects: { morale: 5, food: 5, meds: 5 }, outcome: 'Comparten mapas. Tú compartes lo que sabes. Una red de información se forma.' },
    ],
  },
  {
    id: 'clean_water',
    title: '💧 Fuente de Agua Pura',
    description: 'Un manantial cristalino en medio de la desolación. El agua es pura, pero hay huesos de animales alrededor. Algunos se ven... wrong.',
    category: 'survival',
    choices: [
      { text: 'Llenar todos los contenedores', effects: { water: 30, health: -5 }, outcome: 'El agua sacia. Pero días después, algunos tienen malestar. El agua era pura... pero los que bebieron antes no.' },
      { text: 'Hervir antes de usar', effects: { water: 20, fuel: -5 }, outcome: 'Precaución paga. Agua limpia y segura. El grupo descansa. Un lujo.' },
      { text: 'Marcar y racionar visitas', effects: { water: 10, morale: 5 }, outcome: 'Sabiduría a largo plazo. Vuestra fuente secreta. Recurso sostenible.', addFlag: 'water_source' },
    ],
  },

  // === SUPERNATURAL EVENTS ===
  {
    id: 'earthquake_aftermath',
    title: '💀 Después del Terremoto',
    description: 'Un terremoto masivo abre grietas. De una emana calor sobrenatural y olor a azufre. Algo se mueve abajo...',
    category: 'supernatural',
    minDay: 3,
    choices: [
      { text: 'Explorar la grieta', effects: { health: -15, morale: -10, ammo: -3 }, outcome: 'Lo que encuentras abajo no tiene nombre. Escapas por poco. El infierno no es metáfora.', addFlag: 'saw_hell' },
      { text: 'Sellar la grieta', effects: { fuel: -5, morale: 5 }, outcome: 'Los sonidos cesan. Pero por la noche, todos sueñan lo mismo: fuego y gritos.' },
      { text: 'Huir de la zona', effects: { fuel: -10, morale: -5 }, outcome: 'Abandonan el área. Dejaron suministros atrás. El debate continúa.' },
    ],
  },
  {
    id: 'the_entity',
    title: '👁️ La Entidad',
    description: 'En la niebla, ves una figura colossal. No tiene forma definida. Te mira. Te habla sin palabras. Te ofrece... algo.',
    category: 'supernatural',
    minDay: 15,
    choices: [
      { text: 'Aceptar su ofrecimiento', effects: { health: 30, ammo: 20, morale: -30 }, outcome: 'Poder. Recursos. Pero algo dentro de ti cambió. Ya no eres completamente humano. ¿Vale la pena?', addFlag: 'entity_pact', achievementId: 'bad_ending' },
      { text: 'Rechazar y resistir', effects: { health: -20, morale: 20 }, outcome: 'La entidad ríe. "Todos vienen a mí al final." Desaparece. Pero ahora sabes que existe. Y que te recuerda.', addFlag: 'entity_resisted' },
      { text: 'Hablar con ella. Preguntar por qué.', effects: { morale: -10 }, outcome: '"El ciclo. Siempre el ciclo. Ustedes son el intento 847. Los anteriores fallaron. ¿Serán diferentes?"', addFlag: 'entity_truth' },
    ],
  },
];

// ============ LOCATIONS ============
export const locations: Location[] = [
  { id: 'base', name: 'Refugio Base', description: 'Tu hogar fortificado.', icon: '🏚️', danger: 1, loot: ['comida básica', 'agua'], discovered: true, explored: true, zombieLevel: 0 },
  { id: 'hospital', name: 'Hospital Abandonado', description: 'Ruinas con posible medicina... y horrores.', icon: '🏥', danger: 4, loot: ['medicinas', 'vendajes'], discovered: false, explored: false, zombieLevel: 3 },
  { id: 'supermarket', name: 'Supermercado Saqueado', description: 'Aún quedan cosas. Otros buscan lo mismo.', icon: '🏪', danger: 3, loot: ['comida', 'agua', 'herramientas'], discovered: false, explored: false, zombieLevel: 2 },
  { id: 'gas_station', name: 'Gasolinera', description: 'Combustible escaso pero vital.', icon: '⛽', danger: 3, loot: ['combustible', 'snacks'], discovered: false, explored: false, zombieLevel: 1 },
  { id: 'military_base', name: 'Base Militar', description: 'Abandonada. Armas y suministros.', icon: '🎖️', danger: 5, loot: ['armas', 'munición', 'raciones MRE'], discovered: false, explored: false, zombieLevel: 4 },
  { id: 'church', name: 'Iglesia en Ruinas', description: 'Vitrales rotos. Pero hay paz. Y respuestas.', icon: '⛪', danger: 2, loot: ['velas', 'libros', 'refugio'], discovered: false, explored: false, zombieLevel: 0 },
  { id: 'bunker', name: 'Búnker Secreto', description: 'De la Guerra Fría. Sellado por décadas.', icon: '🔐', danger: 5, loot: ['suministros militares', 'generador', 'documentos'], discovered: false, explored: false, zombieLevel: 2 },
  { id: 'forest', name: 'Bosque Oscuro', description: 'Crecimiento antinatural. Animales cambiados.', icon: '🌲', danger: 4, loot: ['madera', 'plantas', 'carne'], discovered: false, explored: false, zombieLevel: 3 },
  { id: 'lab_omega', name: 'Laboratorio Omega', description: 'Donde todo comenzó. La verdad espera.', icon: '🔬', danger: 5, loot: ['datos clasificados', 'cura experimental', 'la verdad'], discovered: false, explored: false, zombieLevel: 5 },
];
