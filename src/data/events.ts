import { GameEvent, Location } from '../types/game';

export const gameEvents: GameEvent[] = [
  {
    id: 'stranger_door',
    title: '🚪 Alguien Llama a la Puerta',
    description: 'Es de noche. Escuchas golpes desesperados en tu refugio. Una voz de mujer suplica ayuda, dice que la persiguen. Podría ser una trampa...',
    category: 'moral',
    choices: [
      {
        text: 'Abrir la puerta y ayudar',
        effects: { morale: 15, food: -5 },
        outcome: 'La mujer agradece con lágrimas. Trae información valiosa sobre un almacén cercano. Tu grupo se siente orgulloso de haber ayudado.',
      },
      {
        text: 'Ignorar y permanecer en silencio',
        effects: { morale: -10 },
        outcome: 'Los golpes cesan. A la mañana siguiente encuentras manchas de sangre. Tu grupo no te mira igual.',
      },
      {
        text: 'Abrir con el arma preparada',
        effects: { ammo: -2, morale: 5 },
        outcome: 'Era realmente una civil asustada. Pero tu precaución salvó al grupo - dos saqueadores la seguían de cerca.',
      },
    ],
  },
  {
    id: 'abandoned_hospital',
    title: '🏥 Hospital Abandonado',
    description: 'Descubres un hospital que parece intacto. Podría tener medicinas vitales, pero los hospitales abandonados suelen ser nidos de peligros...',
    category: 'exploration',
    choices: [
      {
        text: 'Entrar con el equipo completo',
        effects: { health: 20, food: -5, fuel: -5 },
        outcome: 'Encuentras un botiquín completo y antibióticos. Pero el tiempo que tardaste consumió recursos. Vale la pena.',
      },
      {
        text: 'Enviar un explorador solo',
        effects: { health: 10 },
        outcome: 'Tu explorador regresa con algunas medicinas básicas, pero dice que hay "algo" en el sótano que no quiere describir.',
      },
      {
        text: 'Es mejor no arriesgarse',
        effects: { morale: -5 },
        outcome: 'El grupo entiende la prudencia, pero todos saben que necesitan medicinas. El tiempo pasa...',
      },
    ],
  },
  {
    id: 'radio_signal',
    title: '📻 Señal de Radio Misteriosa',
    description: 'Tu radio capta una señal débil: "Coordenadas 34.0522, -118.2437. Refugio seguro. Traigan suministros para entrar. Repito: TRAEGAN SUMINISTROS."',
    category: 'supernatural',
    choices: [
      {
        text: 'Ir a las coordenadas',
        effects: { fuel: -15, food: -10, morale: 10 },
        outcome: 'El viaje es peligroso pero encuentras una comunidad organizada. Te ofrecen un trato: suministros por trabajo. Una esperanza real.',
      },
      {
        text: 'Intentar responder por radio',
        effects: { morale: 5 },
        outcome: 'Nadie responde, pero la señal se repite cada noche a la misma hora. ¿Es una grabación? ¿Alguien real? El misterio inquieta al grupo.',
      },
      {
        text: 'Ignorar - parece una trampa',
        effects: { morale: -5 },
        outcome: 'Quizás era seguro, quizás no. Nunca lo sabrás. La incertidumbre carcome la moral del grupo.',
      },
    ],
  },
  {
    id: 'mutant_wolves',
    title: '🐺 Manada de Lobos Mutantes',
    description: 'Una manada de lobos deformes rodea tu campamento. Son más grandes de lo normal, con ojos brillantes. Parecen hambrientos y organizados.',
    category: 'combat',
    choices: [
      {
        text: 'Disparar para ahuyentarlos',
        effects: { ammo: -8, morale: 5 },
        outcome: 'Los disparos dispersan a la manada temporalmente. Volverán, pero hoy sobreviviste. El grupo admira tu valentía.',
      },
      {
        text: 'Hacer una hoguera gigante',
        effects: { fuel: -10 },
        outcome: 'El fuego los mantiene a raya toda la noche. Al amanecer se retiran. Gastaste combustible pero nadie resultó herido.',
      },
      {
        text: 'Dejar comida como ofrenda',
        effects: { food: -15, morale: -5 },
        outcome: 'Los lobos devoran la comida y se van. Extrañamente, durante días no han aparecido más. ¿Te reconocen como proveedor?',
      },
    ],
  },
  {
    id: 'child_alone',
    title: '👧 Niño Solo en la Carretera',
    description: 'Un niño de unos 8 años camina solo por la carretera. Está sucio, descalzo y lleva un dibujo de su familia. Dice que busca a sus padres.',
    category: 'moral',
    choices: [
      {
        text: 'Acogerlo en el grupo',
        effects: { food: -8, water: -5, morale: 20 },
        outcome: 'El niño se llama Miguel. Es callado pero inteligente. El grupo recupera algo de humanidad. Recuerdan por qué luchan.',
      },
      {
        text: 'Darle suministros y señalarle el camino',
        effects: { food: -5, water: -3, morale: 5 },
        outcome: 'El niño agradece y se va. No sabes si sobrevivirá, pero al menos tendrá una oportunidad. El grupo está dividido.',
      },
      {
        text: 'No puedes permitirte más bocas',
        effects: { morale: -20 },
        outcome: 'El grupo no te perdona fácilmente. Algunos lloran en silencio. La línea entre supervivencia y humanidad se desdibuja.',
      },
    ],
  },
  {
    id: 'underground_bunker',
    title: '🔐 Búnker Subterráneo',
    description: 'Encuentras la entrada a un búnker militar sellado. La cerradura electrónica aún tiene energía. Podría contener suministros increíbles... o algo terrible.',
    category: 'exploration',
    minDay: 5,
    choices: [
      {
        text: 'Forzar la entrada',
        effects: { fuel: -5, health: 15, ammo: 10 },
        outcome: '¡Jackpot! Raciones militares, munición y un generador. Pero en las paredes hay marcas de garras. Algo salió de aquí. Algo que aún podría estar suelto.',
      },
      {
        text: 'Investigar primero los alrededores',
        effects: { fuel: -3 },
        outcome: 'Encuentras notas de un soldado: "Día 47. Ya no son humanos. Si encuentras esto, NO ABRAS. Dios nos perdone." Decides no arriesgarte.',
      },
      {
        text: 'Marcar la ubicación y volver después',
        effects: { morale: 5 },
        outcome: 'Sabiduría. Volverás mejor preparados. El búnker te espera. Una carta bajo la manga para tiempos desesperados.',
      },
    ],
  },
  {
    id: 'blood_rain',
    title: '🩸 Lluvia Roja',
    description: 'Comienza a llover un líquido rojizo. No es sangre, pero huele a hierro. Los animales huyen. Tu radio solo emite estática. El cielo parece... observarte.',
    category: 'supernatural',
    minDay: 7,
    choices: [
      {
        text: 'Refugiarse inmediatamente',
        effects: { morale: -10, health: 5 },
        outcome: 'Te refugias justo a tiempo. El líquido corroe todo lo que toca. Sobrevives, pero el mundo exterior parece más hostil que nunca.',
      },
      {
        text: 'Recoger muestras para analizar',
        effects: { health: -10, morale: -5 },
        outcome: 'Logras una muestra. Al analizarla, ves organismos microscópicos que no deberían existir. El conocimiento tiene un precio.',
      },
      {
        text: 'Rezar y esperar',
        effects: { morale: 10 },
        outcome: 'Algo inexplicable sucede: la lluvia se detiene alrededor de tu refugio como si una barrera invisible los protegiera. ¿Fe? ¿Suerte? ¿Algo más?',
      },
    ],
  },
  {
    id: 'trader_caravan',
    title: '🐴 Caravana de Comerciantes',
    description: 'Una caravana de supervivientes comerciantes llega a tu zona. Tienen medicinas, armas y comida. Pero sus precios son... creativos.',
    category: 'survival',
    choices: [
      {
        text: 'Comprar medicinas (cuesta combustible)',
        effects: { fuel: -10, health: 25 },
        outcome: 'Intercambias combustible por medicinas de calidad. El líder de la caravana te dice: "Ve al norte. Hay una ciudad que aún vive."',
      },
      {
        text: 'Comprar armas (cuesta comida)',
        effects: { food: -12, ammo: 15 },
        outcome: 'Ahora estás mejor armado. Los comerciantes advierten: "Se acerca algo grande desde el este. Prepárense."',
      },
      {
        text: 'Intentar robar',
        effects: { ammo: -5, morale: -15, health: -10 },
        outcome: 'Te descubren. Escapas con vida pero herido. El grupo pierde confianza en ti. Fue un error desesperado.',
      },
    ],
  },
  {
    id: 'solar_eclipse',
    title: '🌑 Eclipse Total',
    description: 'Un eclipse total oscurece el cielo. En la oscuridad, ves figuras en las colinas. No son humanas. Se mueven de forma imposible. El eclipse... las libera.',
    category: 'supernatural',
    minDay: 10,
    choices: [
      {
        text: 'Esconderse y no mirar',
        effects: { morale: -15 },
        outcome: 'Escuchas susurros imposibles durante las 3 horas de oscuridad. Cuando sale el sol, ya no están. Pero dejaron marcas en la tierra.',
      },
      {
        text: 'Observar con binoculares',
        effects: { health: -5, morale: -20 },
        outcome: 'Lo que ves no debería existir. Tu mente no puede procesarlo. Tendrás pesadillas por semanas. Pero ahora sabes a qué os enfrentáis.',
      },
      {
        text: 'Encender todas las luces posibles',
        effects: { fuel: -15, morale: 10 },
        outcome: 'La luz las repele. Las figuras retroceden y desaparecen. Descubres una debilidad. El conocimiento es poder, incluso en el apocalipsis.',
      },
    ],
  },
  {
    id: 'betrayal',
    title: '🗡️ Traición Interna',
    description: 'Descubres que alguien de tu grupo ha estado robando suministros en secreto. Cuando lo confrontas, dice que tiene una familia escondida en otro lugar.',
    category: 'moral',
    minDay: 4,
    choices: [
      {
        text: 'Perdonar y entender',
        effects: { morale: -5, food: -5 },
        outcome: 'Lo perdonas. Resulta que su "otra familia" son niños huérfanos que alimenta en secreto. Un héroe silencioso. La moral sube.',
      },
      {
        text: 'Exiliarlo del grupo',
        effects: { morale: -15, food: 5 },
        outcome: 'Se va sin resistirse. Algunos del grupo te miran con miedo. Otros con aprobación. El grupo se divide.',
      },
      {
        text: 'Proponer un acuerdo',
        effects: { morale: 10, food: -8 },
        outcome: 'Acuerdan que traerá a "su otra familia" al grupo. Más bocas, pero más manos. Y quizás, más esperanza.',
      },
    ],
  },
  {
    id: 'earthquake_aftermath',
    title: '💀 Después del Terremoto',
    description: 'Un terremoto masivo abre grietas en la tierra. De una de ellas emana un calor sobrenatural y un olor a azufre. Algo se mueve abajo...',
    category: 'supernatural',
    minDay: 3,
    choices: [
      {
        text: 'Explorar la grieta',
        effects: { health: -15, morale: -10, ammo: -3 },
        outcome: 'Lo que encuentras abajo no tiene nombre. Escapas por poco. Pero ahora sabes que el infierno no es una metáfora.',
      },
      {
        text: 'Sellr la grieta con escombros',
        effects: { fuel: -5, morale: 5 },
        outcome: 'Sellan la grieta lo mejor que pueden. Los sonidos cesan. Pero por la noche, todos sueñan lo mismo: fuego y gritos.',
      },
      {
        text: 'Huir de la zona inmediatamente',
        effects: { fuel: -10, morale: -5 },
        outcome: 'Abandonan el área. Es prudente. Pero dejaron atrás suministros que podrían haber salvado vidas. El debate continúa.',
      },
    ],
  },
  {
    id: 'clean_water',
    title: '💧 Fuente de Agua Pura',
    description: 'Encuentras un manantial de agua cristalina en medio de la desolación. El agua es pura, pero hay huesos de animales alrededor. Algunos se ven... wrong.',
    category: 'survival',
    choices: [
      {
        text: 'Llenar todos los contenedores',
        effects: { water: 30, health: -5 },
        outcome: 'El agua sacia la sed del grupo. Pero días después, algunos tienen malestar. El agua era pura... pero los que bebieron antes que ustedes no.',
      },
      {
        text: 'Hervir el agua antes de usar',
        effects: { water: 20, fuel: -5 },
        outcome: 'La precaución paga. Agua limpia y segura. El grupo descansa por primera vez en días. Un lujo en este mundo.',
      },
      {
        text: 'Marcar el lugar y racionar visitas',
        effects: { water: 10, morale: 5 },
        outcome: 'Sabiduría a largo plazo. El manantial será vuestra fuente secreta. Un recurso sostenible en un mundo insostenible.',
      },
    ],
  },
];

export const locations: Location[] = [
  {
    id: 'base',
    name: 'Refugio Base',
    description: 'Tu hogar. Un edificio fortificado con lo mínimo para sobrevivir.',
    icon: '🏚️',
    danger: 1,
    loot: ['comida básica', 'agua almacenada'],
    discovered: true,
  },
  {
    id: 'hospital',
    name: 'Hospital Abandonado',
    description: 'Un hospital en ruinas. Podría tener medicinas... y horrores.',
    icon: '🏥',
    danger: 4,
    loot: ['medicinas', 'vendajes', 'camillas'],
    discovered: false,
  },
  {
    id: 'supermarket',
    name: 'Supermercado Saqueado',
    description: 'Aún quedan cosas entre los escombros. Otros buscan lo mismo.',
    icon: '🏪',
    danger: 3,
    loot: ['comida enlatada', 'agua embotellada', 'herramientas'],
    discovered: false,
  },
  {
    id: 'gas_station',
    name: 'Gasolinera',
    description: 'Combustible escaso pero vital. Los otros supervivientes también lo saben.',
    icon: '⛽',
    danger: 3,
    loot: ['combustible', 'snacks', 'mapas'],
    discovered: false,
  },
  {
    id: 'military_base',
    name: 'Base Militar',
    description: 'Abandonada apresuradamente. Armas y suministros militares.',
    icon: '🎖️',
    danger: 5,
    loot: ['armas', 'munición', 'raciones MRE', 'radio militar'],
    discovered: false,
  },
  {
    id: 'church',
    name: 'Iglesia en Ruinas',
    description: 'Los vitrales están rotos. Pero hay paz aquí. Y quizás, respuestas.',
    icon: '⛪',
    danger: 2,
    loot: ['velas', 'libros', 'refugio espiritual'],
    discovered: false,
  },
  {
    id: 'bunker',
    name: 'Búnker Secreto',
    description: 'Un búnker de la Guerra Fría. Sellado desde hace décadas.',
    icon: '🔐',
    danger: 5,
    loot: ['suministros militares', 'generador', 'armas avanzadas', 'documentos clasificados'],
    discovered: false,
  },
  {
    id: 'forest',
    name: 'B Oscuro',
    description: 'El bosque ha crecido de forma antinatural. Los animales han cambiado.',
    icon: '🌲',
    danger: 4,
    loot: ['madera', 'plantas medicinales', 'pieles', 'carne de caza'],
    discovered: false,
  },
];
