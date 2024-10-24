# Dynamic API Response

This is an example of implementation of a dynamic API response base on user region/locations.

## Getting Started

To get started with the backend services, please follow the steps below:

1. Clone the repository from [GitHub](https://github.com/krsbx/dynamic-api-response).

```bash
git clone git@github.com:krsbx/dynamic-api-response.git
```

2. Run the following command to install the dependencies:

```bash
pnpm install # or npm install, we recommend to use pnpm
```


3. Setup the `.env` file in the project root.

4. Setup the `mongodb`, `mongo-express`, and `redis` services using the `docker-compose.yml` file in the project root.

```bash
docker compose --env-file .env up -d
```

> Note: Make sure to run the `docker compose --env-file .env up -d` command in the project root.

5. Run the following command to start the server

```bash
pnpm run dev # or npm run dev, we recommend to use pnpm
```

## Strategies

1. Detect user's location using `fast-geoip` package so we can get user's region.

2. Use `Redis` to cache the question in `Redis` so we can use it in the future for reducing latency to the client.

3. Store the `region` and `cycle` information of the question in the databse and redis, by doing so we can make sure that every region is has a unique question with different cycle.

4. Store the configuration file in the `.env` file in the project root, in case we need to change the `cycle start date`, `cycle duration` or `cycle unit` in the future.

## Pros and Cons

### Pros

1. Easy to implement since it use `fast-geoip` for retrieving user's region and has a simple database schema.

2. Built-in seeders so we can add new questions by adding the seed and running it through the cli.

3. Faster response time since we cache the pre-fetched/pre-loaded questions in `Redis`.

### Cons

1. If the data pre-feteched/pre-loaded is large, we can run out of memory.

2. If we want to change the `cycle start date`, `cycle duration` or `cycle unit` in the future, we have to restart the server.
