server: npm run dev

client: npm run dev

(in case of issues: delete client/node_modules and server/node_modules, then run npm install)

------------------------------------------------------------------------------------------------------------------

Docker: docker-compose up --build

Run the previous command when package.json is changed.
Otherwise, running docker-compose up (without --build) or the container in docker desktop should be enough.

(in case of issues: delete client/node_modules and server/node_modules, delete the existing container and images)

container: random_nodejs_project
