# Sakura Enterprise — La Base

Portal principal de Sakura Enterprise y punto de entrada a sus tres divisiones.

## URL publicada

https://lemichiw-cyber.github.io/la-base/sakura-enterprise/

## Estructura

```
la-base/
├── index.html                   # Redirige a sakura-enterprise/
├── 404.html                     # Página 404 del proyecto
├── robots.txt                   # Indexación
├── sitemap.xml                  # Mapa del sitio
├── sakura-enterprise/
│   ├── index.html               # Portal
│   ├── style.css                # Estilos
│   ├── script.js                # Menú, pétalos, formulario y año
│   ├── site.webmanifest         # Manifest PWA
│   └── assets/                  # Logo, iconos y banner social
└── README.md
```

## Identidad y contacto

- **WhatsApp:** +503 7998 0884 — https://wa.me/50379980884
- **Teléfono:** +503 7998 0884 — tel:+50379980884
- **Instagram:** https://www.instagram.com/sakura_enterprise2/
- **X:** https://x.com/sakura_enter
- **Facebook:** no se utiliza.

El formulario de contacto no necesita backend: valida los campos y abre WhatsApp con el mensaje ya redactado.

## Desarrollo local

Desde la raíz del repositorio:

```bash
python3 -m http.server 8080
```

Abre http://localhost:8080/sakura-enterprise/.

## Publicación

El sitio es estático y se publica con GitHub Pages desde la rama principal.
No hay dominio propio ni proceso de compilación.

Para actualizar:

```bash
git add .
git commit -m "Mejora del portal Sakura Enterprise"
git push origin main
```

GitHub Pages reconstruye el sitio automáticamente.
