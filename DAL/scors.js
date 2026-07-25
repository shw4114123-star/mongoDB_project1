import { get } from "node:http";
import { momo } from "../db/db.js"



export async function createScore(body) {
    try {
        const allBody = { ...body, createdAt: new Date() }
        const score = await momo.insertOne(allBody);
        allBody._id = score.insertedId
        return allBody
    } catch (error) {
        console.error(error);
    }
}

export async function getTenPlayersByGame(game) {
    try {
        const getAll = await momo.aggregate([
            { $match: { game: game } }, { $sort: { points: -1 } }, { $limit: 10 }, { $setWindowFields: { sortBy: { points: -1 }, output: { rank: { $documentNumber: {} } } } }, { $project: { _id: 0, createdAt: 0 } }]).toArray();
        return getAll
    } catch (error) {
        console.error(error);
    }
}

export async function getTenPlayersByAllGames() {
    try {
        const getAllPlayer = await momo.aggregate([
            { $sort: { points: -1 } }, { $limit: 10 }, { $project: { playerName: 1, game: 1, points: 1, createdAt: 1, _id: 0 } }
        ]).toArray();
        return getAllPlayer
    } catch (error) {
        console.error(error);
    }
}

export async function getAllPlayerData(name) {
    try {
        const allPlayerData = await momo.aggregate([
            { $match: { playerName: name } },
            {
                $facet: {
                    "allScores": [{ $sort: { createdAt: -1 } }], "bestPerGame": [{
                        $group: {
                            _id: "$game",
                            best: { $max: "$points" }
                        }
                    }]
                }
            }]).toArray();
        return allPlayerData
    } catch (error) {
        console.error(error);
    }
}

export async function getAllStats() {
    try {
        const allStats = await momo.aggregate([{
            $facet: {
                "max points": [{ $sort: { points: -1 } }, { $limit: 1 }],
                "result": [{ $group: { _id: null, result: { $sum: 1 } } }, { $project: { _id: 0 } }],
                "average": [{ $group: { _id: null, average: { $avg: "$points" } } }, { $project: { _id: 0 } }],
                "popolarGame": [{ $group: { _id: "$game", total: { $sum: 1 } } }, { $sort: { popolar: -1 } }, { $limit: 1 }]
            }
        }]).toArray();
        const all = { "max_points": allStats[0]["max points"][0], "result_games": allStats[0]["result"][0]["result"], "average_points": allStats[0]["average"][0]["average"], "popolarGame": allStats[0]["popolarGame"][0] }
        return all
    } catch (error) {
        console.log(error);
    }
}