const { ShardingManager } = require("discord.js");
const config = require("./config.js");
logger = require("./modules/Logger");

const sharder = new ShardingManager("./index.js", {
    token: config.token,
    totalShards: "auto"
});

sharder.on("launch", (shard) => {
    logger.log(`Sharding | Shard #${shard.id} lancé !`);
});

sharder.spawn()
    .then(() => {
        logger.log("Sharding | Tous les shards sont lancés !");
    });