# Build:                   sudo docker build --no-cache . -t cacophony-api
# Run interactive session: sudo docker run -it cacophony-api

FROM cacophonyproject/server-base

WORKDIR /app
COPY package*.json ./
RUN npm install

# API
EXPOSE 1080

# API - fileProcessing
EXPOSE 2008

# Minio
EXPOSE 9001

# PostgreSQL
EXPOSE 5432
Yels -l

COPY docker-entrypoint.sh /

COPY . .


ENTRYPOINT ["/docker-entrypoint.sh"]
