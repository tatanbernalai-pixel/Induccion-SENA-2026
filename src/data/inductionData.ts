import { ModuleInfo, CaseStudy, ClassificationItem, Badge } from '../types/induction';

export const SENA_CAMPUS_IMAGE = '/src/assets/images/sena_campus_learning_1794325215220.jpg';
export const SENA_DIGITAL_IMAGE = '/src/assets/images/sena_digital_learning_1794325217695.jpg';
export const SENA_CREST_IMAGE = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';
export const SENA_CREST_FALLBACK = 'https://www.sena.edu.co/assets/escudo-CKAC4aSg.png';

export const SENA_LOGO_SVG = `data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e`;

export const INSTITUTIONAL_VALUES = [
  {
    name: 'Honestidad',
    description: 'Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud, favoreciendo el interés general.',
    icon: 'ShieldCheck',
    color: 'emerald'
  },
  {
    name: 'Respeto',
    description: 'Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y diferencias, garantizando los derechos de la comunidad SENA.',
    icon: 'HeartHandshake',
    color: 'teal'
  },
  {
    name: 'Compromiso',
    description: 'Soy consciente de la importancia de mi rol como aprendiz SENA y pongo a disposición lo mejor de mí para el éxito de mi formación integral.',
    icon: 'Award',
    color: 'emerald'
  },
  {
    name: 'Diligencia',
    description: 'Cumplo con los deberes, funciones y actividades formativas de la mejor manera posible, con atención, prontitud y optimización de recursos.',
    icon: 'Zap',
    color: 'amber'
  },
  {
    name: 'Justicia',
    description: 'Actúo con imparcialidad garantizando los derechos de las personas, con equidad, igualdad y sin discriminación.',
    icon: 'Scale',
    color: 'blue'
  },
  {
    name: 'Solidaridad',
    description: 'Apoyo a mis compañeros y a la comunidad educativa en situaciones difíciles, promoviendo el trabajo en equipo y el bienestar colectivo.',
    icon: 'Users',
    color: 'indigo'
  },
  {
    name: 'Lealtad Institucional',
    description: 'Porto con orgullo la identidad SENA, cuidando el buen nombre y el patrimonio físico y ambiental de la entidad.',
    icon: 'Flag',
    color: 'green'
  }
];

export const ANTHEM_VERSES = [
  {
    type: 'Coro',
    label: 'Coro Principal',
    lines: [
      'Estudiantes del SENA ¡adelante!',
      'por Colombia luchad con amor,',
      'con el ánimo noble y radiante,',
      'transformémosle el mundo en flor.'
    ],
    audioDurationSec: 14
  },
  {
    type: 'Estrofa I',
    label: 'Estrofa I - La Juventud y el Saber',
    lines: [
      'De la patria el futuro destino,',
      'en las manos del joven está,',
      'el trabajo es seguro camino,',
      'que a la paz y a la gloria nos va.'
    ],
    audioDurationSec: 16
  },
  {
    type: 'Coro',
    label: 'Coro Intermedio',
    lines: [
      'Estudiantes del SENA ¡adelante!',
      'por Colombia luchad con amor,',
      'con el ánimo noble y radiante,',
      'transformémosle el mundo en flor.'
    ],
    audioDurationSec: 14
  },
  {
    type: 'Estrofa II',
    label: 'Estrofa II - Ciencia y Técnica',
    lines: [
      'En la forja del SENA se aúnan,',
      'el empeño, la ciencia y la luz,',
      'es de nobles ideales fortuna,',
      'y del alma fecunda quietud.'
    ],
    audioDurationSec: 16
  },
  {
    type: 'Estrofa III',
    label: 'Estrofa III - El Trabajo Creador',
    lines: [
      'Hoy la patria nos llama a la lidia,',
      'del trabajo creador y la paz,',
      'sin rencores, ni odios, ni envidia,',
      'con la frente en alto y jamás.'
    ],
    audioDurationSec: 16
  }
];

export const CREST_HOTSPOTS = [
  {
    id: 'antorcha',
    name: 'Antorcha del Saber',
    sector: 'La Luz del Conocimiento',
    description: 'Ubicada en la cima del blasón, representa la llama de la formación profesional integral que ilumina el camino del aprendiz.',
    position: { top: '18%', left: '50%' },
    color: '#F59E0B'
  },
  {
    id: 'caduceo',
    name: 'El Caduceo de Mercurio',
    sector: 'Sector Comercio y Servicios',
    description: 'Simboliza la actividad comercial, los servicios, la diplomacia y el intercambio pacífico de bienes y talentos en el país.',
    position: { top: '44%', left: '50%' },
    color: '#39A900'
  },
  {
    id: 'cafe',
    name: 'Rama del Cafeto / Espiga',
    sector: 'Sector Primario y Agropecuario',
    description: 'Evoca las raíces del campo colombiano, el café como emblema de desarrollo agrario y la soberanía alimentaria nacional.',
    position: { top: '54%', left: '32%' },
    color: '#16A34A'
  },
  {
    id: 'pinon',
    name: 'Rueda Dentada (Piñón)',
    sector: 'Sector Industria y Construcción',
    description: 'Representa la fuerza productiva, la industrialización, el engranaje del conocimiento técnico y el sector de la construcción.',
    position: { top: '54%', left: '68%' },
    color: '#0284C7'
  }
];

export const MODULES_DATA: ModuleInfo[] = [
  {
    id: 'identity',
    number: 1,
    title: 'Identidad, Historia y Mística SENA',
    shortDescription: 'Descubre los orígenes del SENA desde 1957, la visión de Rodolfo Martínez Tono, la misión institucional y los 7 valores del aprendiz.',
    iconName: 'Sparkles',
    durationMinutes: 25,
    topicsCount: 4,
    sections: [
      {
        id: 'historia',
        title: 'Nacimiento del SENA (1957)',
        subtitle: 'Una iniciativa tripartita para impulsar a Colombia',
        content: [
          'El Servicio Nacional de Aprendizaje (SENA) nació mediante el Decreto Ley 118 del 21 de junio de 1957, concebido por el economista cartagenero Rodolfo Martínez Tono, con el apoyo de trabajadores sindicalizados y gremios empresariales.',
          'Su propósito fundacional fue brindar Formación Profesional Integral a los trabajadores de la industria, el comercio, el campo y los servicios, conectando la educación técnica con las necesidades reales de desarrollo de Colombia.',
          'Es una entidad pública de orden nacional con personería jurídica, patrimonio propio e independencia administrativa, adscrita al Ministerio del Trabajo.'
        ],
        interactiveType: 'timeline',
        keyTakeaways: [
          'Fundado el 21 de junio de 1957 por Rodolfo Martínez Tono.',
          'Estructura Tripartita: Gobierno Nacional, Empleadores (Empresas) y Trabajadores (Sindicatos).',
          'Enfoque: Formación Profesional Integral gratuita y de alta calidad técnica.'
        ]
      },
      {
        id: 'mision_vision',
        title: 'Misión y Visión Institucional',
        subtitle: 'El rumbo estratégico del SENA',
        content: [
          'Misión: El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
          'Visión: El SENA se consolidará como una entidad referente internacional en formación técnica y tecnológica, impulsando la transformación digital, la bioeconomía, la transición energética justa y el empleo digno en todas las regiones de Colombia.'
        ],
        keyTakeaways: [
          'Cobertura en los 32 departamentos de Colombia y el Distrito Capital.',
          'Más de 117 centros de formación profesional organizados en 33 regionales.'
        ]
      },
      {
        id: 'valores',
        title: 'Código de Integridad y Valores SENA',
        subtitle: 'Nuestros 7 principios rectores en la formación',
        content: [
          'El aprendiz SENA se distingue no solo por su destreza técnica, sino por su calidad humana y su sentido de responsabilidad social.',
          'El Código de Integridad SENA define los 7 valores que orientan nuestro actuar cotidiano tanto en las aulas y talleres como en el entorno productivo y comunitario.'
        ],
        interactiveType: 'cards_grid',
        interactiveData: INSTITUTIONAL_VALUES
      }
    ],
    quiz: {
      title: 'Evaluación: Identidad y Mística SENA',
      passingScore: 80,
      questions: [
        {
          id: 'q1',
          question: '¿En qué año y por quién fue fundado el Servicio Nacional de Aprendizaje (SENA)?',
          options: [
            'En 1970 por el Ministerio de Educación Nacional',
            'El 21 de junio de 1957 por iniciativa de Rodolfo Martínez Tono',
            'En 1948 tras la creación de las Naciones Unidas',
            'En 1991 mediante la nueva Constitución Política de Colombia'
          ],
          correctIndex: 1,
          explanation: 'El SENA fue fundado el 21 de junio de 1957 mediante el Decreto Ley 118, por iniciativa del cartagenero Rodolfo Martínez Tono con respaldo tripartito.',
          normativeRef: 'Decreto Ley 118 de 1957'
        },
        {
          id: 'q2',
          question: '¿Cuál es la naturaleza tripartita que caracteriza la dirección del SENA?',
          options: [
            'Alcaldes, Gobernadores y Concejales',
            'Estudiantes, Profesores y Egresados',
            'Gobierno Nacional, Gremios de Empleadores y Organizaciones de Trabajadores',
            'SENA, Universidades públicas y Colegios técnicos'
          ],
          correctIndex: 2,
          explanation: 'El Consejo Directivo Nacional del SENA cuenta con representación del Gobierno, los gremios de empresarios y las centrales obreras de trabajadores.',
          normativeRef: 'Ley 119 de 1994 - Estructura SENA'
        },
        {
          id: 'q3',
          question: '¿A qué ministerio se encuentra adscrito el SENA actualmente?',
          options: [
            'Ministerio de Educación Nacional',
            'Ministerio de Comercio, Industria y Turismo',
            'Ministerio del Trabajo',
            'Ministerio de Ciencia, Tecnología e Innovación'
          ],
          correctIndex: 2,
          explanation: 'El SENA es un establecimiento público del orden nacional adscrito al Ministerio del Trabajo de Colombia.',
          normativeRef: 'Estructura Administrativa Nacional'
        },
        {
          id: 'q4',
          question: '¿Qué valor del Código de Integridad SENA se define como "actuar siempre con la verdad y rectitud favoreciendo el interés general"?',
          options: [
            'Diligencia',
            'Honestidad',
            'Justicia',
            'Solidaridad'
          ],
          correctIndex: 1,
          explanation: 'La Honestidad es el valor que orienta a actuar con veracidad, rectitud y transparencia en todas las acciones formativas e institucionales.',
          normativeRef: 'Código de Integridad SENA'
        }
      ]
    }
  },
  {
    id: 'symbols',
    number: 2,
    title: 'Símbolos Institucionales e Himno SENA',
    shortDescription: 'Explora de forma interactiva el Escudo, la Bandera, el Logosímbolo y aprende a entonar con orgullo el Himno del SENA.',
    iconName: 'Flag',
    durationMinutes: 20,
    topicsCount: 3,
    sections: [
      {
        id: 'escudo_interactivo',
        title: 'El Escudo del SENA y sus Tres Sectores',
        subtitle: 'Explora los puntos de interacción para conocer cada elemento heráldico',
        content: [
          'El Escudo del SENA representa la confluencia de los tres grandes sectores de la economía nacional que impulsan la riqueza y el bienestar de los colombianos.',
          'Cada elemento gráfico fue diseñado para recordarle al aprendiz que su formación está directamente articulada con el progreso integral del país.'
        ],
        interactiveType: 'hotspots',
        interactiveData: CREST_HOTSPOTS,
        keyTakeaways: [
          'Caduceo: Comercio y Servicios.',
          'Piñón o Rueda Dentada: Industria y Construcción.',
          'Cafeto / Espiga: Sector Agropecuario y Primario.'
        ]
      },
      {
        id: 'bandera_logosimbolo',
        title: 'La Bandera y el Logosímbolo',
        subtitle: 'El significado de los colores y la figura del aprendiz',
        content: [
          'La Bandera del SENA: Posee un fondo de color blanco que simboliza la tranquilidad, la paz y la libertad, sobre el cual resalta el escudo oficial en el centro.',
          'El Logosímbolo: Muestra de forma estilizada y dinámica a un ser humano caminando hacia el futuro, abriendo caminos sobre un sendero de progreso y levantando los brazos en señal de superación personal, victoria y libertad a través del conocimiento.'
        ],
        keyTakeaways: [
          'Fondo blanco de la bandera: Paz, convivencia armónica y libertad.',
          'Logosímbolo: El ser humano como eje central del desarrollo y la formación.'
        ]
      },
      {
        id: 'himno_player',
        title: 'Himno del SENA: Letra y Música',
        subtitle: 'Letra de Luis Alfredo Sarmiento - Música de Daniel Marlez',
        content: [
          'El Himno del SENA es una marcha solemne que exalta la dignidad del trabajo, la nobleza de la juventud colombiana y el poder transformador de la ciencia y la técnica.',
          'Se entona con orgullo y respeto en todos los actos protocolarios, ceremonias de bienvenida, comités y actos de graduación de aprendices.'
        ],
        interactiveType: 'anthem_player',
        interactiveData: ANTHEM_VERSES
      }
    ],
    quiz: {
      title: 'Evaluación: Símbolos Institucionales',
      passingScore: 80,
      questions: [
        {
          id: 'sq1',
          question: '¿Qué representa la rueda dentada o piñón en el escudo del SENA?',
          options: [
            'El sector financiero y bancario',
            'El sector agropecuario y de alimentos',
            'El sector de la industria y la construcción',
            'El transporte aéreo y marítimo'
          ],
          correctIndex: 2,
          explanation: 'La rueda dentada simboliza el sector de la industria y la construcción, piezas clave del engranaje productivo.',
          normativeRef: 'Manual de Imagen Institucional SENA'
        },
        {
          id: 'sq2',
          question: '¿Qué significa la figura estilizada del logosímbolo del SENA?',
          options: [
            'Una máquina cosechadora en el campo',
            'Un ser humano que camina hacia el futuro superando obstáculos sobre senderos de progreso',
            'Un libro abierto que simboliza una biblioteca tradicional',
            'Una brújula para orientar el comercio exterior'
          ],
          correctIndex: 1,
          explanation: 'El logosímbolo representa a la persona humana avanzando con determinación hacia el porvenir, abriendo caminos.',
          normativeRef: 'Identidad Visual SENA'
        },
        {
          id: 'sq3',
          question: '¿Qué simboliza el color blanco del fondo de la bandera del SENA?',
          options: [
            'Las nevadas de la cordillera de los Andes',
            'La paz, la tranquilidad y la libertad',
            'La pureza de los minerales de Colombia',
            'La formalidad del sector administrativo'
          ],
          correctIndex: 1,
          explanation: 'El lienzo blanco de la bandera representa la paz, la serenidad y la búsqueda constante de la convivencia pacífica.',
          normativeRef: 'Símbolos Patrios e Institucionales'
        },
        {
          id: 'sq4',
          question: 'En el Himno del SENA, ¿cuál es el llamado central del coro a los estudiantes?',
          options: [
            '"Por Colombia luchad con amor... transformémosle el mundo en flor"',
            '"A la guerra marchad con valor"',
            '"En la fábrica forjad riqueza"',
            '"Descansad en la cumbre del monte"'
          ],
          correctIndex: 0,
          explanation: 'El coro dice: "Estudiantes del SENA ¡adelante! por Colombia luchad con amor, con el ánimo noble y radiante, transformémosle el mundo en flor".',
          normativeRef: 'Himno Institucional SENA'
        }
      ]
    }
  },
  {
    id: 'normative',
    number: 3,
    title: 'Normativa y Reglamento del Aprendiz (Acuerdo 009 de 2024)',
    shortDescription: 'Conoce la moderna normativa integral (Acuerdo 009 de 2024): 5 capítulos, 53 artículos, principios orientadores, catálogo ampliado de 24 derechos, deberes en presencialidad y virtualidad, y garantías del debido proceso.',
    iconName: 'Scale',
    durationMinutes: 35,
    topicsCount: 5,
    sections: [
      {
        id: 'principios_derechos',
        title: 'Principios Orientadores y Derechos del Aprendiz',
        subtitle: 'Capítulos I y II del Acuerdo 009 de 2024 (53 Artículos)',
        content: [
          'El Acuerdo 009 de 2024 expedido por el Consejo Directivo Nacional moderniza integralmente el Reglamento del Aprendiz SENA, compilando y derogando el antiguo Acuerdo 07 de 2012 y sus reformas.',
          'PRINCIPIOS ORIENTADORES (Capítulo I): Rigen la formación 8 principios fundamentales: Autonomía, Dignidad humana, Inclusión social, Enfoque diferencial, Enfoque territorial (campesinado y diversidades regionales), Participación democrática, Desarrollo sostenible y Solidaridad institucional. Aplican por igual a modalidades Presencial, Virtual, A Distancia y Formación Dual.',
          'CATÁLOGO DE DERECHOS (Capítulo II - 24 Derechos): Recibir formación profesional integral de calidad; acceder a la infraestructura tecnológica y plataformas digitales (Zajuna LMS, SofiaPlus, bibliotecas digitales); ser tratado con dignidad y sin discriminación; disfrutar del libre desarrollo de la personalidad y enfoque de género; conocer oportunamente los planes de evaluación y rúbricas; recibir acompañamiento pedagógico; postularse a representación estudiantil; y acceder a los beneficios de Bienestar al Aprendiz.'
        ],
        articleRef: 'Acuerdo 009 de 2024 - Capítulos I y II'
      },
      {
        id: 'deberes_digitales_presenciales',
        title: 'Deberes en Ambientes Presenciales y Virtuales',
        subtitle: 'Capítulo III del Acuerdo 009 de 2024',
        content: [
          'Los deberes del aprendiz garantizan la sana convivencia, la seguridad laboral y la excelencia académica en todas las sedes y ambientes virtuales.',
          'DEBERES PRINCIPALES: 1. Portar el carné institucional visible en todo momento durante actividades presenciales. 2. Asistir puntualmente a sesiones presenciales y sincrónicas en plataformas digitales. 3. Utilizar de forma obligatoria los Elementos de Protección Personal (EPP) y respetar normas de SST. 4. Conservar y cuidar las instalaciones físicas y los recursos tecnológicos. 5. Mantener una conducta ética en entornos digitales (netiqueta, respeto en foros/chats institucionales). 6. Justificar oportunamente inasistencias por escrito dentro de los tres (3) días hábiles siguientes al hecho con soportes médicos válidos o de fuerza mayor.'
        ],
        articleRef: 'Acuerdo 009 de 2024 - Capítulo III (Deberes)'
      },
      {
        id: 'prohibiciones_convivencia',
        title: 'Prohibiciones Expresas del Aprendiz SENA',
        subtitle: 'Capítulo III: Conductas Prohibidas en la Formación',
        content: [
          'El Acuerdo 009 de 2024 tipifica con claridad las conductas prohibidas tanto en sedes físicas como en entornos digitales y etapa práctica:',
          '1. Ingresar, portar, consumir, distribuir o comercializar sustancias psicoactivas o bebidas alcohólicas en sedes del SENA o actividades institucionales.',
          '2. Portar armas de fuego, cortopunzantes o elementos peligrosos.',
          '3. Cometer plagio, copia o fraude en evidencias de aprendizaje, evaluaciones o proyectos formativos (incluyendo el uso no ético o suplantación con herramientas de Inteligencia Artificial sin citación ni criterio propio).',
          '4. Incurrir en actos de acoso escolar, ciberacoso (bullying), discriminación o cualquier agresión física, verbal o psicológica contra miembros de la comunidad educativa.',
          '5. Alterar, falsificar o sustraer documentos oficiales, registros de asistencia o firmas.',
          '6. Suplantar la identidad de otro aprendiz en aulas presenciales o plataformas virtuales.'
        ],
        articleRef: 'Acuerdo 009 de 2024 - Capítulo III (Prohibiciones)'
      },
      {
        id: 'novedades_permanencia',
        title: 'Novedades Académicas, Permanencia y Deserción',
        subtitle: 'Capítulo IV: Trámites Administrativos y Prevención de Deserción',
        content: [
          'POLÍTICA ANTITRÁMITES: Se simplifica la gestión electrónica de novedades a través de plataformas institucionales: Traslados de centro o jornada, Aplazamiento (hasta por 6 meses prorrogable excepcionalmente) y Reingresos oportunos.',
          'TIEMPO LÍMITE DE CERTIFICACIÓN: Se fijan plazos perentorios posteriores al cierre de formación para culminar requisitos de grado y evitar la cancelación administrativa por inactividad.',
          'TIPIFICACIÓN DE LA DESERCIÓN: Ocurre cuando el aprendiz acumula tres (3) días hábiles consecutivos de inasistencia injustificada o cinco (5) días no consecutivos durante el período formativo sin justa causa comprobada. Antes de cualquier cancelación, la coordinación debe enviar comunicación formal de requerimiento otorgando cinco (5) días hábiles para presentar descargos y soportes.'
        ],
        articleRef: 'Acuerdo 009 de 2024 - Capítulo IV'
      },
      {
        id: 'faltas_medidas_comite',
        title: 'Faltas, Medidas Formativas Pedagógicas y Debido Proceso',
        subtitle: 'Capítulo V: Régimen Disciplinario y Comité de Evaluación',
        content: [
          'CLASIFICACIÓN DE FALTAS: Las faltas pueden ser Académicas o Disciplinarias, graduándose en Leves y Graves según la intencionalidad, antecedentes, daño causado y reiteración.',
          'PRIMACÍA DE MEDIDAS FORMATIVAS: El nuevo reglamento prioriza el enfoque pedagógico y restaurativo antes que la sanción punitiva: 1. Llamado de atención verbal reflexivo. 2. Plan de Mejoramiento Académico o Disciplinario concertado (plazo perentorio de hasta 30 días calendario).',
          'SANCIONES DISCIPLINARIAS: Únicamente el Subdirector de Centro tiene la potestad de imponer Condicionamiento o Cancelación de Matrícula, previo concepto motivado del Comité de Evaluación y Seguimiento.',
          'GARANTÍA DEL DEBIDO PROCESO: Citación formal con mínimo tres (3) días hábiles de anticipación; derecho a ser escuchado en descargos y controvertir pruebas; y derecho al Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación.'
        ],
        articleRef: 'Acuerdo 009 de 2024 - Capítulo V'
      }
    ],
    quiz: {
      title: 'Evaluación: Normativa y Reglamento SENA (Acuerdo 009 de 2024)',
      passingScore: 80,
      questions: [
        {
          id: 'nq1',
          question: '¿Cuántos días hábiles tiene un aprendiz para justificar formalmente una inasistencia ante el instructor o coordinación según el Acuerdo 009 de 2024?',
          options: [
            'El mismo día antes del mediodía',
            'Hasta 3 días hábiles siguientes a la ocurrencia del hecho con soporte válido',
            'Hasta 15 días calendario',
            'No es necesario justificar si el vocero de ficha avisa por WhatsApp'
          ],
          correctIndex: 1,
          explanation: 'El Acuerdo 009 de 2024 estipula un plazo perentorio de 3 días hábiles siguientes a la inasistencia para radicar la justificación médica o de fuerza mayor comprobable.',
          normativeRef: 'Acuerdo 009 de 2024 - Capítulos III y IV'
        },
        {
          id: 'nq2',
          question: '¿Cuál es el tiempo máximo de duración concertada de un Plan de Mejoramiento Académico o Disciplinario?',
          options: [
            '6 meses',
            'Hasta 30 días calendario',
            'Un año lectivo completo',
            '10 horas de formación'
          ],
          correctIndex: 1,
          explanation: 'El Plan de Mejoramiento como medida formativa pedagógica concertada no puede superar los 30 días calendario para verificar la superación de las fallas.',
          normativeRef: 'Acuerdo 009 de 2024 - Capítulo V (Medidas Formativas)'
        },
        {
          id: 'nq3',
          question: '¿Quién es la única autoridad competente dentro del Centro de Formación facultada para imponer la sanción de Cancelación de Matrícula?',
          options: [
            'El Instructor técnico del área',
            'El Vocero de la ficha',
            'El Subdirector del Centro de Formación',
            'El vigilante de la portería'
          ],
          correctIndex: 2,
          explanation: 'Solo el Subdirector del Centro de Formación, previo concepto motivado del Comité de Evaluación y Seguimiento, puede expedir el acto administrativo de sanción.',
          normativeRef: 'Acuerdo 009 de 2024 - Capítulo V'
        },
        {
          id: 'nq4',
          question: '¿Con cuántos días hábiles de anticipación mínima debe ser notificado un aprendiz para comparecer ante el Comité de Evaluación y Seguimiento?',
          options: [
            '2 horas antes de la sesión',
            'Mínimo 3 días hábiles de antelación',
            '30 días calendario',
            'No requiere notificación previa'
          ],
          correctIndex: 1,
          explanation: 'Para garantizar el debido proceso constitucional y derecho a la defensa, la citación formal debe entregarse con al menos 3 días hábiles de antelación indicando hechos y pruebas.',
          normativeRef: 'Acuerdo 009 de 2024 - Capítulo V (Debido Proceso)'
        },
        {
          id: 'nq5',
          question: '¿Qué recurso legal puede interponer el aprendiz contra la resolución sancionatoria del Subdirector y en qué plazo?',
          options: [
            'Recurso de Apelación ante la Presidencia de la República en 30 días',
            'Recurso de Reposición dentro de los 5 días hábiles siguientes a la notificación',
            'Una queja verbal en la cafetería',
            'No cabe ningún recurso legal'
          ],
          correctIndex: 1,
          explanation: 'Contra el acto administrativo del Subdirector procede el Recurso de Reposición dentro de los 5 días hábiles siguientes a la notificación formal.',
          normativeRef: 'Acuerdo 009 de 2024 - Capítulo V'
        },
        {
          id: 'nq6',
          question: 'De acuerdo con las reglamentaciones sobre el uso ético de tecnologías emergentes (IA) e integridad digital, ¿cuál es la conducta correcta respecto a evidencias de aprendizaje?',
          options: [
            'Entregar evidencias 100% generadas por IA sin revisión personal ni declarar prompts',
            'Utilizar la IA como herramienta asistiva de apoyo, citando prompts/fuentes y demostrando desarrollo de criterio formativo propio',
            'Prohibir el uso de computadores en todas las áreas del centro de formación',
            'Vender las respuestas generadas por IA a otros aprendices de la ficha'
          ],
          correctIndex: 1,
          explanation: 'El SENA promueve la innovación tecnológica y el pensamiento crítico: el uso de IA está permitido como apoyo pedagógico siempre que se declare con transparencia, se citen fuentes/prompts y se evidencie desarrollo de criterio propio sin incurrir en plagio o suplantación.',
          normativeRef: 'Acuerdo 009 de 2024 - Cap. II (Derecho 18) y Cap. III (Prohibición 16)'
        }
      ]
    }
  },
  {
    id: 'digital',
    number: 4,
    title: 'Ecosistema Digital SENA: SofiaPlus, Zajuna y Servicios',
    shortDescription: 'Domina las plataformas tecnológicas institucionales: gestión académica en SofiaPlus, aulas virtuales en Zajuna y correo @misena.',
    iconName: 'Laptop',
    durationMinutes: 20,
    topicsCount: 4,
    sections: [
      {
        id: 'sofia_plus',
        title: 'Portal SENA SofiaPlus',
        subtitle: 'Sistema Optimizado para la Formación Integral y el Aprendizaje Activo',
        content: [
          'SofiaPlus es el corazón administrativo del aprendiz. A través de este portal oficial podrás:',
          '1. Consultar tu estado de matrícula, ficha de caracterización y horario de formación.',
          '2. Descargar certificados de matrícula, constancias de estudio y certificados de competencias aprobadas.',
          '3. Actualizar tus datos personales (número de teléfono, dirección, tipo de documento al cumplir la mayoría de edad).',
          '4. Consultar tus juicios evaluativos emitidos por los instructores (A: Aprobado / D: Por Mejorar o Deficiente).'
        ],
        keyTakeaways: [
          'URL Oficial: www.senasofiaplus.edu.co',
          'Tu usuario es tu documento de identidad.',
          'Mantén siempre actualizado tu correo electrónico para recibir notificaciones formales.'
        ]
      },
      {
        id: 'zajuna_lms',
        title: 'Plataforma Virtual Zajuna (LMS SENA)',
        subtitle: 'Tu ambiente virtual de aprendizaje e interacción',
        content: [
          'Zajuna es la plataforma de gestión del aprendizaje (LMS) oficial del SENA, basada en tecnologías de vanguardia para la educación virtual y presencial asistida por TIC.',
          'En Zajuna encontrarás:',
          '- El cronograma general de tu programa de formación y las guías de aprendizaje.',
          '- Materiales de apoyo multimedia, lecturas interactivas y laboratorios virtuales.',
          '- El espacio seguro para subir evidencias (talleres, informes, audios, código fuente, proyectos).',
          '- Foros temáticos de discusión, foros de dudas técnicas y salas de sesión sincrónica.'
        ],
        keyTakeaways: [
          'Ingreso con las mismas credenciales de SofiaPlus.',
          'Revisa las fechas límites de entrega estipuladas en el cronograma.'
        ]
      },
      {
        id: 'correo_biblioteca',
        title: 'Correo @misena y Sistema de Bibliotecas',
        subtitle: 'Herramientas de productividad y consulta académica de clase mundial',
        content: [
          'Correo Institucional MiSena: Cada aprendiz recibe una cuenta gratuita @misena.edu.co potenciada con el ecosistema de productividad educativa, almacenamiento en la nube, procesador de texto, hojas de cálculo y salas de videoconferencia.',
          'Sistema Nacional de Bibliotecas SENA: Acceso 24/7 a más de 50 bases de datos científicas y técnicas internacionales (e-Libro, EBSCO, ScienceDirect, ProQuest) con miles de libros electrónicos, normas técnicas ICONTEC y artículos especializados sin costo.'
        ],
        keyTakeaways: [
          'Usa el correo MiSena para toda comunicación oficial con instructores y directivas.',
          'Aprovecha las normas ICONTEC e IEEE disponibles en el portal de bibliotecas.'
        ]
      }
    ],
    quiz: {
      title: 'Evaluación: Ecosistema Digital SENA',
      passingScore: 80,
      questions: [
        {
          id: 'dq1',
          question: '¿En qué plataforma oficial del SENA descargas tu constancia de estudio y consultas los juicios evaluativos (Aprobado / No Aprobado)?',
          options: [
            'En una red social pública',
            'En el portal SENA SofiaPlus',
            'En la página de la Registraduría',
            'En un blog externo'
          ],
          correctIndex: 1,
          explanation: 'SENA SofiaPlus es el sistema de gestión académica donde se gestionan matrículas, juicios evaluativos y certificaciones oficiales.',
          normativeRef: 'Gestión Académica SENA'
        },
        {
          id: 'dq2',
          question: '¿Qué es Zajuna en el ecosistema actual del SENA?',
          options: [
            'Un restaurante del centro',
            'La plataforma de aprendizaje virtual (LMS) para consultar guías y enviar evidencias',
            'Una marca de computadores para aprendices',
            'El himno en lengua indígena'
          ],
          correctIndex: 1,
          explanation: 'Zajuna es el ambiente virtual de aprendizaje oficial donde los aprendices interactúan con materiales y entregan sus evidencias.',
          normativeRef: 'Dirección de Formación Profesional'
        },
        {
          id: 'dq3',
          question: '¿Cuál es el dominio del correo electrónico institucional oficial asignado a los aprendices?',
          options: [
            '@sena.com.co',
            '@misena.edu.co',
            '@aprendices.org',
            '@colombiaaprende.gov.co'
          ],
          correctIndex: 1,
          explanation: 'El correo electrónico oficial para todos los aprendices del SENA es @misena.edu.co.',
          normativeRef: 'Tecnologías de la Información SENA'
        }
      ]
    }
  },
  {
    id: 'wellness',
    number: 5,
    title: 'Bienestar al Aprendiz y Etapa Productiva',
    shortDescription: 'Descubre los apoyos de sostenimiento, monitorías, salud, cultura, deportes y las alternativas de tu Etapa Práctica en empresas.',
    iconName: 'HeartHandshake',
    durationMinutes: 20,
    topicsCount: 3,
    sections: [
      {
        id: 'bienestar_areas',
        title: 'Plan Nacional Integral de Bienestar al Aprendiz',
        subtitle: 'Acompañamiento integral para tu permanencia y graduación exitosa',
        content: [
          'Bienestar al Aprendiz es el área transversal encargada de promover el desarrollo humano integral mediante programas que fortalecen habilidades blandas, convivencia y salud.',
          'Líneas estratégicas:',
          '1. Salud y Prevención: Campañas de salud visual, oral, salud mental y prevención de adicciones.',
          '2. Deporte y Recreación: Torneos intercentros, gimnasio, fútbol, baloncesto, atletismo y ajedrez.',
          '3. Expresión Cultural: Grupos de danza, música, teatro, literatura y artes plásticas.',
          '4. Liderazgo y Acompañamiento: Elección de representantes y voceros de ficha, monitorías y consejería psicológica.'
        ],
        keyTakeaways: [
          'Todos los servicios de bienestar son 100% gratuitos.',
          'El Vocero de Ficha es el enlace democrático entre los aprendices y la coordinación.'
        ]
      },
      {
        id: 'apoyos_sostenimiento',
        title: 'Apoyos de Sostenimiento y Monitorías',
        subtitle: 'Subsidios para aprendices en condición de vulnerabilidad socioeconómica',
        content: [
          'Apoyo de Sostenimiento Regular: Subsidio económico mensual asignado a aprendices de estratos 1 y 2 que cumplan requisitos académicos y socioeconómicos para gastos de transporte y alimentación.',
          'Apoyo FIC (Fondo Nacional de Formación Profesional de la Industria de la Construcción): Específico para aprendices de programas del sector de la construcción.',
          'Monitorías Académicas: Oportunidad de apoyar a instructores y centros en laboratorios, bibliotecas y soporte tecnológico, recibiendo un estímulo económico mensual.'
        ],
        keyTakeaways: [
          'Requisito clave: Excelente rendimiento académico y no tener sanciones disciplinarias.',
          'Convocatorias semestrales publicadas en carteleras y portal web.'
        ]
      },
      {
        id: 'etapa_productiva',
        title: 'Modalidades de la Etapa Productiva',
        subtitle: 'La aplicación real de tus competencias en el mundo laboral',
        content: [
          'Para graduarte debes cumplir exitosamente la Etapa Lectiva y la Etapa Productiva.',
          'Alternativas autorizadas para realizar la Etapa Productiva:',
          '1. Contrato de Aprendizaje: Vinculación con una empresa que te brinda patrocinio y afiliación a ARL y EPS.',
          '2. Vínculo Laboral o Contractual: Si ya trabajas en una empresa desempeñando labores afines al programa.',
          '3. Proyecto Productivo (Emprendimiento Fondo Emprender): Creación de tu propia empresa con asesoría SENA.',
          '4. Pasantía o Práctica Comunitaria: Apoyo en entidades públicas, ONGs o instituciones sin ánimo de lucro.',
          '5. Monitoría en el SENA: Certificación de horas de práctica en centros de formación.'
        ],
        keyTakeaways: [
          'El contrato de aprendizaje no constituye contrato de trabajo ni genera prestaciones, pero garantiza apoyo de sostenimiento.',
          'Durante la etapa productiva continúas teniendo calidad de aprendiz SENA y aplican las normas del reglamento.'
        ]
      }
    ],
    quiz: {
      title: 'Evaluación: Bienestar y Etapa Productiva',
      passingScore: 80,
      questions: [
        {
          id: 'wq1',
          question: '¿Cuál de las siguientes NO es una alternativa válida para realizar la Etapa Productiva en el SENA?',
          options: [
            'Contrato de Aprendizaje en una empresa patrocinadora',
            'Proyecto Productivo o emprendimiento apoyado por Fondo Emprender',
            'Quedarse en casa sin reporte ni concertación con el centro',
            'Vínculo laboral en funciones afines al programa de formación'
          ],
          correctIndex: 2,
          explanation: 'Toda etapa productiva requiere registro formal, concertación de plan de trabajo y seguimiento de un instructor asignado.',
          normativeRef: 'Reglamento del Aprendiz - Art. 12'
        },
        {
          id: 'wq2',
          question: '¿Qué papel democrático cumple el "Vocero de Ficha" elegido en el grupo de formación?',
          options: [
            'Asignar las calificaciones a sus compañeros',
            'Representar a sus compañeros de ficha, canalizar inquietudes ante instructores y promover la sana convivencia',
            'Decidir quién entra o no al centro de formación',
            'Exonerar a sus amigos de presentar evidencias'
          ],
          correctIndex: 1,
          explanation: 'El vocero de ficha es un líder democrático que dinamiza la comunicación, representa las inquietudes grupales y participa en comités.',
          normativeRef: 'Guía de Liderazgo y Bienestar SENA'
        },
        {
          id: 'wq3',
          question: '¿Qué cubre una empresa patrocinadora a un aprendiz durante la Etapa Productiva bajo Contrato de Aprendizaje?',
          options: [
            'Solo un carné empresarial sin pago',
            'Un apoyo de sostenimiento mensual, más afiliación plena a EPS y ARL (Riesgos Laborales)',
            'Pago de horas extras y cesantías ordinarias como contrato indefinido',
            'Un computador portátil de regalo'
          ],
          correctIndex: 1,
          explanation: 'La Ley 789 de 2002 establece que el patrocinador brinda un apoyo de sostenimiento y realiza las cotizaciones a EPS y ARL.',
          normativeRef: 'Ley 789 de 2002 - Contrato de Aprendizaje'
        }
      ]
    }
  }
];

export const NORMATIVE_CASES: CaseStudy[] = [
  {
    id: 'caso-1',
    title: 'Inasistencias Reiteradas sin Soporte Oportuno',
    category: 'académica',
    severity: 'Grave',
    context: 'Carlos es aprendiz de Tecnólogo en ADSO. Durante dos semanas consecutivas no asistió a las sesiones presenciales ni subió evidencias en Zajuna, acumulando 4 días hábiles de inasistencia continua.',
    description: 'Al regresar al centro, Carlos manifiesta que tuvo una calamidad médica familiar, pero no avisó a los instructores ni radicó ningún documento dentro de los 3 días hábiles estipulados por el reglamento.',
    dilemma: '¿Cuál es el procedimiento legal y formativo que debe aplicar el instructor y la coordinación según el Acuerdo 009 de 2024?',
    options: [
      {
        id: 'opt1',
        action: 'Expulsarlo inmediatamente del centro y prohibirle el ingreso a las instalaciones.',
        isCorrect: false,
        feedback: 'Incorrecto. En el SENA prima el Debido Proceso constitucional. Ningún instructor puede expulsar a un aprendiz de facto sin agotar las instancias reglamentarias.',
        normativeRef: 'Constitución Art. 29 y Acuerdo 009 de 2024 - Cap. V'
      },
      {
        id: 'opt2',
        action: 'Registrar la deserción de inmediato sin requerimiento previo para liberar el cupo en SofiaPlus.',
        isCorrect: false,
        feedback: 'Incorrecto. Antes de declarar la deserción formal, el centro debe enviar una comunicación de requerimiento al aprendiz dándole 5 días hábiles para justificar su inasistencia.',
        normativeRef: 'Acuerdo 009 de 2024 - Cap. IV (Deserción)'
      },
      {
        id: 'opt3',
        action: 'Enviar notificación formal de requerimiento al correo MiSena del aprendiz, otorgándole 5 días hábiles para aportar las pruebas de descargo y justificación.',
        isCorrect: true,
        feedback: '¡Correcto! El Acuerdo 009 de 2024 indica que ante inasistencia injustificada por más de 3 días consecutivos (o 5 discontinuos), se notificará formalmente al aprendiz para que en el término de cinco (5) días hábiles justifique su ausencia.',
        normativeRef: 'Acuerdo 009 de 2024 - Cap. IV'
      }
    ]
  },
  {
    id: 'caso-2',
    title: 'Plagio en Evidencia Técnica de Proyecto Formativo',
    category: 'académica',
    severity: 'Grave',
    context: 'En la entrega final de la fase de análisis del software, el instructor identifica que un grupo copió exactamente la arquitectura, base de datos y diagramas UML de un proyecto de otra ficha del año 2024.',
    description: 'Los aprendices afirman que "encontraron la información en internet y la usaron como plantilla", pero no citaron las fuentes ni reconocieron la autoría original.',
    dilemma: '¿Cómo debe clasificarse la conducta y cuál es la ruta a seguir?',
    options: [
      {
        id: 'opt1',
        action: 'Constituye una falta grave contra los derechos de autor y el reglamento. El instructor emite informe motivado y solicita citación a Comité de Evaluación y Seguimiento.',
        isCorrect: true,
        feedback: '¡Correcto! El plagio o fraude en evidencias está tipificado expresamente en las prohibiciones (Art. 10) y clasificado como falta grave. Requiere citación formal a Comité con debido proceso.',
        normativeRef: 'Reglamento del Aprendiz - Art. 10 num. 16 y Art. 25'
      },
      {
        id: 'opt2',
        action: 'El instructor les pone calificación reprobada sin darles oportunidad de explicarse ni levantar acta.',
        isCorrect: false,
        feedback: 'Incorrecto. Aunque la evidencia no se aprueba, el plagio exige un trámite disciplinario y formativo formal respetando el debido proceso y descargos.',
        normativeRef: 'Reglamento del Aprendiz - Art. 29'
      },
      {
        id: 'opt3',
        action: 'No pasa nada porque todo lo que está en internet es de uso público y no tiene consecuencias en la formación profesional.',
        isCorrect: false,
        feedback: 'Totalmente falso. El SENA promueve la ética y el rigor profesional. La vulneración a los derechos de autor acarrea sanciones académicas y legales.',
        normativeRef: 'Ley 23 de 1982 sobre Derechos de Autor y Reglamento SENA'
      }
    ]
  },
  {
    id: 'caso-3',
    title: 'Operación de Maquinaria sin Elementos de Protección Personal (EPP)',
    category: 'disciplinaria',
    severity: 'Grave',
    context: 'En el taller de soldadura y mecatrónica, un aprendiz ingresa en sandalias y sin gafas de protección ni overol ignífugo, encendiendo un esmeril a pesar de los llamados reiterados de advertencia del vocero y compañeros.',
    description: 'La acción puso en inminente riesgo su integridad física y la de los aprendices que se encontraban en el entorno de trabajo.',
    dilemma: '¿Qué medida inmediata y formativa procede según el protocolo de bioseguridad y el reglamento?',
    options: [
      {
        id: 'opt1',
        action: 'Permitirle continuar si promete tener cuidado y no acercarse demasiado a la chispa.',
        isCorrect: false,
        feedback: 'Incorrecto. La seguridad y salud en el trabajo es innegociable. Nadie puede operar maquinaria sin EPP.',
        normativeRef: 'Normas de Bioseguridad y SST SENA'
      },
      {
        id: 'opt2',
        action: 'Suspender de inmediato la actividad del aprendiz en el taller por riesgo inminente, levantar acta preventiva y remitir el caso a coordinación para medida disciplinaria.',
        isCorrect: true,
        feedback: '¡Excelente decisión! Prima la preservación de la vida e integridad física. El incumplimiento reiterado de normas de seguridad industrial es falta disciplinaria que justifica la suspensión inmediata del área de riesgo y reporte formal.',
        normativeRef: 'Acuerdo 009 de 2024 - Cap. III (Deberes) y Cap. V'
      },
      {
        id: 'opt3',
        action: 'Imponerle una multa económica personal que debe pagar en la tesorería del centro.',
        isCorrect: false,
        feedback: 'Incorrecto. El SENA no tiene facultades para cobrar multas monetarias a los aprendices. Las sanciones son exclusivamente de carácter formativo y disciplinario.',
        normativeRef: 'Acuerdo 009 de 2024 - Cap. V'
      }
    ]
  },
  {
    id: 'caso-4',
    title: 'Uso no Ético de Inteligencia Artificial y Suplantación Digital (Vigencia 2026)',
    category: 'académica',
    severity: 'Grave',
    context: 'Un aprendiz de modalidad virtual genera la totalidad de su proyecto formativo utilizando Inteligencia Artificial sin aportar análisis propio ni citar prompts/fuentes, y usa un avatar/síntesis de voz para suplantar su voz en la sustentación sincrónica.',
    description: 'La directiva de 2026 sobre IA ética en el SENA fomenta el uso asistido de la IA pero sanciona la falta de transparencia, la ausencia de criterio propio y la suplantación de identidad.',
    dilemma: '¿Cuál es la ruta pedagógica y procedimental que aplica el instructor según el Acuerdo 009 de 2024?',
    options: [
      {
        id: 'opt1',
        action: 'Dar por aprobada la evidencia porque la Inteligencia Artificial es el futuro de la industria software.',
        isCorrect: false,
        feedback: 'Incorrecto. El uso de la IA requiere autoría propia, transparencia e integridad. Entregar un trabajo 100% generado sin criterio ni citación constituye plagio y suplantación.',
        normativeRef: 'Acuerdo 009 de 2024 - Cap. III (Prohibición 16)'
      },
      {
        id: 'opt2',
        action: 'Reportar la falta académica/disciplinaria mediante informe motivado, concertar un Plan de Mejoramiento Restaurativo con sustentación presencial/en vivo y citar a Comité si hay reincidencia.',
        isCorrect: true,
        feedback: '¡Correcto! El Acuerdo 009 de 2024 prioriza el enfoque pedagógico restaurativo (Plan de Mejoramiento hasta por 30 días) antes de derivar a sanciones de mayor gravedad por suplantación.',
        normativeRef: 'Acuerdo 009 de 2024 - Cap. V (Medidas Formativas Restaurativas)'
      },
      {
        id: 'opt3',
        action: 'Bloquear definitivamente su cuenta de SofiaPlus sin permitirle presentar descargos.',
        isCorrect: false,
        feedback: 'Incorrecto. Viola el Debido Proceso constitucional (Art. 29 C.P.). Toda falta requiere citación previa de 3 días hábiles y derecho a defensa.',
        normativeRef: 'Acuerdo 009 de 2024 - Cap. V (Debido Proceso)'
      }
    ]
  }
];

export const CLASSIFICATION_GAME_ITEMS: ClassificationItem[] = [
  {
    id: 'cl-1',
    text: 'Recibir inducción completa al iniciar el programa de formación profesional.',
    category: 'Derecho',
    explanation: 'Es un derecho fundamental estipulado en el numeral 1 del Art. 7 para garantizar una acogida y conocimiento integral del SENA.',
    article: 'Art. 7 Numeral 1'
  },
  {
    id: 'cl-2',
    text: 'Portar permanentemente el carné institucional en lugar visible dentro del centro.',
    category: 'Deber',
    explanation: 'El carné te identifica como miembro de la comunidad educativa y es obligatorio para la seguridad de todos.',
    article: 'Art. 9 Numeral 1'
  },
  {
    id: 'cl-3',
    text: 'Ingresar o comercializar bebidas alcohólicas o sustancias psicoactivas en el centro.',
    category: 'Prohibición',
    explanation: 'Conducta catalogada como falta gravísima que atenta directamente contra la integridad de la comunidad formativa.',
    article: 'Art. 10 Numeral 4'
  },
  {
    id: 'cl-4',
    text: 'Ser escuchado en descargos ante el Comité de Evaluación y Seguimiento.',
    category: 'Derecho',
    explanation: 'Garantía del debido proceso constitucional donde el aprendiz ejerce su legítimo derecho a la defensa.',
    article: 'Art. 7 Numeral 6'
  },
  {
    id: 'cl-5',
    text: 'Utilizar los Elementos de Protección Personal (EPP) en talleres y laboratorios.',
    category: 'Deber',
    explanation: 'Deber obligatorio de seguridad y salud en el trabajo para proteger la integridad física propia y colectiva.',
    article: 'Art. 9 Numeral 12'
  },
  {
    id: 'cl-6',
    text: 'Plagiar trabajos, evaluaciones o proyectos formativos de otros autores.',
    category: 'Prohibición',
    explanation: 'El fraude y la violación a los derechos de autor constituyen una prohibición expresa y falta académica grave.',
    article: 'Art. 10 Numeral 16'
  },
  {
    id: 'cl-7',
    text: 'Disfrutar de los programas gratuitos de Bienestar al Aprendiz (salud, deporte, cultura).',
    category: 'Derecho',
    explanation: 'Todo aprendiz tiene derecho a acceder libremente a las actividades formativas complementarias de bienestar.',
    article: 'Art. 7 Numeral 10'
  },
  {
    id: 'cl-8',
    text: 'Justificar las inasistencias dentro de los 3 días hábiles siguientes.',
    category: 'Deber',
    explanation: 'Deber administrativo para no incurrir en llamados de atención o posible deserción académica.',
    article: 'Art. 9 Numeral 4'
  },
  {
    id: 'cl-9',
    text: 'Portar cualquier clase de armas o elementos corto punzantes en el centro.',
    category: 'Prohibición',
    explanation: 'Prohibición tajante que atenta contra la seguridad nacional y la convivencia pacífica institucional.',
    article: 'Art. 10 Numeral 2'
  },
  {
    id: 'cl-10',
    text: 'Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de Centro.',
    category: 'Derecho',
    explanation: 'Derecho a la participación política y democrática activa en la vida institucional del SENA.',
    article: 'Art. 7 Numeral 8'
  },
  {
    id: 'cl-11',
    text: 'Gozar de descanso y desconexión digital fuera de la jornada de formación acordada.',
    category: 'Derecho',
    explanation: 'Derecho a la desconexión digital reconocido en la actualización del Acuerdo 009 de 2024 para salvaguardar la salud mental y bienestar.',
    article: 'Art. 7 Numeral 18 (Vigencia 2026)'
  },
  {
    id: 'cl-12',
    text: 'Suplantar la voz o imagen de compañeros o instructores mediante herramientas de Inteligencia Artificial.',
    category: 'Prohibición',
    explanation: 'Prohibición explícita de suplantación digital e infracción a la ética en la formación asistida por tecnologías.',
    article: 'Art. 10 Numeral 18 (Vigencia 2026)'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b-bienvenida',
    title: 'Mística SENA',
    description: 'Completaste el módulo 1 de historia y valores institucionales.',
    icon: 'Sparkles',
    category: 'Identidad'
  },
  {
    id: 'b-simbolos',
    title: 'Guardián de los Símbolos',
    description: 'Exploraste el escudo interactivo, la bandera y entonaste el Himno.',
    icon: 'Flag',
    category: 'Símbolos'
  },
  {
    id: 'b-normativa',
    title: 'Experto en Normativa',
    description: 'Aprobaste el quiz del Reglamento del Aprendiz (Acuerdo 009 de 2024).',
    icon: 'Scale',
    category: 'Reglamento'
  },
  {
    id: 'b-tribunal',
    title: 'Juez Formativo',
    description: 'Resolviste con éxito los casos prácticos del Tribunal Normativo.',
    icon: 'Award',
    category: 'Casos Reales'
  },
  {
    id: 'b-digital',
    title: 'Ciudadano Digital SENA',
    description: 'Dominaste los conceptos de SofiaPlus, Zajuna LMS y correo MiSena.',
    icon: 'Laptop',
    category: 'Tecnología'
  },
  {
    id: 'b-induccion-master',
    title: 'Inducción 100% Aprobada',
    description: 'Culminaste exitosamente toda la ruta de inducción del SENA.',
    icon: 'CheckCircle2',
    category: 'Certificación'
  }
];
