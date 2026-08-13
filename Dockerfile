FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY index.html homelab.html resume.html ./
COPY css ./css
COPY js ./js
COPY assets ./assets
