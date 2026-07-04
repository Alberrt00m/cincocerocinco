# 505_LandingPage
Proyecto: 505 — Landing page promocional de la miniserie de suspenso "505".

Resumen de lo hablado:
- Estructura principal: una página estática con secciones: **Sinopsis**, **Productores**, **Teasers y capítulos**, **Audiovisuales**, **Juego** y **Redes**.
- Interacciones: indicador de grabación con contador (`recTime`), menú móvil, revelado de textos redactados, tarjetas de personal, tarjetas de cintas (modal para reproducir videos) y botón "volver arriba".
- Accesibilidad y UX: atención a foco visible, control por teclado para elementos redactados y manejo del foco al abrir/cerrar el modal.
- Contenido externo: integraciones previstas con embeds de video (YouTube/Vimeo) y enlaces a plataformas (Spotify, Linktree, juego hospedado externamente).

Herramientas y tecnologías usadas:
- HTML5: estructura del sitio en [index.html](index.html).
- CSS3 (Flexbox / Grid, variables y media queries): estilos en [css/style.css](css/style.css).
- JavaScript (vanilla): comportamiento e interacciones en [js/script.js](js/script.js).
- Tipografías: Google Fonts (`Special Elite`, `IBM Plex Sans`, `IBM Plex Mono`).
- Recursos: imágenes en la carpeta `images/` y favicons utilizados en el proyecto.
- Desarrollo: edición en VS Code, control de versiones con Git y despliegue estático (GitHub Pages u otro hosting estático recomendado).

Notas de desarrollo:
- Mantener las rutas relativas para facilitar despliegues estáticos.
- Reemplazar `data-video` en las tarjetas de cinta con URLs de embed reales cuando estén disponibles.
- Añadir archivos de imágenes faltantes a `images/` o usar placeholders para evitar fallos de carga.
- Validar accesibilidad adicional (contraste, atributos ARIA y pruebas de navegación por teclado).



