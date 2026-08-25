FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY index.html homelab.html sitemap.xml ./
COPY css ./css
COPY js ./js
COPY assets ./assets
