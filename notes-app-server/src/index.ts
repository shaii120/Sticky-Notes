import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const app = express()
const prisma = new PrismaClient()

const PORT = 5000
app.use(express.json())
app.use(cors())


app.get("/api/notes", async (_, res) => {
    const notes = await prisma.note.findMany()
    res.json(notes)
})

app.get("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if (!id || isNaN(id)) {
        res
            .status(400)
            .send("ID must be a valid number")
        return
    }

    const notes = await prisma.note.findFirst({ where: { id } })
    res.json(notes)
})

app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        res
            .status(400)
            .send("Required both Title and Content fields")
        return
    }

    try {
        const note = await prisma.note.create({
            data: { title, content }
        })
        res.json(note)
    }
    catch (error) {
        res
            .status(500)
            .send("Something went wrong")
    }
})

app.put("/api/notes/:id", async (req, res) => {
    const { title, content } = req.body
    const id = parseInt(req.params.id)

    if (!title || !content) {
        res
            .status(400)
            .send("Required both Title and Content fields")
        return
    }
    if (!id || isNaN(id)) {
        res
            .status(400)
            .send("ID must be a valid number")
        return
    }

    try {
        const updatedNode = await prisma.note.update({
            where: { id },
            data: { title, content }
        })
        res.json(updatedNode)
    }
    catch (error) {
        res
            .status(500)
            .send("Something went wrong")
    }
})

app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    if (!id || isNaN(id)) {
        res
            .status(400)
            .send("ID must be a valid number")
        return
    }

    try {
        await prisma.note.delete({
            where: { id }
        })
        res.status(204).send()
    }
    catch (error) {
        res
            .status(500)
            .send("Something went wrong")
    }
})

app.listen(PORT, () => { console.log(`server running on localhost:${PORT}`) })