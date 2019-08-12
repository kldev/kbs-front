FROM node:10.15.3 as build-deps
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_USERNAME=
ENV REACT_APP_PASSWORD=
# on kuberntes setup and reverse proxy this could be k8s-service:8080
# needed default.conf properly set
ENV REACT_APP_WEB_API=
ENV REACT_APP_VERSION=1.0.0
ENV REACT_APP_BASE_API=
COPY /src /src
COPY /package.json /package.json
COPY /yarn.lock /yarn.lock
COPY /tsconfig.json /tsconfig.json
COPY /public /public

RUN NODE_ENV=development yarn install --frozen-lockfile 
RUN NODE_ENV=production yarn build

FROM nginx:1.17.0-alpine
COPY --from=build-deps /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# build command
# docker build -t kbs-front -f Dockerfile .

# run command
# docker run -p 3000:80 kbs-front

