import express from "express";
import { createScore, getTenPlayersByGame, getTenPlayersByAllGames, getAllPlayerData, getAllStats } from "../DAL/scors.js"

const router = express.Router()

router.post("/scores", async (req, res) => {
    const body = req.body
    const scores = await createScore(body)
    res.json(scores)
})


router.get("/leaderboard/global", async (req, res) => {
    const leaderboard = await getTenPlayersByAllGames()
    res.json(leaderboard)
})


router.get("/leaderboard/:game", async (req, res) => {
    const { game } = req.params
    const leaderboard = await getTenPlayersByGame(game)
    res.json(leaderboard)
})


router.get("/player/:name", async (req, res) => {
    const { name } = req.params
    const player = await getAllPlayerData(name)
    res.json(player)
})


router.get("/stats", async (req, res) =>{
    const stats = await getAllStats()
    res.json(stats)
})

export default router